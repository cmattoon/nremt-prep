var Exam = function() {
    var self = this;
    
    self.LEVELS = [
        {'name': 'EMR', 'label': 'EMR - Emergency Medical Responder', 'min': 90, 'max': 110},
        {'name': 'EMT', 'label': 'EMT - Emergency Medical Technician (EMT-B)', 'min': 70, 'max': 120},
        {'name': 'AEMT', 'label': 'AEMT - Advanced EMT', 'min': 135, 'max': 135},
        {'name': 'NRP', 'label': 'NRP - Paramedic', 'min': 80, 'max': 150}
    ];

    self.questions = [];
    self.activeQuestions = [];

    
};

/**
 * Question.id = sha1 hash
 * Question.text = Question Body
 * Question.choices = List of Choices
 * Question.tags = List of Tags
 */
function Question(id, text, choices, tags) {
    
    return {
	'id': id,
	'text': text,
	'choices': choices,
	'tags': tags
    }
};
