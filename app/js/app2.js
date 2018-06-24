var AppViewModel = function() {
    var self = this;

    self.screens = ['about', 'exam-options', 'questions', 'review'];

    self.screen = ko.observable('about');

    self.examName = ko.observable('demo');

    self.desiredQuestions = ko.observable(0);

    self.isStarted = ko.observable(false);

    // Show the screen to configure the exam
    self.showExamOptions = function() {
	self.screen('exam-options');
    };

    // actually start the exam
    self.beginExam = function() {
	self.screen('questions');
    };

    // Returns a function for 'click' handlers
    self.setScreen = function(scr) {
	return function() {
	    self.screen(scr);
	}
    };
};

