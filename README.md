# NY Times Search App

![Class System Design Drawing](docs/news.gif?raw=true "News")

# Overview
This project is a search application that utilizes the New York Times and OpenWeatherMap API to fetch and display articles and information about the Weather. The original version of this project was created by following the tutorial "ReactJs News App using the New York Times Articles API" on YouTube(https://www.youtube.com/watch?v=m2aYEl14ekY). However, I have added new features and personalized the all CSS to make it my own.

# New Features Included by me:

* A navigation bar with "About" and "Contact" sections.
* A dark mode feature.
* Share functionality using the Web Share API
* Pagination system to navigate through articles.
* Read Later function to save articles for future reading.
* A list to display all the articles saved for reading later.
* Subscribe button that redirects to the New York Times subscription page.
* Weather information feature, using the OpenWeatherMap API.
* Dynamic background

The application is built with React and makes use of hooks such as useState and useEffect to manage state and side effects.

# Original Features 

* Search for articles.
* Display article information 
* Links to the full articles.

# Pre-requisites
* Node.js installed on your machine.
* An API key from the New York Times API.
* An API key from the OpenWeatherMap API.

# Installation
* Clone this repository by running `git clone <https://github.com/carolrs/news-article>` in your terminal.

* Install the necessary dependencies with `npm install` or `yarn install`.

* Create a .env file in the root of your project.

* Inside this file, you should set your New York Times API Key and your OpenWeatherMap API key like this:

```
REACT_APP_NYT_API_KEY=your_nyt_api_key_here
REACT_APP_OWM_API_KEY=your_owm_api_key_here
```

* Run the project locally with `npm start` or `yarn start`.

Your app should now be running on `localhost:3000`.

# Usage

Simply type your search term in the search bar and press 'Search'. The results will be fetched from the New York Times API and displayed on the page. You can click 'Read More' to go to the full article.

# Acknowledgements

This project was initially created by following the tutorial "ReactJs News App using the New York Times Articles API" on YouTube(https://www.youtube.com/watch?v=m2aYEl14ekY). I have extended the project by adding new features and customizing the app.

