# NY Times Search App

# Overview

This project is a simple search application utilizing the New York Times API to fetch and display articles. Users can search for articles using keywords.

The application is built with React and relies heavily on hooks (useState and useEffect) to manage state and side effects.

This project was created while following along with the YouTube tutorial "ReactJs News App using the New York Times Articles API".

# Features

Search for articles
Display article information (headline, abstract, lead paragraph, author, news desk, section name, word count)
Links to the full articles
Setup

# Pre-requisites
Node.js installed on your machine
An API key from the New York Times API

# Installation
1- Clone this repository by running git clone <https://github.com/carolrs/news-article> in your terminal.
2- Install the necessary dependencies with npm install or yarn install.
3- Create a .env file in the root of your project.
4- Inside this file, you should set your New York Times API Key like this:

```
REACT_APP_NYT_API_KEY=your_api_key_here

```
5- Run the project locally with npm start or yarn start.

Your app should now be running on `localhost:3000`.

# Usage

Simply type your search term in the search bar and press 'Search'. The results will be fetched from the New York Times API and displayed on the page. You can click 'Read More' to go to the full article.

# Acknowledgements

This project was created following the ReactJs News App using the New York Times Articles API tutorial on YouTube(https://www.youtube.com/watch?v=m2aYEl14ekY).
