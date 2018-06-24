var AppViewModel = function() {
    var self = this;
    
    self.LEVELS = [
	{'name': 'EMR', 'label': 'EMR - Emergency Medical Responder'},
	{'name': 'EMT', 'label': 'EMT - Emergency Medical Technician (EMT-B)'},
	{'name': 'AEMT', 'label': 'AEMT - Advanced EMT'},
	{'name': 'NRP', 'label': 'NRP - Paramedic'}
    ];
    
    // [min, max]; yes, AEMT is fixed @135 ¯\_(ツ)_/¯
    self.QUESTION_RANGES = {
	'EMR': [90, 110],
	'EMT': [70, 120],
	'AEMT': [135, 135],
	'NRP': [80, 150]
    };

    self.showExamTips = ko.observable(null);
    
    self.level = ko.observable('Practice Exam');
    
    self.minQuestions = ko.computed(function() {
	if (self.level() in self.QUESTION_RANGES) {
	    return self.QUESTION_RANGES[self.level()][0];
	}
	return 0;
    });
    
    self.maxQuestions = ko.computed(function() {
	if (self.level() in self.QUESTION_RANGES) {
	    return self.QUESTION_RANGES[self.level()][1];
	}
	return 0;
    });

    self.currentQuestionIndex = ko.observable(0);
    self.numQuestions = ko.observable(0);
    self.questions = ko.observableArray();
    self.answers = [];
    self.currentQuestion = ko.computed(function() {
	return self.questions()[self.currentQuestionIndex()];
    });
    self.qId = ko.computed(function() {
	return 'question' + self.currentQuestionIndex()
    });
    self.questionText = ko.computed(function() {
	var q = self.currentQuestion();
	if (!q) return '';
	return q.text;
    });

    self.questionChoices = ko.computed(function() {
	var q = self.currentQuestion();
	if (!q) return [];
	return q.choices;
    });
    self.isStarted = ko.observable(false); // true=show quiz, false=show intro @todo #screens

    // Last question has been shown
    self.isComplete = ko.observable(true);
    
    /**
     * Starts the exam
     *   - Show Exam Tips
     *   - Load Questions
     *   - Show Questions, one at a time
     */
    self.startExam = function() {
	console.debug("Starting Exam: " + self.level());
	self.isStarted(true);
	
	if (self.showExamTips() === null) {
	    self.showExamTips(true);
	}
	
	self._loadQuestions();

	if (self.numQuestions() < 1) {
	    self.numQuestions(self.maxQuestions());
	}

	self._initQuestions();
	
    };

    self.showFirstQuestion = function() {
	self.showExamTips(false);
	self.currentQuestionIndex(-1);
	self.showNextQuestion();
    };
    
    self.showNextQuestion = function() {
	var idx = self.currentQuestionIndex()
	console.log("Showing question: " + String(idx+1));
	if ((idx+1) > self.numQuestions()+1) {
	    self.isComplete(true);
	    return;
	}
	self.currentQuestionIndex(idx + 1);
	
    };
    
    self.showPrevQuestion = function() {
	var idx = self.currentQuestionIndex()
	console.log("Showing question: " + String(idx));
	if ((idx-1) > -1) {
	    self.currentQuestionIndex(idx - 1);
	}
    };

    
    /**
     * Loads all questions for self.level from disk or API
     */
    self._loadQuestions = function() {

	self.questions.push({
	'text': 'What is the answer?',
	'choices': [
	    {'points': 0,
	     'text': 'Answer A'},
	    {'points': 0,
	     'text': 'Answer B'},
	    {'points': 1,
	     'text': 'Answer C'},
	    {'points': 0,
	     'text': 'Answer D'}
	]
	});
    };

    /**
     * Returns a randomly-ordered set of Questions from the list of 
     * all possible questions.
     *
     */
    self._initQuestions = function() {
	
    };
};


// window.vm = new AppViewModel();
// ko.applyBindings(window.vm);
