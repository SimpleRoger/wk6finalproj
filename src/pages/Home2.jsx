import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import axios from "axios";

const Home = () => {
  //user use state
  const [searchNew, setSearch] = useState([]);
  const { search } = useParams();

  let navigate = useNavigate();

  //user use effect
  useEffect(() => {
    fetchPosts();
  }, []);
  //async functino that calls dynamically

  //https://jsonplaceholder.typicode.com/users
  async function fetchPosts(event) {
    console.log(search);
    // setLoading(true);
    const { data } = await axios.get(
      `http://www.omdbapi.com/?apikey=18b5ee41&s=${event || search}`
    );
    //set data from useState hook
    // setSe(data);
    setSearch(data.Search);
    console.log(data.Search);
    // setLoading(false);
  }

  //map over users and show 10 cards

  return (
    <div className="container">
      <form
        action=""
        id="loginForm"
        class="form__wrapper"
        onSubmit={fetchPosts}
      >
        <div class="form__top--wrapper">
          <h2>Search for your favourite movie</h2>
          <select
            class="form--select"
            name=""
            id="filter"
            // onchange="filterMovies(event)"
          >
            <option value="" disabled selected>
              Sort
            </option>
            <option value="OLD_TO_NEW">Date, Old to New</option>
            <option value="NEW_TO_OLD">Date, New to Old</option>
          </select>
        </div>
        <input
          type="text"
          id="username"
          class="form-control"
          placeholder="Your Favourite Movies..."
          onChange={(e) => fetchPosts(e.target.value)}
        />
        <button class="submit--button" type="submit">
          Search
        </button>
      </form>
      <div className="row">
        <div className="user-list">
          {searchNew != undefined &&
            searchNew.map((user) => (
              <div className="user" onClick={() => navigate(`/${user.imdbID}`)}>
                <div className="user-card">
                  <div className="user-card__container">
                    <h3>{user.Title}</h3>
                    <p>
                      <b>Year: </b> {user.Year}
                    </p>
                    <p>
                      <b>Type:</b> {user.Type}
                    </p>
                    <img src={user.Poster} alt="" className = "card--img"/>
                    <p>


                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
