import React from 'react';
import {useHistory} from 'react-router-dom'

const MovieCard = props => {
  const {push}=useHistory();
  const { id, title, director, metascore, stars } = props.movie;
  return (
    <div className="movie-card">
      <h2>{title}</h2>
      <div className="movie-director">
        Director: <em>{director}</em>
      </div>
      <div className="movie-metascore">
        Metascore: <strong>{metascore}</strong>
      </div>
      <h3>Actors</h3>

      {stars.map(star => (
        <div key={star} className="movie-star">
          {star}
        </div>
      
      ))}
      <hr></hr>
       <button className="md-button bg-secondary m-2 p-2"
        onClick={() => props.push(`/update-movie/${id}`)}>
        Update</button>
    </div>
  );
};

export default MovieCard;
