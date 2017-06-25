
import React from 'react';
import _ from 'lodash';
import OrderableList from './OrderableList';
import MovieItem from './MovieItem';

class MovieItemList extends React.Component {

  constructor(props) {
    super(props);
    this.state = { movies: [] };
  }

  movieRankUpdate (reRankedMovie) {
    console.log(reRankedMovie);
  }

  mapMovieToDraggableMovieElement (movie) {
    return {
      id: movie.id,
      element: {
        children: [
          <MovieItem key={`movie-${movie.id}__container`} movie={movie}/>,
          <span className="movie-item__handle" key={`movie-${movie.id}__icon`}>{" <O>"}</span>
        ],
        parentWrapperTag: 'div',
        handleElementIndex: 1
      }
    };
  };

  componentDidMount () {

    const movies = [
      {
        id: 1,
        title: 'Step Brothers',
        year: '2008',
        genre: 'Comedy'
      },
      {
        id: 2,
        title: 'Elf',
        year: '2003',
        genre: 'Holiday'
      },
      {
        id: 3,
        title: 'Old School',
        year: '2003',
        genre: 'Comedy'
      },
      {
        id: 4,
        title: 'Anchorman: The Legend of Ron Burgundy',
        year: '2004',
        genre: 'Comedy'
      },
      {
        id: 5,
        title: 'Stranger than Fiction',
        year: '2006',
        genre: 'Romantic Comedy'
      }
    ];

    this.setState({ movies: _.map(movies, this.mapMovieToDraggableMovieElement) });

  };

  render () {
    return <OrderableList items={this.state.movies} dropHandler={this.movieRankUpdate} containingTag="div"/>;
  }

}

export default MovieItemList;
