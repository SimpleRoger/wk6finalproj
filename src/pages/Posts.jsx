import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";

import axios from "axios";

const Posts = () => {
  let navigate = useNavigate();
  const { id } = useParams();
  //   declaring a variable so we can use it
  const [movie, setPosts] = useState([]);
  const [loading, setLoading] = useState([]);
  const [searchId, setSearchId] = useState(id);

  async function fetchPosts(userId) {
    setLoading(true);
    const { data } = await axios.get(
      `http://www.omdbapi.com/?apikey=18b5ee41&i=${id}`
    );
    setPosts(data);
    console.log(data);
    setLoading(false);
  }
  useEffect(() => {
    fetchPosts();
  }, []);

  function onSearch() {
    fetchPosts(searchId);
  }

  return (
    <>
      <div className="post__search">
        <BackButton></BackButton>
        <h2>Back to search</h2>
      </div>
      {
      loading
        ? 
            <div className="post" key={index}>
              <div className="post__title">
                <div className="post__title--skeleton"></div>
              </div>
              <div className="post__body">
                <p className="post__body--skeleton"></p>
              </div>
            </div>
          
          : 
      <div className="container">
        <div className="post" movie={movie.id}>
          <div class="header__image--wrapper">
            <img src={movie.Poster} alt="" class="header__image" />
          </div>
          <div class="movie__info--wrapper">
            <h1 className="post__title">{movie.Title}</h1>
            {/* <p className="post__body">{movie.Plot}</p> */}
            <h3>Year aired: {movie.Year}</h3>
            <h3>Genre: {movie.Genre}</h3>
            <h3>Rated: {movie.Rated}</h3>
            <h3>Type: {movie.Type}</h3>
            <h3>Runtime: {movie.Runtime}</h3>
            <h3>Director: {movie.Director}</h3>
            <h3>Actors: {movie.Actors}</h3>
            <h3>Plot Summary: <p>{movie.Plot}</p></h3>
          </div>
        </div>
      </div>
}
  </>
  )

export default Posts;
