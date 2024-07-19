import React, { useEffect, useState } from "react";

const MovieCard = ({ movie}) => {

    const authors = movie.author_name ? movie.author_name.slice(0, 4) : [];

  return (
    <div className="card bg-base-100 w-[280px] shadow-xl">
      <figure className="px-7 pt-8">
        <img
          src={movie.dogImage}
          alt={movie.title}
          className="rounded-xl w-96 h-64 hover:scale-105 transition-all duration-300"
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{movie.title}</h2>
        <p>{authors.join(', ')}</p>
        <p>{movie.first_publish_year}</p>
      </div>
    </div>
  );
};

export default MovieCard;