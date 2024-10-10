# StyleHub Coming Soon Page with Live Mode

## DEMO

https://github.com/user-attachments/assets/aa0cedb4-8b72-4a04-b172-72d66f3558b4


![image](https://github.com/user-attachments/assets/d65e8fcd-8869-4eba-988d-5926e981f5dd)

![image](https://github.com/user-attachments/assets/ca3a4eff-90af-4af0-9c16-5e85fc03d878)

![image](https://github.com/user-attachments/assets/6184d7c8-023d-4025-bc3b-9f4726bd1f4c)


This project is a "Coming Soon" page for the **StyleHub** website that features a subscription system for early access to the website. It includes an image carousel and live mode functionality. Users can subscribe via email to get early access to the live website. If access is granted or revoked, it will be reflected in their local session as well.

## Features

- **Image Carousel**: Rotating images with smooth transitions and clickable navigation dots.
- **Email Subscription**: Users can subscribe with their email to gain access to the live site.
- **Live Mode Detection**: Checks with the backend if the site is live and if the user has access.
- **Cross-tab Syncing**: Updates access status across multiple tabs if the local storage changes.
- **Local Storage Integration**: Email and access status are saved in `localStorage` to persist between sessions.
- **Automatic Email Removal**: If a user's email is removed from the database, it's also removed from local storage automatically.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/stylehub-coming-soon.git
   cd stylehub-coming-soon

2. npm install

3. npm start


## Technologies Used

Frontend:

    React
    Tailwind CSS (for styling)
    Context API (for managing global state)

Backend:

    Node.js
    Express.js (for handling API requests)
    MongoDB 

## Running in Production

**Build the project**
  npm run build

**Serve the built files**
  npm install -g serve
  serve -s build


### Key Sections:

1. **Installation**: A step-by-step guide to clone, install dependencies, and run the project locally.
2. **Features**: Highlights the main features of the project.
3. **Folder Structure**: Overview of the project's directory layout.
4. **Usage**: Describes how users can interact with the page and how the live mode works.
5. **API Endpoints**: Details the required API routes for email subscription and site status checking.
6. **Technologies Used**: Lists the technologies involved in the project.
7. **Production**: Steps to build and serve the application for production.
