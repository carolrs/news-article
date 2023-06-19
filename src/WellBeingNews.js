import React, { useState, useEffect } from "react";

const WellbeingArticles = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch(
          `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=well-being&page=${page}&api-key=${process.env.REACT_APP_NYT_API_KEY}`
        );
        const articlesData = await res.json();
        setArticles(articlesData.response.docs.slice(0, 3));
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchArticles();
  }, [page]);

  return (
    <div>
      <h2 className="text-center text-2xl font-bold mb-4">Well Being</h2>
      <div className="grid grid-cols-3 gap-4 mb-4">
        {isLoading ? (
          <h1 className="text-center mt-20 font-bold text-5xl">Loading...</h1>
        ) : (
          articles.map((article) => {
            const {
              headline: { main },
              snippet,
              multimedia,
              _id,
              web_url,
            } = article;

            const image = multimedia.find(
              (media) => media.subtype === "xlarge"
            );
            const imageUrl = image
              ? `https://www.nytimes.com/${image.url}`
              : "url-alternativa-aqui";

            return (
              <div key={_id} className="bg-white p-4 rounded-md">
                <img 
                  src={imageUrl}
                  alt={main}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://images.pexels.com/photos/4439452/pexels-photo-4439452.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
                  }}
                />
                <h3 className="font-bold text-lg mb-2">{main}</h3>
                <p>{snippet}</p>
                <a href={web_url} target="_blank" rel="noreferrer" className="text-blue-500">Read more</a>
              </div>
            )
          })
        )}
      </div>
      
      <div className="text-center">
      <div className="flex justify-center space-x-5">
  <button 
    onClick={() => page > 0 ? setPage(page - 1) : page}
    className="bg-blue-500 text-white p-2 rounded-md"
  >
    &lt; 
  </button>
  <button 
    onClick={() => setPage(page + 1)}
    className="bg-blue-500 text-white p-2 rounded-md"
  >
    &gt;
  </button>
</div>
      </div>
    </div>
  );
};

export default WellbeingArticles;
