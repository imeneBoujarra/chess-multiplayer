# Chess Multiplayer Angular Project

A real-time multiplayer chess application built with **Angular 18**, **WebSockets**, and **STOMP**, featuring professional login, registration, lobby, and chessboard interface.  

---

## Table of Contents

- [Chess Multiplayer Angular Project](#chess-multiplayer-angular-project)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Tech Stack](#tech-stack)
  - [Project Structure](#project-structure)
- [Chess Multiplayer Angular Project](#chess-multiplayer-angular-project-1)
  - [Table of Contents](#table-of-contents-1)
  - [Features](#features-1)
  - [Tech Stack](#tech-stack-1)
  - [Project Structure](#project-structure-1)
  - [Installation](#installation)
  - [Expected flow:](#expected-flow)

---

## Features

- User authentication (**Login/Register**)  
- Real-time **lobby** displaying connected players  
- Send and receive **game invitations**  
- Interactive **chessboard** for gameplay  
- Professional and responsive layout  
- Clean **Angular 18 standalone components**  

---

## Tech Stack

- **Frontend:** Angular 18, TypeScript, SCSS  
- **WebSocket:** STOMP.js, WebSocket service  
- **Chessboard:** [`chessboard-element`](https://chessboard-element.com/)  
- **Styling:** SCSS with a professional layout  
- **Routing:** Angular Router  
- **Form handling:** Reactive Forms  

---

## Project Structure

# Chess Multiplayer Angular Project

A real-time multiplayer chess application built with **Angular 18**, **WebSockets**, and **STOMP**, featuring professional login, registration, lobby, and chessboard interface.  

---

## Table of Contents

- [Chess Multiplayer Angular Project](#chess-multiplayer-angular-project)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Tech Stack](#tech-stack)
  - [Project Structure](#project-structure)
- [Chess Multiplayer Angular Project](#chess-multiplayer-angular-project-1)
  - [Table of Contents](#table-of-contents-1)
  - [Features](#features-1)
  - [Tech Stack](#tech-stack-1)
  - [Project Structure](#project-structure-1)
  - [Installation](#installation)
  - [Expected flow:](#expected-flow)

---

## Features

- User authentication (**Login/Register**)  
- Real-time **lobby** displaying connected players  
- Send and receive **game invitations**  
- Interactive **chessboard** for gameplay  
- Professional and responsive layout  
- Clean **Angular 18 standalone components**  

---

## Tech Stack

- **Frontend:** Angular 18, TypeScript, SCSS  
- **WebSocket:** STOMP.js, WebSocket service  
- **Chessboard:** [`chessboard-element`](https://chessboard-element.com/)  
- **Styling:** SCSS with a professional layout  
- **Routing:** Angular Router  
- **Form handling:** Reactive Forms  

---

## Project Structure

frontend/
│
├─ src/app/
│ ├─ core/
│ │ ├─ auth/ # Authentication service
│ │ └─ ws/ # WebSocket service
│ │
│ ├─ features/
│ │ ├─ login/
│ │ │ ├─ login-component.ts
│ │ │ ├─ login-component.html
│ │ │ └─ login-component.scss
│ │ ├─ register/
│ │ │ ├─ register-component.ts
│ │ │ ├─ register-component.html
│ │ │ └─ register-component.scss
│ │ └─ lobby/
│ │ ├─ lobby-component.ts
│ │ ├─ lobby-component.html
│ │ └─ lobby-component.scss
│ │
│ └─ app.module.ts
│
├─ angular.json
├─ package.json
└─ README.md


---

## Installation

1. **Clone the repository:**

```bash
git clone https://github.com/imeneBoujarra/chess-multiplayer.git
cd Chess-multiplayer/frontend

2. **Install dependencies:**
npm install 
3. **Ensure Node and npm versions are compatible:**
node -v   # v22.16.0
npm -v    # 10.9.2

Running the Project

Start the Angular frontend:

ng serve


Open in browser:

http://localhost:4200


## Expected flow:

1. Register a new user

2. Login to access the lobby

3. See online players on the left panel

4. Send or receive invitations

5. Chessboard appears in the center upon starting a game




⚡ This project demonstrates a fully functional, real-time multiplayer chess app using Angular 18 modern features, standalone components, and SCSS styling.
