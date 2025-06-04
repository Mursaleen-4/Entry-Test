# WEProject

## Overview
WEProject is a web application designed for managing student interactions, including login, signup, and test-taking functionalities. The application features an admin interface for managing users and data.
## Live demo
entry-test-chi.vercel.app
## Project Structure
```
WEProject/
├── public/
│   ├── index.html           # Root HTML file
│   ├── favicon.ico          # Favicon for the application
├── src/
│   ├── components/          # React components
|   |             |──Admin/
|   |                     ├──AdminDashboardPage.jsx
|   |                     ├──AdminLoginPage.jsx
|   |                     ├──StudentDetails.jsx
│   |             |──Student/
|   |                     ├──SignupPage.jsx
|   |                     ├──StudentDashboard.jsx
|   |                     ├──StudentLoginPage.jsx
|   |                     ├──TestPage.jsx
│   ├── services/            # Firebase and app services
│   │   ├── firebaseService.js # Firebase configurations and utilities
│   │   ├── authService.js   # Authentication logic
│   │   ├── dataService.js   # Data management logic
│   ├── styles/              # CSS files for components
│   │   ├── admin.css        
│   │   ├── dashboard.css     
│   │   ├── index.css         
│   │   ├── login.css         
│   │   ├── signup.css       
│   │   ├── student.css       
│   │   ├── studentDetails.css     
│   │   ├── index.css         
│   │   ├── test.css         
│   │   ├── timer.css       
|   ├── utils
|   |   ├── RandomQuestions.js 
|   |   ├── timer.js
│   ├── App.jsx              # Main App component
│   ├── index.js             # Entry point for React
├──.gitignore
├── package.json             # Project metadata and dependencies
├── package-lock.json        # Lockfile for dependencies
├── .gitignore               # Ignored files and folders for Git
└── README.md                # Project documentation
```

## Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd WEProject
   ```
3. Install dependencies:
   ```
   npm install
   ```

## Usage
To start the application, run:
```
npm start
```
This will launch the application in your default web browser.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.
