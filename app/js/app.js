var Choice = function(text, points) {
    var self = this;

    self.text = ko.observable(text);

    self.points = ko.observable(parseInt(points));
}

var Question = function(text) {
    var self = this;

    self.text = ko.observable(text);

    self.choices = ko.observableArray([
	new Choice('Answer A', 0),
	new Choice('Answer B', 1),
	new Choice('Answer C', 0),
	new Choice('Answer D', 0)
    ])
};

var Exam = function(level, num_questions) {
    var self = this;

    self.levels = ['EMR', 'EMT', 'AEMT', 'NRP'];

    self.level = ko.observable('NRP');

    self.questions = [
	new Question('Question 1 Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.'),
	new Question('Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.')
    ];

    self.numQuestions = num_questions;

    self.idx = ko.observable(0);
    
    self.currentQuestion = ko.computed(function() {
	var q = self.questions[self.idx()];
	if (typeof(q) === "undefined") {
	    return null;
	}
	return q;
    });

    self.startTime = 0;

    self.endTime = 0;

    self.timeLimit = 0;

    self.load = function() {
	self.idx(-1);
	console.log("Loading..." + self.level());
    };

    self.timeRemaining = function() {
	if (self.timeLimit === 0) return -1;
	var now = new Date().getTime();
	var elapsed = now - self.startTime;
	return self.timeLimit - elapsed;
    };
    
    self.start = function() {
	self.idx(0);
	self.startTime = new Date().getTime();
	console.info("Starting exam at " + self.startTime + " at Idx: " + self.idx());
    };

    self.nextQuestion = function() {
	var i = self.idx() + 1;
	if (i < self.questions.length) {
	    self.idx(i);
	}
    };

    self.prevQuestion = function() {
	var i = self.idx() - 1;
	if (i < 0) {
	    self.idx(0);
	    return;
	}
	self.idx(i);
    };

    
};

var AppViewModel = function() {
    var self = this;

    self.screens = ['about', 'exam-options', 'questions', 'review'];

    self.screen = ko.observable('about');
    self.exam = new Exam();
    
    self.examName = ko.observable('NRP');

    self.desiredQuestions = ko.observable(0);

    self.isStarted = ko.observable(false);

    // Show the screen to configure the exam
    self.showExamOptions = function() {
	self.screen('exam-options');
    };

    // actually start the exam
    self.beginExam = function() {
	self.screen('questions');
	self.exam = new Exam(self.examName(), self.desiredQuestions());
	self.exam.load();
	self.exam.start();
    };

    // Returns a function for 'click' handlers
    self.setScreen = function(scr) {
	return function() {
	    self.screen(scr);
	}
    };
};

