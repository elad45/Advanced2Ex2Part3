
<h3>Requirements:</h3>

For running this project it's required to have Node.JS installed on your computer.
After that navigate to the project directory and run at the CMD the following commands:
### `npx create-react-app project_name`
where project_name is the project name you want to have and that's will be the name of the directory where you download the repository files as well. This command will install some react realted files.

It's required to have react bootstrap, signalR files as well. please run the follwing command at the node_modules directory (you can navigate there by cd project_name cd node_modules)
### `npm install react-bootstrap bootstrap`
### `npm i`
after it has finished, navigate back to project_name directory run
### `npm install bootstrap`
### `npm install react-router-dom@6`
### `npm start`
Open [http://localhost:3000](http://localhost:3000) to view the project in your browser.

if you want to chat with yourself, please run npm start again on the cmd for having a different port.
<h3>How to use the project:</h3>

The chat has 3 routes.
(3000 is the default port)
1) Login - http://localhost:3000
2) Register - http://localhost:3000/register
3) Chat - http://localhost:3000/chat

The server (and only the server) holds some hard-coded users.
each user has username and password used for login

Once you login or register you will be logged to the user's chat related.

Please login to the following user:
username: bob2
password: 12345

This user has some hard-coded messages and contacts as required in the assignment requirements.
to log to his hard-coded contacts you can use:
username: alice
password:1234

or

username: bob
password: 123

Some information for the Register page:
The page asks you for username,nickname,  password.

- Username  Must be unique. In case you enter a username that's already in the system it will not let you use this name and ask you to change. (Be advised that there are some hard-coded users in the server which appears at the bottom of the README)

- nickname is the name you'll see yourself in the chat screen

- Password: must contain at least 5 characters with at least one digit and one special character     (!@#$%^&*)
  for example "12345!" is a good password



The server's hard coded users are listed by: 
username, nickname, password
- bob2, Bobby2S, 12345 (Main user who has hard-coded chats followed by assignement requirements)
- alice, AliciaS, 1234 (bob2 has her as a contact)
- bob, BobbyS, 123 (bob2 has him as a contact)
- Elad, Elad56S, 12
- Michael, Michael12S, 12345

please note that the hard-coded passwords don't allign with password requirement as it just for making the login easier.


besides that there are two more servers.
one is the server that holds the API on localhost:5094
and the other one is the server for the reviews page on localhost:5104.

after you login\register it will forward you to the chatscren and on the upper-left side you'll see a link to the reviews page.



for running the servers:

on the main directory you have ReviewsPart2.sln, NoDBPART3.sln.
ReviewsPart2.sln is the server for the reviews page and NoDBPART3.sln is the API.
please run both of them.
for the react please go to reactEx1 and on the cmd type npm start.
