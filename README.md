# The Room

## Overview
This project is a full-stack web application combining a NestJS backend with Socket.io for real-time chat, Next.js for a dynamic web interface, and MongoDB for data storage. It features OAuth2.0 Google authentication and session management with express-session and Redis. Nginx serves as a reverse proxy, handling request routing and SSL termination to ensure secure, seamless interactions between the frontend and backend.

## Features
- **User Authentication:** Secure login system using OAuth2.0 with Google authentication.
- **Session Management:** Utilizes express-session with Redis for session storage to ensure scalable and efficient session handling.
- **Real-Time Chat:** Real-time communication through Socket.io, allowing users to join and participate in the chat room.
- **Modern Web Interface:** A responsive and dynamic frontend developed with Next.js.
- **Scalable Architecture:** Containerized with Docker for consistent development, testing, and production environments.

## Architecture

### Backend:

- **Server:** Utilizes the NestJS framework to handle REST API requests efficiently. Real-time bidirectional communication is facilitated by Socket.io.
- **Database:** MongoDB is employed for storing user profiles and chat messages, providing a scalable solution for data management.
- **Session Storage:** Manages user sessions using express-session, with session data stored in a Redis instance for optimal performance and scalability.

### Frontend:

- **Web Interface:** Developed with Next.js, a powerful React framework, to create a responsive, server-rendered, and statically-exported web application for a seamless user experience.

### Middleware:

- **Reverse Proxt:** Configured Nginx acts as a reverse proxy, handling routing of frontend and backend requests, as well as managing SSL termination for secure communication.


## Getting Started

To get started with this project, follow these steps:

- **1. Clone the Repository:**

```cmd
git clone https://github.com/imiguez/the-room.git
cd the-room
```


- **2. Set Up Environment Variables:**

In order to run the app, you must get Google OAuth credentials and fill in the environment vairables from the .env within the **/backend** folder.
Example:
```.env
## Google
GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET
```

- **3. Start Docker Containers:**

Make sure Docker and Docker Compose are installed. Then, run:
```
docker-compose -f docker-compose.prod.yml up
```
This command will build and start all the necessary services as a production environment. Why don't use the docker-compose.dev.yml? Because the development images are not as optimized as the production images, and it will watch every change you make on the frontend and backend folders.

- **4. Access the Application:**

Frontend: Visit http://localhost to access the web interface.
Backend API: The backend API will be accessible at http://localhost/api.
