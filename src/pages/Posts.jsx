import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import BackButton from '../components/BackButton';

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
      </div>
      {/* {loading
        ?
            <div className="post" key={index}>
              <div className="post__title">
                <div className="post__title--skeleton"></div>
              </div>
              <div className="post__body">
                <p className="post__body--skeleton"></p>
              </div>
            </div>
          )) */}
      (
      <div className="post" movie={movie.id}>
        <div className="post__title">{movie.Title}</div>
        {/* <p className="post__body">{movie.Plot}</p> */}
        <img src={movie.Poster} alt="" />
        <p>Year aired: {movie.Year}</p>
        <p>Genre: {movie.Genre}</p>
        <p>Rated: {movie.Rated}</p>
        <p>Type: {movie.Type}</p>
        <p>Runtime: {movie.Runtime}</p>
        <p>Director: {movie.Director}</p>
        <p>Actors: {movie.Actors}</p>
        <p>Plot Summary: {movie.Plot}</p>
      </div>
      ){/* } */}
    </>
  );
};

export default Posts;
