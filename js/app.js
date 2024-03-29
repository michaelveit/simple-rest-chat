var parseId="TxEBRxTEoo0iIZchF3LwIc6yqBGCcGrvfnn95tXJ";
var parseRestId="DOBcNPUaPaggV5X4lgGY02BSi5sU8Yrpzgx0m3LT";

$(document).ready(function() {

	getMessages();
	$("#send").click(function() {
		var username = $('input[name=username]').attr('value');
		var message = $('input[name=message]').attr('value');
		console.log(username);
		console.log('!')
		$.ajax({
			url: 'https://api.parse.com/1/classes/MessageBoard',
			headers: {
				'X-Parse-Application-Id': parseId,
				'X-Parse-REST-API-Key': parseRestId,
			},
			contentType: 'application/json',
			dataType: 'json',
			processData: false,
			data: JSON.stringify({ 'username': username, 'message':message}),
			type: 'POST',
			success: function() {
				console.log('sent');
				getMessages();
			}
			error: function() {
				console.log('error');
			}

		});
	});


})

function getMessages() {
	$.ajax({
			url: 'https://api.parse.com/1/classes/MessageBoard',
			headers: {
				'X-Parse-Application-Id': parseId,
				'X-Parse-REST-API-Key': parseRestId,
			},
			contentType: 'application/json',
			dataType: 'json',
			type: 'GET',
			success: function(data) {
				console.log('GET');
				updateView(data);
			}
			error: function() {
				console.log('error');
			}

		});

}

function updateView(messages) {
	var table =$('.table tbody');
	table.html('');
	$.each(messages.results, function(index, value) {
		var trEl = $('<tr><td>' + value.username + '</td><td>' + value.message + '</td></tr>');
		table.append(trEl);
	});
	console.log(messages);
}