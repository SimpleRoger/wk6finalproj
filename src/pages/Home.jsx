import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import urname from "../assets/urname.jpeg";
import axios from "axios";

const Home = () => {
  //user use state
  const [search, setSearch] = useState([]);
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
      `http://www.omdbapi.com/?apikey=18b5ee41&s=${event}`
    );
    //set data from useState hook
    // setSe(data);
    setSearch(data.Search);
    console.log(data.Search);
    // setLoading(false);
  }

  //map over users and show 10 cards

  return (
    <>
      <img src={urname} alt="myImage" class="header__img" />
      <div className="container">
        <div class="container">
          <div class="nav__wrapper">
            <h1>Roger's Movie Collection</h1>
            <ul>
              <li>Home</li>
              <li>Browse</li>
              <li>Contact</li>
            </ul>
          </div>
        </div>
        <form
          action=""
          id="loginForm"
          class="form__wrapper"
          onSubmit={(e) => navigate(`search/${search}`)}
        >
          <div class="form__top--wrapper">
            <h1>Search for your favourite movie</h1>
           
          </div>
          <input
            type="text"
            id="username"
            class="form-control"
            placeholder="Your Favourite Movies..."
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            class="submit--button"
            type="submit"
            // onSubmit={(e) => navigate(`/${e.target.value}`)}
          >
            Search
          </button>
        </form>
        <div className="row">
          <div className="user-list"></div>
        </div>
      </div>
    </>
  );
};

export default Home;
