```mermaid
sequenceDiagram
    participant user as User
    participant browser as Browser
    participant server as Server

    user->>browser: Create new note
    browser->>server: POST /exampleapp/new_note_spa
    activate server
    server-->>browser: [{content: "Hacking the mainframe", date: "2024-05-21T12:09:27.013Z"}]
    deactivate server
    browser->>user: Display new note in UI