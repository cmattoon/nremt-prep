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

    self.showExamTips = null;
    
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
    
    self.numQuestions = ko.observable();
    self.questions = ko.observableArray();
    self.answers = [];

    self.isStarted = false; // true=show quiz, false=show intro @todo #screens
    
    self.qReady = false; // set to 'true' when questions are parsed and loaded

    /**
     * Starts the exam
     *   - Show Exam Tips
     *   - Load Questions
     *   - Show Questions, one at a time
     */
    self.startExam = function() {
	self.isStarted = true; // Hides initial screen
	self.qReady = false;
	if (self.showExamTips === null) {
	    self.showExamTips = true; // Let them hit 'next'
	}
	self._loadQuestions();

	if (self.numQuestions() < 1) {
	    self.numQuestions(self.maxQuestions());
	}

	self._initQuestions();
    };

    /**
     * Loads all questions for self.level from disk or API
     */
    self._loadQuestions = function() {
	
    };

    /**
     * Returns a randomly-ordered set of Questions from the list of 
     * all possible questions.
     *
     */
    self._initQuestions = function() {
	
    };
};

var questions = [
    {
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
    }
];


ko.applyBindings(new AppViewModel());
