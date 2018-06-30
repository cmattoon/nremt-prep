var app = angular.module('nremtPrep', []);


app.factory('quizFactory', function() {
    var questions = [
	{
	    question: "Which is the largest country in the world by population?",
	    options: ["India", "USA", "China", "Russia"],
	    answer: 2,
	    difficulty: 1
	},
	{
	    question: "When did the second world war end?",
	    options: ["1945", "1939", "1944", "1942"],
	    answer: 0,
	    difficulty: 1
	},
	{
	    question: "Which was the first country to issue paper currency?",
	    options: ["USA", "France", "Italy", "China"],
	    answer: 3,
	    difficulty: 5
	},
	{
	    question: "Which city hosted the 1996 Summer Olympics?",
	    options: ["Atlanta", "Sydney", "Athens", "Beijing"],
	    answer: 0,
	    difficulty: 3
	},
	{	
	    question: "Who invented telephone?",
	    options: ["Albert Einstein", "Alexander Graham Bell", "Isaac Newton", "Marie Curie"],
	    answer: 1,
	    difficulty: 1
	},
		{
	    question: "Which is the largest country in the world by population?",
	    options: ["India", "USA", "China", "Russia"],
	    answer: 2,
	    difficulty: 1
	},
	{
	    question: "When did the second world war end?",
	    options: ["1945", "1939", "1944", "1942"],
	    answer: 0,
	    difficulty: 1
	},
	{
	    question: "Which was the first country to issue paper currency?",
	    options: ["USA", "France", "Italy", "China"],
	    answer: 3,
	    difficulty: 2
	},
	{
	    question: "Which city hosted the 1996 Summer Olympics?",
	    options: ["Atlanta", "Sydney", "Athens", "Beijing"],
	    answer: 0,
	    difficulty: 2
	},
	{	
	    question: "Who invented telephone?",
	    options: ["Albert Einstein", "Alexander Graham Bell", "Isaac Newton", "Marie Curie"],
	    answer: 1,
	    difficulty: 1
	},
    ];
    
    return {
	getQuestion: function(id) {
	    if(id < questions.length) {
		return questions[id];
	    } else {
		return false;
	    }
	}
    };
});


app.directive('quiz', function(quizFactory) {
    return {
	restrict: 'AE',
	scope: {},
	templateUrl: 'template.html',
	link: function(scope, el, attrs) {
	    
	    scope.start = function() {
		scope.id = 0;
		scope.quizOver = false;
		scope.inProgress = true;

		scope.itemDifficulty = 0;
		scope.nAnswered = 0;
		scope.totalDifficulty = 0;
		scope.nCorrect = 0;
		scope.measure = 0;
		scope.passFailLevel = 4;
		scope.meanError = 0;
		
		scope.getQuestion();

		scope.isPassing = 0;
	    };

	    scope.reset = function() {
		scope.inProgress = false;
		scope.score = 0;
		scope.nCorrect = 0;
		scope.nShown = 0;
	    };
	    
	    scope.getQuestion = function() {
		var q = quizFactory.getQuestion(scope.id);
		if (q) {
		    scope.question = q.question;
		    scope.options = q.options;
		    scope.answer = q.answer;
		    scope.currentDifficulty = q.difficulty;
		} else {
		    scope.quizOver = true;
		}
	    };
	    
	    scope.checkAnswer = function() {
		var answer = $('input[name=answer]:checked');
		if (!answer.length) return;

		var value = answer.val();

		scope.correctAns = (value == scope.options[scope.answer]);
		scope.totalDifficulty += scope.itemDifficulty;
		scope.nAnswered++;
		
		if (scope.correctAns) {
		    scope.nCorrect++;
		}

		scope.score = (scope.nCorrect / scope.nAnswered) * 100;
	    };

	    scope.calculateDifficulty = function() {
		scope.itemDifficulty = scope.itemDifficulty + ((scope.correctAns) ? (2 / scope.nAnswered) : -(2 / scope.nAnswered));
		// decide to pass fail:
		W = scope.nAnswered - scope.nCorrect

		var r = scope.nCorrect;
		var w = W;
		
		if (W === 0) {
		    r = scope.nCorrect - 0.5;
		    w = W + 0.5;
		} else if (scope.nCorrect === 0) {
		    r = scope.nCorrect + 0.5;
		    w = W - 0.5;
		}
		
		scope.measure = (scope.totalDifficulty / scope.nAnswered) + (r / w);
		scope.meanError = Math.sqrt(scope.nAnswered / (r * w))

		// pass-fail std T
		if ((scope.passFailLevel - scope.meanError) < scope.measure && scope.measure < (scope.passFailLevel + scope.meanError)) {
		    // try again
		    scope.isPassing = 'IDK';
		} else if ((scope.measure - scope.meanError) > scope.passFailLevel) {
		    // end: pass
		    scope.isPassing = 'Passing';
		} else if ((scope.measure + scope.meanError) < scope.passFailLevel) {
		    // end: fail
		    scope.isPassing = 'Failing';
		} else {
		    // end
		    scope.isPassing = '??? ELSE ???';
		}
	    };
	    
	    scope.nextQuestion = function() {
		scope.checkAnswer();
		scope.calculateDifficulty()
		scope.id++;
		scope.getQuestion();
	    };

	    scope.reset();
	}
    }
});
