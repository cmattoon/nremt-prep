#!/usr/bin/env python
import os
import shlex
import subprocess
import yaml

from hashlib import sha1


ENC = 'utf-8'


class QuestionValidationError(ValueError): pass


class Question:
    
    LEVELS = ['EMR', 'EMT', 'AEMT', 'NRP']

    CATEGORIES = ['Airway', 'Cardiology', 'Trauma', 'Medical', 'Operations']
    
    def __init__(self, **kwargs):
        self.level = kwargs.get('level', '').strip()
        self.category = kwargs.get('category', '').strip()
        self.text = kwargs.get('text', '').strip()
        self.choices = kwargs.get('choices', None)
        if self.choices is None:
            self.choices = []
        self.tags = [tag.strip().lower().replace(' ', '-') for tag in kwargs.get('tags', '')]
        self.hash = None
        self.filename = kwargs.get('filename', '')
        self.new_data = {}
        
    def _hash(self):
        sha = sha1()
        sha.update(self.level.encode(ENC))
        sha.update(self.text.encode(ENC))
        [sha.update("{}={}".format(ch['text'], ch['points']).encode(ENC)) for ch in self.choices]
        self.hash = sha.hexdigest()
        return self.hash
    
    def verify(self):
        if self.level not in Question.LEVELS:
            raise QuestionValidationError("Invalid 'level': {}".format(self.level))
        
        if self.category not in Question.CATEGORIES:
            raise QuestionValidationError("Invalid 'category': {}".format(self.category))
        
        if len(self.choices) is not 4:
            raise QuestionValidationError("Must have 4 answers")
        
        if sum([c['points'] for c in self.choices]) > 1:
            raise QuestionValidationError("Must have exactly one correct answer")

        if not all([len(c['text']) > 0 for c in self.choices]):
            raise QuestionValidationError("Answers must not be empty")

    def save(self):
        self.verify()
        self._hash()
        self.new_data = [dict(
            id=self.hash,
            level=self.level,
            category=self.category,
            tags=self.tags,
            choices=[dict(points=ch['points'], text=ch['text']) for ch in self.choices],
            text=self.text,
            stats=dict(),
        )]
        path = self._write_file()
        return self.filename, path
    
    def _write_file(self):
        path = os.path.join("data/questions/{}/{}.yaml".format(self.level, self.hash))
        with open(path, 'w+') as fd:
            yaml.dump(self.new_data, fd)
        return path
    
    def pretty(self):
        print("[{}][{}]".format(self.level, self.hash))
        print(">> {}".format(self.text))
        for ch in self.choices:
            print("     --[{}]-- {}".format(ch['points'], ch['text']))
        if self.tags:
            print("[Tags: {}]".format(",".join(self.tags)))

    @classmethod
    def getFromFile(cls, path):
        with open(path) as fd:
            questions = yaml.load(fd)
        for q in questions:
            yield Question(**q, filename=path)

    @classmethod
    def getNewQuestions(cls, qdir=None):
        qdir = os.getenv('NEW_QUESTION_DIR', os.path.join(os.getcwd(), 'new_questions'))
        questions = []
        for root, dirs, files in os.walk(qdir):
            for f in files:
                if f == 'TEMPLATE.yaml': continue
                path = os.path.join(root, f)
                for q in cls.getFromFile(path):
                    yield q
def exe(command):
    ps = subprocess.Popen(
        shlex.split(command),
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE)
    return ps.communicate()

def main():
    files = []
    branch = sha1()
    for q in Question.getNewQuestions():
        try:
            files.append(q.save())
            branch.update(q.hash.encode(ENC))
        except QuestionValidationError as e:
            print(e)
            exit

    if len(files):
        print("Pushing branch {}".format(branch.hexdigest()))
        exe("git checkout -b {}".format(branch.hexdigest()))
        for old, new in files:
            exe("git rm -f {}".format(old))
            exe("git add {}".format(new))
        exe("git commit -m 'import_questions.py: Imported {} Questions'".format(len(files)))
        exe("git push -u origin {}".format(branch.hexdigest()))

    else:
        print("Nothing to do")



if __name__ == '__main__':    
    main()
