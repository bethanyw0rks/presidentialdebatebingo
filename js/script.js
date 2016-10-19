var selections = {};

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
	if (docCookies.getItem('bingoSelections')) {
		selections = JSON.parse(docCookies.getItem('bingoSelections'));
	}
	if (optNew || !docCookies.getItem('bingoOptions')) {
		var trump = new Array('"Wall"', '"Believe me"', '"Yuge"','"Loser"','"Very Very"',
			'Trump implies Clinton\'s health is bad','"Make America Great Again"',
			'Trump drinks his water awkwardly', '"Crooked"', '"Ok?"', '"Tax Returns"',
			'"Putin"', '"Birth Certificate"', '"Disaster"', 'Trump sniffles', '"30 Years"', '"Locker room talk"');
		var clinton = new Array('"Emails"', '"Ok, folks"', '"Do everything I can"',
			'"First Woman President"', '"Transcripts"', '"Benghazi"', '"TPP"', '"HillaryClinton.com"');
		var other = new Array( '"Sanctions"', '"Weapons of Mass Destruction"',
			'"Nuclear"', '"Edward Snowden"', '"Reagan"', '"Freedom"', '"Israel"', '"Russia"', '"China"',
			'"Troops"', '"Middle East"', '"Israel"', '"Racist"', '"9/11"', 'Candidate calls out the other for lying',
			'"Mexico"', '"Youth"', '"Police"', '"Black Live Matter"', '"Blue Lives Matter"', '"All Lives Matter"',
			'"Illegal Immigrants"', '"Refugees"', '"Syria"', '"Police"', '"Vote"', '"Planned Parenthood"',
			'"Affordable Healthcare"', '"Sanders"', '"We\'re going to"', '"Barriers"', '"Winning"', '"Free Trade"',
			'"Weak"', '"Politically Correct"', '"Tough"', '"Out of control"', '"Go after"', '"Jobs"',
			'"Tremendous"', '"Family"', '"Together"', '"Supreme Court"', '"Air Strikes"',
			'Candidate refers to themself in the third person',	'Candidate repeats self', '"Can\'t be bought"',
			'Candidate doesn\'t answer question', 'Candidate talks over the other candidate', '"Gun Control"',
			'"Wall Street"', '"NRA"', '"Rigged"', '"I never said that."', '"Terrific"', '"Take away your guns"',
			'"Outside the box"', '"Minimum wage"', '"Trickle down economics"', '"1%"',
			'"Middle Class"', '"Rhetoric"', '"Common sense"', '"Equal pay"', '"Maternity leave"',
			'"Global warming"', 'Candidate scoffs or rolls eyes', '"NAFTA"', '"Gun show loophole"', '"Wikileaks"',
			'"Fact check"', '"Tempermant"');
		// Other possible words: '"Stop and frisk"',
		var origOptions = trump.concat(clinton);
		origOptions = origOptions.concat(other);
		var bingoOptions = origOptions;

		/* VP  Stuff*/
		//var vp = new Array('"Christian"','"Conservative"','"Unborn"', '"Religious freedom"', 'Candidate says something in Spanish');
		// var origOptions = other.concat(vp);
		// var bingoOptions = origOptions;

		bingoOptions.sort(function () {
			return 0.5 - Math.random();
		});
		docCookies.setItem('bingoOptions', JSON.stringify(bingoOptions));
		selections = [];
		docCookies.setItem('bingoSelections', JSON.stringify(selections));
	} else {
		bingoOptions = JSON.parse(docCookies.getItem('bingoOptions'));
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
		docCookies.setItem('bingoSelections', JSON.stringify(selections));
	});

	$('td').keypress(function(e) {
		if (e.keyCode == 13 || e.keyCode == 32) {
			$(this).trigger('click');
		}
	});

}

docCookies = {
	getItem: function (sKey) {
		if (!sKey || !this.hasItem(sKey)) { return null; }
		return unescape(document.cookie.replace(new RegExp("(?:^|.*;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*"), "$1"));
	},
	/**
	 * docCookies.setItem(sKey, sValue, vEnd, sPath, sDomain, bSecure)
	 *
	 * @argument sKey (String): the name of the cookie;
	 * @argument sValue (String): the value of the cookie;
	 * @optional argument vEnd (Number, String, Date Object or null): the max-age in seconds (e.g., 31536e3 for a year) or the
	 *  expires date in GMTString format or in Date Object format; if not specified it will expire at the end of session;
	 * @optional argument sPath (String or null): e.g., "/", "/mydir"; if not specified, defaults to the current path of the current document location;
	 * @optional argument sDomain (String or null): e.g., "example.com", ".example.com" (includes all subdomains) or "subdomain.example.com"; if not
	 * specified, defaults to the host portion of the current document location;
	 * @optional argument bSecure (Boolean or null): cookie will be transmitted only over secure protocol as https;
	 * @return undefined;
	 **/
	setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
		if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/.test(sKey)) { return; }
		var sExpires = "";
		if (vEnd) {
			switch (typeof vEnd) {
				case "number": sExpires = "; max-age=" + vEnd; break;
				case "string": sExpires = "; expires=" + vEnd; break;
				case "object": if (vEnd.hasOwnProperty("toGMTString")) { sExpires = "; expires=" + vEnd.toGMTString(); } break;
			}
		}
		document.cookie = escape(sKey) + "=" + escape(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
	},
	removeItem: function (sKey) {
		if (!sKey || !this.hasItem(sKey)) { return; }
		var oExpDate = new Date();
		oExpDate.setDate(oExpDate.getDate() - 1);
		document.cookie = escape(sKey) + "=; expires=" + oExpDate.toGMTString() + "; path=/";
	},
	hasItem: function (sKey) { return (new RegExp("(?:^|;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie); }
};