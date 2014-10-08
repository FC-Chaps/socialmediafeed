module.exports = {

	getContent: function getContent (url) {
		$.ajax({
			url: url
			success: function (data) {
				return data;
			}
		});

	},

	injectToDom: function injectToDom (content) {
		$("#page").html(content);
	},

	jsonManipulator: function jsonManipulator (data) {
		var content = "";
		
		return content;
	}




}