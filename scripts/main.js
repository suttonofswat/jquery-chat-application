'use strict';

$(document).ready(function() {
	var $username =$('#username');
	var $usernameForm= $('#usernameForm')
	var $chatList = $('#chatList');
	var $chatForm = $('#chatForm');
	var $message = $('#inputMsg');
	var $newUN = $username.val();

	
	
	$usernameForm.submit(function(e){
		e.preventDefault();
		$newUN = $username.val();
		console.log($newUN);
		$usernameForm.text('welcome'+' '+$newUN);

		
	});


	$chatForm.submit(function(e){
		e.preventDefault();

		var $newMessage = $message.val();
		var dat = new Date();
		var date = dat.toISOString();

		$.post(

			'http://tiyfe.herokuapp.com/collections/leslie-chat2',
			{username: $newUN, message: $newMessage, timeSince: date},

			'json'

		);
		$message.val('');
	});


	setInterval(function() {
		$.get(
			
			
			'http://tiyfe.herokuapp.com/collections/leslie-chat2',
			function(response) {
				$chatList.html('');

				response.reverse();
					for(var i=0; i<response.length; i++){
						$chatList.append('<div>'+'<div class="chatWin">'+response[i].username+'</div>'+'<div class="chatWin">'+response[i].message+'</div>'+'<div class="chatDate">'+moment(response[i].timeSince).fromNow()+'</div>'+'</div>');

					}
					$('.chatWin').emoticonize();

			},
			'json'
		);
	},500);



	


});



