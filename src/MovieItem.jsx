import React from 'react';
import PropTypes from 'prop-types';

const MovieItem = props => (
  <div key={`movie-item__${props.id}`} style={{ display: 'inline-block' }}>
    <span key={`movie-item__${props.id}-title`}>{props.movie.title} </span>
    <span key={`movie-item__${props.id}-genre`}>{props.movie.genre} </span>
    <span key={`movie-item__${props.id}-year`}>{props.movie.year} </span>
  </div>
);

MovieItem.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired
  })
};

export default MovieItem;