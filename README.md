# 11 Express.js: Note Taker

## [Heroku Deployment Link](https://daily-notetaker.herokuapp.com/)


## Overview

This app is a notetaker that receives and saves data from a client in a .json file for the client to retrieve later.  The puprose of the app is to help people make lists of notes and todos, and store and retrieve the data when necessary.

When the user starts the app, they come to a landing page that looks like this:

<img width="1143" alt="Screen Shot 2022-09-08 at 5 01 51 PM" src="https://user-images.githubusercontent.com/106923428/189240721-f6828562-b92f-4204-8079-731375ff8309.png">

After clicking "Getting Started" the client comes to a page that looks like this:

<img width="1148" alt="Screen Shot 2022-09-08 at 5 03 47 PM" src="https://user-images.githubusercontent.com/106923428/189240815-966604e8-80c9-4ec0-9c54-c8a3db876073.png">

When the client clicks on any of the notes in the left hand-side, it presents with a full note with title and text of the note.

<img width="1137" alt="Screen Shot 2022-09-08 at 5 05 31 PM" src="https://user-images.githubusercontent.com/106923428/189240965-2d4c50a5-8951-4381-9cc0-b40b0f93fd9f.png">


Client can also delete notes by clicking on the trash icons as follows:

<img width="826" alt="Screen Shot 2022-09-08 at 5 06 23 PM" src="https://user-images.githubusercontent.com/106923428/189241058-9b6172c6-bf04-4a07-9a22-4d2a81027deb.png">


And of course users can add notes any time they like using the '+' icon, and then save the notes using the "Save" icon

<img width="1125" alt="Screen Shot 2022-09-08 at 5 07 42 PM" src="https://user-images.githubusercontent.com/106923428/189241170-666dea96-b679-4d2d-8a2a-24f9052f2545.png">


## Challenges

While this assignment only called for about 60 lines of code on the server.js file, there were 2 tricky parts that required quite a bit of time.  First, getting the notes to save in the db.json file as objects in an array took a bit of time and research to figure out.  Finally learned it required a fs.readFileSync and well as JSON.parse and finally fs.writeFileSync to accomplish that task.  

The other challenge was in the bonus part for deleting.  Getting the notes to delete was no problem as the starter code had already created a function for that, but getting the index set up correctly to delete only the selected note took a bit of time to solve as well.
