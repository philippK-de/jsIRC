What is it ?
==============
An IRC client written in pure Javascript.
It uses the SocketBridge Java Applet for the socket connection to the IRC server.
https://github.com/ihilt/JavaSocketBridge

All parsing of the IRC response, sending of commands etc is done in Javascript.

This was written for a specific site, and is not quite optimized for general consumption yet.
It connects a hardcoded server, and channel by default - although you can change that to suit your needs.

It is completely web based. The GUI is in HTML/CSS.

This can be a starting point for further implementations / learning.

Features
==============
- Connect to IRC, send messages, actions, etc
- Parse IRC response 
- Get channel userlist
- Colored text
- Bold and italic text
- Graphic smilies
- Private messages in separate windows