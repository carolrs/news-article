import React, {useState, useEffect} from "react";

const App = ()=> {
  const [articles, setArticles] = useState([])
  const [term, seTerm] = useState('everything') 
  const [isLoading, setIsLoading] = useState(true) //display loading animation
  
  useEffect(()=>{
    const fetchArticles = async ()=>{
    try{
        const res = await fetch(
          `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${term}&api-key=${process.env.REACT_APP_NYT_API_KEY}`
          )
          const articles = await res.json()
          setArticles(articles.response.docs) 
      } catch(error){
      console.log(error)
    }
  }
    fetchArticles()
  }, [])
  return (
    <>
    <div className="showcase">
      <div className="overlay">
        <h1>Viewing articles about {term} </h1>

      </div>

      </div>
    <section>
      {articles.map((article)=>{
        const{abstract, headline,byline:{original} , lead_paragraph, news_desk,
      section_name, web_url, _id, word_count} = article

      return (
        <article key={_id}>
          <h2>{headline.main}</h2>
          <h4>{abstract}</h4>
          <a href= {web_url} target="_blank">Read More</a>
          <p>{lead_paragraph}</p>

          <ul>
            <li>{original}</li>
            <li>{news_desk}</li>
            <li>{section_name}</li>
            <li>{word_count}</li>
          </ul>


          </article>

      )
      })}


    </section>
    
    </>
  );
}

export default App;
