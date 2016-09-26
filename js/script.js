var selections = new Array();

$(function() {
 
	buildBingo(false);
	
	$('#generate').click(function() { 
		buildBingo(true);
		return false; 
	});
	
	$('#print').click(function() { 
		window.print(); 
	});

});

function buildBingo(optNew) {
	if (getCookie('bingoSelections')) {
		selections = JSON.parse(getCookie('bingoSelections'));
	}
	if (optNew || !getCookie('bingoOptions')) {
		var origOptions = new Array('"Emails"', '"Wall"', '"Sanctions"', '"Weapons of Mass Destruction"',
			'"Nuclear"', '"Edward Snowden"', '"Reagan"', '"Freedom"', '"Israel"', '"Russia"', '"China"', '"Benghazi"', '"Troops"', '"Iraq"',
			'"Crooked"', '"Middle East"', '"Israel"', '"Racist"', '"9/11"', 'Candidate calls out the other for lying',
			'"Mexico"', '"Youth"', '"Police"', '"Black Live Matter"', '"Blue Lives Matter"', '"All Lives Matter"',
			'"Illegal Immigrants"', '"Refugees"', '"Syria"', '"Police"', '"Vote"', '"Believe me"', '"Hu-uge"', '"Ok, folks"',
			'"Planned Parenthood"', '"Affordable Healthcare"', '"Sanders"', '"We\'re going to"',  '"Do everything I can"',
			'"Barriers"', '"Ok?"', '"Winning"', '"Free Trade"', '"Weak"', '"Loser"', '"Politically Correct"', '"Tough"',
			'"Very Very"', '"Out of control"', '"Go after"', '"Jobs"', '"Tremendous"', '"Family"', '"Together"',
			'"Make America Great Again"', 'Trump implies Clinton\'s health is bad', '"Supreme Court"', '"Drones"',
			'"Air Strikes"', 'Candidate refers to themself in the third person', 'Candidate repeats self', '"Can\'t be bought"',
			'Candidate doesn\'t answer question', 'Candidate talks over the other candidate', '"Gun Control"', '"Wall Street"',
			'"NRA"', '"First Woman President"', '"Rigged System"', '"I never said that."', '"Terrific"', '"Oval Office"',
			'"Take away your guns"', '"Outside the box"');
		var bingoOptions = origOptions;
		bingoOptions.sort(function () {
			return 0.5 - Math.random();
		});
		setCookie('bingoOptions', JSON.stringify(bingoOptions), 1);
		selections = [];
		setCookie('bingoSelections', JSON.stringify(selections), 1);
	} else {
		bingoOptions = JSON.parse(getCookie('bingoOptions'));
	}

	var bingoHTML = '<table class="bingo_card"><thead><tr><th>B</th><th>I</th><th>N</th><th>G</th><th>O</th></tr></thead><tbody>';

	for (i = 1; i <= 5; i++) {
		bingoHTML += "<tr>";
		for (j = 1; j <= 5; j++) {
			if (i == 3 && j == 3) {
				bingoHTML += "<td class='active' id='space" + i + '-' + j + "'>FREE SPACE!</td>";
			} else {
				var activeClass = "";
				if ($.inArray(i+'-'+j, selections) != -1) {
					activeClass  = "active" ;
				}
				bingoHTML += "<td class='" + activeClass  + "' role='button' id='space" + i + '-' + j + "' tabindex='0'>" + bingoOptions[i * 5 + j - 5] + "</td>";
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

		selections = [];
		// Update selections
		$('td.active').each(function() {
			newVal = $(this).prop('id').replace('space', '');
			selections.push(newVal);
		});

		// Set cookie with selections
		setCookie('bingoSelections', JSON.stringify(selections), 1);
	});

	$('td').keypress(function(e) {
		if (e.keyCode == 13 || e.keyCode == 32) {
			$(this).trigger('click');
		}
	});

}

function setCookie(cname, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	var expires = "expires="+ d.toUTCString();
	document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for(var i = 0; i <ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length,c.length);
		}
	}
	return "";
}
