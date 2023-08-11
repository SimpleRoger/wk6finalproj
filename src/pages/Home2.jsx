import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import urname from "../assets/urname.jpeg";

import axios from "axios";
let data1;
const Home = () => {
  //user use state
  // let data = []
  const [loading, setLoading] = useState([]);
  const [searchNew, setSearch] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const { search } = useParams();

  let navigate = useNavigate();

  //user use effect
  useEffect(() => {
    fetchPosts();
  }, []);
  //async functino that calls dynamically

  const handleSubmit = (event) => {
    if (event !== undefined) {
      event.preventDefault(); // Prevents the form from submitting and refreshing the page
      fetchPosts(inputValue); // Call your function with the input value
    }
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  //https://jsonplaceholder.typicode.com/users
  async function fetchPosts(event) {
    console.log(event);
    // console.log(search);
    setLoading(true);
    const { data } = await axios.get(
      `http://www.omdbapi.com/?apikey=18b5ee41&s=${event || search}`
    );
    //set data from useState hook
    // setSe(data);
    data1 = data.Search;
    data1.sort((a, b) => b.Year - a.Year);
    setSearch(data1);
    setLoading(false);
  }
  const [selectedValue, setSelectedValue] = useState("option2"); // Set the default selected value

  function filterMovies(event) {
    setSelectedValue(event.target.value);
    if (event.target.value === "OLD_TO_NEW") {
      console.log(data1);
      data1.sort((a, b) => a.Year - b.Year);
      console.log("HI");
    } else if (event.target.value == "NEW_TO_OLD") {
      data1.sort((a, b) => b.Year - a.Year);
      console.log("wow");
    }
    // console.log("HI")
  }

  //map over users and show 10 cards

  return (
    <>
      <img src={urname} alt="myImage" class="header__img" />
      <div className="container">
        <div className="nav__wrapper">
          <h1>Explore your movies</h1>
          <ul>
            <li onClick={() => navigate(`/`)}>Home</li>
            <li>Browse</li>
            <li>Contact</li>
          </ul>
        </div>
        <form
          action=""
          id="loginForm"
          class="form__wrapper"
          onSubmit={handleSubmit}
        >
          <div class="form__top--wrapper">
            <h2>Search for your favourite movie</h2>
            <select
              class="form--select"
              name=""
              id="filter"
              value={selectedValue}
              onChange={filterMovies}
            >
              <option value="" disabled selected>
                Sort
              </option>
              <option value="NEW_TO_OLD">Date, New to Old</option>
              <option value="OLD_TO_NEW">Date, Old to New</option>
            </select>
          </div>
          <input
            type="text"
            id="username"
            class="form-control"
            placeholder="Your Favourite Movies..."
            onChange={handleInputChange}
          />
          <button class="submit--button" type="submit">
            Search
          </button>
        </form>
        <div className="row">
          <div className="user-list">
            {loading
              ? new Array(8).fill(0).map((_, index) => (
                  <div className="movie" key={index}>
                    <div className="movie__img--wrapper">
                      <div className="movie__img--wrapper-skeleton">
                        <div className="movie__img movie__img--skeleton"></div>
                      </div>
                    </div>
                    <div className="movie__title">
                      <div className="movie__title--skeleton"></div>
                    </div>
                    <div className="movie__year">
                      <div className="movie__year--skeleton"></div>
                    </div>
                  </div>
                ))
              : searchNew.map((user) => (
                  <div
                    onClick={() => navigate(`/${user.imdbID}`)}
                  >
                    <div className="user-card__container">
                      <h3 class="user__title">{user.Title}</h3>
                      <p>
                        <b>Year: </b> {user.Year}
                      </p>
                      <img src={user.Poster} alt="" className="card--img" />
                      <p></p>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
