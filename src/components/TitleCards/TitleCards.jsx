import { useEffect, useRef, useState } from 'react';
import './TitleCards.css';
import cards_data from '../../assets/cards/Cards_data';
import {Link} from 'react-router-dom'
// eslint-disable-next-line react/prop-types
  const TitleCards = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYTI1OWVmOGQyNzY4ZWRjZDFiMjZlM2EyNzljOTBiMiIsIm5iZiI6MTczMDgxNjY5NC43NzYyOTI2LCJzdWIiOiI2NzJhMjUzY2NjMWQxMjgyN2QwYzVhOTAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.t8vKm77-UZBB9m8GT3E4gxh8bLu-8zu1mxEivzZoT2k'
    }
  };

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaX;
  };

  useEffect(() => {
    if (category === "none") {
      // Use local data when category is "none"
      setApiData(cards_data);
    } else {
      // Fetch data from API for other categories
      fetch(`https://api.themoviedb.org/3/movie/${category || "now_playing"}?language=en-US&page=1`, options)
        .then(res => res.json())
        .then(res => setApiData(res.results))
        .catch(err => console.error(err));
    }

    const currentCardsRef = cardsRef.current;
    currentCardsRef.addEventListener('wheel', handleWheel);
    return () => currentCardsRef.removeEventListener('wheel', handleWheel);
  }, [category, options]); // Add `category` as a dependency

  return (
    <div className="title-cards">
      <h2>{title || "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => {
          return <Link to={`/player/${card.id}`} className="card" key={index}>
            <img 
              src={category === "none" ? card.image : `https://image.tmdb.org/t/p/w500${card.backdrop_path}`} 
              alt={card.name || card.original_title} 
            />
            <p>{card.name || card.original_title}</p>
          </Link>
})}
      </div>
    </div>
  );
};

export default TitleCards;
