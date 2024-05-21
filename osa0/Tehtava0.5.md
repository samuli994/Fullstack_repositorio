```mermaid
sequenceDiagram
	participant browser
	participant server

	browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
	activate server
	server-->>browser: HTML document
	deactivate server

	browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
	activate server
	server-->>browser: css file
	deactivate server

	browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
	activate server
	server-->>browser: JavaScript file
	deactivate server
	
	Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server

	browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
	activate server
	server-->>browser: [{content: "bbe", date: "2024-05-21T03:32:09.553Z"}, {content: "", date: "2024-05-21T03:52:37.540Z"},…]
	deactivate server

	Note right of browser: The browser executes the callback function that renders the notes