import React, { useState } from 'react';

const ArticleRating = () => {
  const [rating, setRating] = useState(0);

  const setRate = (rate) => {
    setRating(rate);
  }

  return (
    <div className="rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} onClick={() => setRate(star)}>
          {star <= rating ? '★' : '☆'}
        </span>
      ))}
    </div>
  );
}

export default ArticleRating;
