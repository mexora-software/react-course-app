# React Course App

Interactive React learning platform built with React + Vite.

## Features

- React fundamentals
- Components and Props
- State management
- Hooks examples
- Interactive lessons
- Multi-language support (English / Spanish)
- Modern UI
- Responsive design

## Tech Stack

- React
- Vite
- JavaScript
- CSS
- react-i18next

## Installation

Clone the repository:

bash git clone https://github.com/mexora-software/react-course-app.git 

Go to the project folder:

bash cd react-course-app 

Install dependencies:

bash npm install 

Start development server:

bash npm run dev 

## Multi-language Setup

Install i18n dependencies:

bash npm install react-i18next i18next 

Project structure:

txt src/ ├─ i18n/ │  ├─ index.js │  ├─ locales/ │  │  ├─ en/ │  │  │  └─ common.json │  │  └─ es/ │  │     └─ common.json 

Example translation file:

json {   "welcome": "Welcome to the React course" } 

Usage:

jsx const { t } = useTranslation();  <h1>{t("welcome")}</h1> 

## Future Improvements

- Quizzes
- Authentication
- Progress tracking
- Dark mode
- Code playground
- AI assistant integration

## Author

Developed by Alejandro Avalos through Mexora Software.