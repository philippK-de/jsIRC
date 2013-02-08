
function parseColors(text) {	
      var startPos = 0; 
      var endPos = 0;
      var colorCode = 0;
      var backColorCode = 0;
		
	startPos = 0;
	while (startPos >= 0 && startPos <= text.length) {		
		startPos = text.indexOf(String.fromCharCode(3), startPos);
				
		if (startPos >= 0) {
			endPos = text.indexOf(String.fromCharCode(3), startPos + 1);
			if (endPos == -1) endPos = text.length;
			
			// search end of color code
			var digitCount = 0;
			var foundDecimal = false;
			var i = 0;
			for (i = startPos + 1; i <= endPos; i++) {
				if (text.substr(i, 1) != ',' && isNaN(parseInt(text.substr(i, 1)))) {
					i--;
					break; 
				} else if (text.substr(i, 1) == ',' && !foundDecimal) {
					digitCount = 0;
					foundDecimal = true;
				} else if (text.substr(i, 1) == ',') {
					i--;
					break;
				} else {
					digitCount++;
					if (digitCount > 2) {
						i--;
						break;
					}
				}				
			}
									
			// get colors
			var codeString = text.substr(startPos + 1, i - startPos);
			colorCode = parseInt(getSplit(codeString, 0, ',', '0'), 10);			
			backColorCode = parseInt(getSplit(codeString, 1, ',', '0'), 10);
			if (isNaN(colorCode)) colorCode = 0;
			if (isNaN(backColorCode)) backColorCode = 0;
			if (colorCode > 15) colorCode = 0;
			if (backColorCode > 15) backColorCode = 0;												
			
			text = text.substr(0, endPos) + '</span>' + text.substr(endPos);											
			text = text.substr(0, startPos) + '<span class=\"chatcolor' + colorCode + '\">' + text.substr(startPos + codeString.length + 1);
														
		} else {
			break;
			
		}
						
	}
	
	text = parseTextStyle(text); 
		
	return text;
	
}

function parseTextStyle(text) {	
      var startPos = 0; 
      var endPos = 0;
		
	while (startPos >= 0 && startPos <= text.length) {		
		startPos = text.indexOf(String.fromCharCode(2), startPos);				
		if (startPos >= 0) {
			endPos = text.indexOf(String.fromCharCode(2), startPos + 1);
			if (endPos == -1) endPos = text.length;
			text = text.substr(0, endPos) + '</strong>' + text.substr(endPos + 1);											
			text = text.substr(0, startPos) + '<strong>' + text.substr(startPos + 1);
		} else {
			break;			
		}
	}
		
	return text;
	
}

function getSplit(text, index, seperator, def) {	
	var parts = text.split(seperator);
	if (index <= parts.length - 1) {
		return parts[index];
	} else {
		return def;
	}
		
}
