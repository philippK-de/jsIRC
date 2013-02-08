
	//Parse and Print chattext to the main window
	function printChatText(chattext){
		var theuser = chattext.split("!");
		var myuser = theuser[0];
		var thetext = theuser[1];

		var indexOfMessage = thetext.indexOf(":");
		var mytext = thetext.substr(indexOfMessage+1);
		actionchk = mytext.indexOf(chr(1)+"ACTION");

		mytext = parseColors(mytext);
		mytext = parseUrls(mytext);
		mytext = parseSmilies(mytext);

		if(actionchk != -1)
		{
			var sendtext = mytext.substr(8)
			actiontext = sendtext.substr(0,sendtext.length-1);
			document.getElementById('result').innerHTML += "<span class = 'useraction'>"  + myuser.substr(1) + " " + actiontext + "</span><br />";
		}
		else
		{
			document.getElementById('result').innerHTML += "<strong>" + myuser.substr(1) + "</strong>" + ": "  +  mytext + "<br />";
		}
		var objDiv = document.getElementById("result");
		objDiv.scrollTop = objDiv.scrollHeight;
	}

	//Request userlist from the server
	function sendWho(){
		userlist = new Array();
		socket_send("WHO #gsingle");

	}

	//Write userlist to array
	function populateUserlist(message){
		document.getElementById("userlist").innerHTML = "";
		usersplit = message.split(" ");

		var adduser = usersplit[7] + "#" + usersplit[10] + "#" + usersplit[11] + "#" + usersplit[12];

		userlist.push(adduser);

	}

	//Print userlist to HTML
	function printUserlist(){
		userlist.sort();
		//document.getElementById('userlist').innerHTML += "User online: " + userlist.length + "<br />";
		for(i=0;i<userlist.length;i++)
		{
			var theuser = userlist[i].split("#");
			var theId = theuser[1].substr(3);
			var theSex = theuser[2];
			var theName = theuser[3];
			if(theSex == "W")
			{
				var sexIcon = "frauen.gif";
			}
			else
			{
				var sexIcon = "maenner.gif";
			}
			document.getElementById("userlist").innerHTML += "<a href = \"http://www.gothic-singles.de/profil-" + theId + ".htm\" target = \"_blank\" title = \""+theName+"\"><img src = \"http://www.gothic-singles.de/gfx/test/"+sexIcon+"\" border = \"0\"/>" +theuser[0] + "</a>&nbsp;&nbsp;&nbsp;<a href = \"javascript:openDia('"+theuser[0]+"');\" title = \"Privatdialog öffnen\">>></a><br />";
		}
		userlist = new Array();

	}

	//Send message to the chat
	function sendMsg(){
		inputvalue = document.getElementById("usertext").value;
		if(!inputvalue)
		{
			return;
		}
		socket_send("PRIVMSG #gsingle :"+inputvalue);
		inputvalue = parseSmilies(inputvalue);
		document.getElementById('result').innerHTML += "<strong>" + thenick + "</strong>" + ": "  +  inputvalue + "<br />";
		document.getElementById("usertext").value = "";
		var objDiv = document.getElementById("result");
		objDiv.scrollTop = objDiv.scrollHeight;
	}

	//Send action to the chat
	function sendAction(){
		inputvalue = document.getElementById("usertext").value;
		if(!inputvalue)
		{
			return;
		}
		socket_send("PRIVMSG #gsingle :" + chr(1) + "ACTION " + inputvalue + chr(1));
		document.getElementById('result').innerHTML += "<span class = 'useraction'>" + thenick + " " + inputvalue + "</span><br />";
		document.getElementById("usertext").value = "";
		var objDiv = document.getElementById("result");
		objDiv.scrollTop = objDiv.scrollHeight;

	}

	//Send single smilie to the chat
	function sendSmilie(smilie){
		socket_send("PRIVMSG #gsingle :"+smilie);
		smilie = parseSmilies(smilie);
		document.getElementById('result').innerHTML += "<strong>" + thenick + "</strong>" + ": "  +  smilie + "<br />";
		document.getElementById("usertext").value = "";
		var objDiv = document.getElementById("result");
		objDiv.scrollTop = objDiv.scrollHeight;
	}

	//Handle privat messages queue
	function handleDia(message)
	{
		var theuser = message.split("!");
		var myuser = theuser[0];
		myuser = myuser.substr(1);
		var thetext = theuser[1];
		var indexOfMessage = thetext.indexOf(":");
		var mytext = thetext.substr(indexOfMessage+1);

		if(!checkDia("dia"+myuser))
		{
			if(mytext.indexOf(chr(1)+"GSM") == -1 && mytext.indexOf(chr(1)+"VERSION") == -1)
			{
				var dia = window.open("http://client.gothic-singles.de/js/dia.php","dia"+myuser,"height=200px,width=300px,dependent=yes,location=no,menubar=no,resizable=yes,scrollbars=no,toolbar=no");
				dias.push(dia);
				window.setTimeout("printDia('"+mytext+"','"+myuser+"')",1000);
			}
		}
		else
		{
			printDia(mytext,myuser);
		}
	}

	function openDia(diauser){
			var dia = window.open("http://client.gothic-singles.de/js/dia.php?user="+diauser,"dia"+diauser,"height=200px,width=300px,dependent=yes,location=no,menubar=no,resizable=yes,scrollbars=no,toolbar=no");
			dias.push(dia);
	}

	//Send message to user
	function sendDiaMsg(recipient){
		var diaobj = getDia("dia"+recipient);
		inputvalue = diaobj.document.getElementById("usertext").value;
		if(!inputvalue)
		{
			return;
		}
		socket_send("PRIVMSG "+recipient+" :"+inputvalue);
		inputvalue = parseSmilies(inputvalue);
		diaobj.document.getElementById('result').innerHTML += "<strong>" + thenick + "</strong>" + ": "  +  inputvalue + "<br />";
		diaobj.document.getElementById("usertext").value = "";
		var objDiv = diaobj.document.getElementById("result");
		objDiv.scrollTop = objDiv.scrollHeight;
	}

	function printDia(sendtext,diaref)
	{
		var diaobj = getDia("dia"+diaref);
		if(sendtext.indexOf(chr(1)+"GSM") == -1)
		{
			sendtext = parseColors(sendtext);
			sendtext = parseSmilies(sendtext);
			diaobj.document.getElementById('result').innerHTML += "<strong>" + diaref + "</strong>: " + sendtext + "<br />";
			diaobj.document.title = "Dialog mit "+diaref;
			diaobj.document.getElementById('chatwith').value = diaref;
			var objDiv = diaobj.document.getElementById("result");
			objDiv.scrollTop = objDiv.scrollHeight;
		}
	}

	function checkDia(myName)
	{
		var chk = false;
		for(i=0;i<dias.length;i++)
		{
			if(dias[i].name == myName)
			{
				chk = true;
			}

		}
		return chk;
	}

	function getDia(dia)
	{
		var thedia = false;
		for(i=0;i<dias.length;i++)
		{
			if(dias[i].name == dia)
			{
				thedia = dias[i];
			}
		}
		return thedia;
	}


	//Parse input string for smiliecode and replace them with HTML
	function parseSmilies(text)
	{
		for(i=0;i<smilies.length;i++)
		{
			var theregex = new RegExp(smilies[i],"g");
			text = text.replace(theregex,smiliehtml[i]);
		}

		return text;
	}

	//Make Links clickable
	function parseUrls(text)
	{
		var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/i;
		return text.replace(exp,"<a href='$1' target = '_blank'>$1</a>");
	}

	function on_socket_error(message){
		alert(message);
		socket_disconnect();
	}
