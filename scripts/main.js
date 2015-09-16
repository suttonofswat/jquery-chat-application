'use strict';

$(document).ready(function() {
	var $chatList = $('#chatList');
	var $form = $('form');
	var $message = $('#inputMsg');


	$form.submit(function(e){
		e.preventDefault();

		var $newMessage = $message.val();
		var dat = new Date();
		var date = dat.toISOString();

		$.post(

			'http://tiyfe.herokuapp.com/collections/leslie-chat',
			{message: $newMessage, timeSince: date},

			'json'

		);
		$message.val('');
	});


	setInterval(function() {
		$.get(
			
			
			'http://tiyfe.herokuapp.com/collections/leslie-chat',
			function(response) {
				$chatList.html('');
				response.reverse();
					for(var i=0; i<response.length; i++){
						$chatList.append('<div>'+'<div class="chatWin">'+response[i].message+'</div>'+'<div class="chatDate">'+moment(response[i].timeSince).fromNow()+'</div>'+'</div>');

					}
			},
			'json'
		);
	},500);



	


});



