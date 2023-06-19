import React, { useState, useEffect } from "react";
import SearchForm from "./SearchForm";
import AboutModal from "./AboutModal";
import ContactsModal from "./ContactModal";
import Weather from "./Weather";
import SubscriptionForm from "./SubscriptionForm";

const App = () => {
  const [articles, setArticles] = useState([]);
  const [term, setTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isContactsOpen, setIsContactsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [page, setPage] = useState(0);
  const [readLaterArticles, setReadLaterArticles] = useState([]);
  const [isReadLaterOpen, setIsReadLaterOpen] = useState(false);
  const [isWeatherPopupOpen, setIsWeatherPopupOpen] = useState(false);
  const [isSubscriptionOpen, setIsSubscriptionOpen] = useState(false);

  const [backgroundImage, setBackgroundImage] = useState(
    "https://images.pexels.com/photos/6802042/pexels-photo-6802042.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  );

  const backgrounds = [
    "https://images.pexels.com/photos/6802042/pexels-photo-6802042.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/6802043/pexels-photo-6802043.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/7788006/pexels-photo-7788006.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  ];

  useEffect(() => {
    let i = 0;
    const changeBackground = () => {
      setBackgroundImage(backgrounds[i % backgrounds.length]);
      i++;
    };
    const intervalId = setInterval(changeBackground, 5000); // 5000 milissegundos = 5 segundos
    return () => clearInterval(intervalId); // Limpar o intervalo quando o componente for desmontado
  }, []);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch(
          `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${term}&page=${page}&api-key=${process.env.REACT_APP_NYT_API_KEY}`
        );
        const articles = await res.json();
        setArticles(articles.response.docs);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchArticles();
  }, [term, page]);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
      document.querySelectorAll("article").forEach((article) => {
        article.classList.add("bg-black");
        article.classList.remove("bg-white");
        article.classList.add("dark-mode-article");
        article.querySelector("h2").classList.add("color-white");
      });
    } else {
      document.body.classList.remove("dark-mode");
      document.querySelectorAll("article").forEach((article) => {
        article.classList.remove("bg-black");
        article.classList.add("bg-white");
        article.classList.remove("dark-mode-article");
        article.querySelector("h2").classList.remove("color-white");
      });
    }
  }, [isDarkMode]);

  const shareArticle = (url) => {
    // Use the Web Share API to share the article URL
    if (navigator.share) {
      navigator.share({ url });
    } else {
      // Fallback for browsers that don't support the Web Share API
      window.open(url, "_blank");
    }
  };
  const addToReadLater = (article) => {
    if (
      !readLaterArticles.some(
        (readLaterArticle) => readLaterArticle._id === article._id
      )
    ) {
      const newArticles = [...readLaterArticles, article];
      setReadLaterArticles(newArticles);
    }
  };

  return (
    <div>
      <header className="py-5 px-10 bg-white flex justify-between items-center">
        <h1>NY Times Search</h1>
        <nav>
          <ul className="flex space-x-10">
            <li className="about" onClick={() => setIsAboutOpen(true)}>
              About
            </li>
            <li className="contact" onClick={() => setIsContactsOpen(true)}>
              Contact
            </li>
            <li
              className="subscribe"
              onClick={() => setIsSubscriptionOpen(true)}
            >
              Subscribe
            </li>
            {isSubscriptionOpen && (
              <div className="modal">
                <SubscriptionForm
                  onClose={() => setIsSubscriptionOpen(false)}
                />
              </div>
            )}
            <li className="mode" onClick={() => setIsDarkMode(!isDarkMode)}>
              {isDarkMode ? "Light Mode" : "Dark Mode"}
            </li>
            <li
              className="weather"
              style={{ cursor: "pointer" }}
              onClick={() => setIsWeatherPopupOpen(true)}
            >
              Weather
            </li>
          </ul>
        </nav>
      </header>
      {isAboutOpen && <AboutModal onClose={() => setIsAboutOpen(false)} />}
      {isContactsOpen && (
        <ContactsModal onClose={() => setIsContactsOpen(false)} />
      )}
      {isWeatherPopupOpen && (
        <div className="popup active">
          <Weather onClose={() => setIsWeatherPopupOpen(false)} />
        </div>
      )}

      <div
        className="showcase"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="overlay px-5">
          <h1 className="text-4xl font-bold text-white text-center mb-4 capitalize lg:text-7xl">
            Discover Your Next Reading
          </h1>
          <h1 className="text-2xl font-bold text-white text-center mb-4 capitalize lg:text-4xl">
            Today news: {term}
          </h1>
          <SearchForm searchText={(text) => setTerm(text)} />
        </div>
      </div>
      <section className="pagination-container">
        <button
          onClick={() => setPage(page > 0 ? page - 1 : page)}
          disabled={page === 0}
        >
          Previous Page
        </button>
        <button onClick={() => setPage(page + 1)}>Next Page</button>
      </section>

      {isLoading ? (
        <h1 className="text-center mt-20 font-bold text-5xl">Loading...</h1>
      ) : (
        <section className="grid grid-cols-1 gap-10 px-5 pt-10 pb-20">
          {articles.map((article) => {
            const {
              abstract,
              headline: { main },
              byline: { original },
              lead_paragraph,
              news_desk,
              section_name,
              web_url,
              _id,
              word_count,
              multimedia,
            } = article;

            const image = multimedia.find(
              (media) => media.subtype === "xlarge"
            );
            const imageUrl = image
              ? `https://www.nytimes.com/${image.url}`
              : "url-alternativa-aqui";

            return (
              <article
                key={_id}
                className="bg-white py-10 px-5 rounded-lg lg:w-9/12 lg:mx-auto"
              >
                <div className="image-article">
                <img 
                  src={imageUrl}
                  alt={main}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://images.pexels.com/photos/935979/pexels-photo-935979.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
                  }}
                />
                </div>

                <h2 className="font-bold text-3xl mb-5 lg:text-4xl">{main}</h2>
                <p>{abstract}</p>
                <p>{lead_paragraph}</p>

                <ul className="my-4">
                  <li>{original}</li>
                  <li>
                    <span className="font-bold">News Desk:</span> {news_desk}
                  </li>
                  <li>
                    <span className="font-bold">Section Name:</span>{" "}
                    {section_name}
                  </li>
                  <li>
                    <span className="font-bold">Word Count:</span> {word_count}
                  </li>
                </ul>
                <div className="action-buttons">
                  <a
                    href={web_url}
                    target="_blank"
                    rel="noreferrer"
                    className="underline"
                  >
                    Read More
                  </a>
                  <a href={`mailto:?body=${web_url}`} className="share-button">
                    <i className="fas fa-share"></i> Share
                  </a>
                  <a
                    className="read-later"
                    onClick={() => addToReadLater(article)}
                  >
                    Read later
                  </a>
                </div>
              </article>
            );
          })}
          <button onClick={() => setIsReadLaterOpen(!isReadLaterOpen)}>
            Articles saved
          </button>
          {isReadLaterOpen && (
            <div className="popup-read-later">
              {readLaterArticles.map((article) => {
                return (
                  <div key={article._id}>
                    <h3>{article.headline.main}</h3>
                    <p>{article.abstract}</p>
                    <a
                      href={article.web_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Read this article
                    </a>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      )}
    </div>
  );
};

export default App;
