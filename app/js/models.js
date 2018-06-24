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
