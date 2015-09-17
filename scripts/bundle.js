(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

$(document).ready(function () {
	var $username = $('#username');
	var $usernameForm = $('#usernameForm');
	var $chatList = $('#chatList');
	var $chatForm = $('#chatForm');
	var $message = $('#inputMsg');
	var $newUN = $username.val();

	$usernameForm.submit(function (e) {
		e.preventDefault();
		$newUN = $username.val();
		console.log($newUN);
		$usernameForm.text('welcome' + ' ' + $newUN);
	});

	$chatForm.submit(function (e) {
		e.preventDefault();

		var $newMessage = $message.val();
		var dat = new Date();
		var date = dat.toISOString();

		$.post('http://tiyfe.herokuapp.com/collections/leslie-chat2', { username: $newUN, message: $newMessage, timeSince: date }, 'json');
		$message.val('');
	});

	setInterval(function () {
		$.get('http://tiyfe.herokuapp.com/collections/leslie-chat2', function (response) {
			$chatList.html('');

			response.reverse();
			for (var i = 0; i < response.length; i++) {
				$chatList.append('<div>' + '<div class="chatWin">' + response[i].username + '</div>' + '<div class="chatWin">' + response[i].message + '</div>' + '<div class="chatDate">' + moment(response[i].timeSince).fromNow() + '</div>' + '</div>');
			}
			$('.chatWin').emoticonize();
		}, 'json');
	}, 500);
});

},{}]},{},[1])


//# sourceMappingURL=bundle.js.map