$(function() {
 
	buildBingo(); 
	
	$('#generate').click(function() { 
		buildBingo(); 
		return false; 
	});
	
	$('#print').click(function() { 
		window.print(); 
	});

});

function buildBingo() {
	var bingoOptions = new Array('"Emails"', '"Wall"', '"Sanctions"', '"Weapons of Mass Destruction"',
		'"Nuclear"', '"Edward Snowden"', '"Reagan"', '"Freedom"', '"Israel"', '"Russia"', '"China"', '"Benghazi"', '"Troops"', '"Iraq"',
		'"Crooked"', '"Middle East"', '"Israel"', '"Racist"', '"9/11"', 'Candidate calls out the other for lying',
		'"Mexico"', '"Youth"', '"Police"', '"Black Live Matter"', '"Blue Lives Matter"', '"All Lives Matter"',
		'"Illegal Immigrants"', '"Refugees"', '"Syria"', '"Police"', '"Vote"', '"Believe me"', '"Hu-uge"', '"Ok, folks"',
		'"Planned Parenthood"', '"Affordable Healthcare"', '"Sanders"', '"We\'re going to"',  '"Do everything I can"',
		'"Barriers"', '"Ok?"', '"Winning"', '"Free Trade"', '"Weak"', '"Loser"', '"Politically Correct"', '"Tough"',
		'"Very Very"', '"Out of control"', '"Go after"', '"Jobs"', '"Tremendous"', '"Family"', '"Together"',
		'"Make America Great Again"', 'Trump implies Clinton\'s health is bad', '"Supreme Court"', '"Drones"',
		'"Air Strikes"', 'Candidate refers to themself in the third person', 'Candidate repeats self', '"Can\'t be bought"',
		'Candidate doesn\'t answer question', 'Candidate talks over the other candidate', '"Gun Control"', '"Wall Street"');
	bingoOptions.sort(function () {
		return 0.5 - Math.random();
	});


	var bingoHTML = '<table class="bingo_card"><thead><tr><th>B</th><th>I</th><th>N</th><th>G</th><th>O</th></tr></thead><tbody>';

	for (i = 1; i <= 5; i++) {
		bingoHTML += "<tr>";
		for (j = 1; j <= 5; j++) {
			if (i == 3 && j == 3) {
				bingoHTML += "<td class='active'>FREE SPACE!</td>";
			} else {
				bingoHTML += "<td role='button' tabindex='0'>" + bingoOptions[i * 5 + j - 5] + "</td>";
			}
		}
		bingoHTML += "</tr>";
	}

	bingoHTML += '</tbody></table>';

	$('.bingo_card').remove();
	$('.middle').append(bingoHTML);

	$('td').each(function() {
		$(this).height($(this).width());
	});

	$('td').click(function() {
		$(this).toggleClass('active');
	});

	$('td').keypress(function(e) {
		if (e.keyCode == 13 || e.keyCode == 32) {
			$(this).trigger('click');
		}
	});

}