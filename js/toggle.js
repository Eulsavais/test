$(document).ready(function() {
	$('.toggle_menu').click(function(event) {
		$('.toggle_menu,.main_bar').toggleClass('active');
		$('body').toggleClass('lock')
	});
});