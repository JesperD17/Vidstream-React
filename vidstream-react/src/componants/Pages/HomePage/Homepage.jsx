import useSWR from 'swr';
import Skeleton from '../../skeleton/skeleton';

import { useState, useEffect } from 'react';

import "./slideshow.css";

// created function to handle API request
const fetcher = (...args) => fetch(...args).then((res) => res.json());
// using Swr for fetching api
function Homepage() {
  const {
    data: allMovies,
    error,
    isValidating,
  } = useSWR('https://vidstream-api.vercel.app/home', fetcher, { // settings to stop swr from reloading.
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  });

  console.log(allMovies);

  // Handles error and loading/Skeleton.
  if (error) return console.log("FAILED OR INCOMPLETE API!");
  if (isValidating | !allMovies) { // || allMovies.latestMovies.length === 0 || allMovies.latestTvSeries.length === 0 || allMovies.trending.movies.length === 0 || allMovies.trending.tvSeries.length === 0
    return <Skeleton />;
  }

  // repeating amount of banners for the div structure from the api.
  const spotlightLength = allMovies.spotlight.length;
  const repeatSpotlightBannerDivs = new Array(spotlightLength).fill(null);

  // if a string has "?", function changes it to empty string.
  var ratingsSpotlight = []; // making an object for updated strings.
  for (var i = 0; i < allMovies.spotlight.length; i++) {
    var spotlightRating = allMovies.spotlight[i].rating;

    // spotlightRating[i].classList.add("active_style_slide");

    if (spotlightRating == "?") {
      spotlightRating = ""; // empties string
    } // sends the new strings to the object
    ratingsSpotlight.push(spotlightRating);
  }

  // const fullTimer = () => {
  //   const slideTimer = (left = false) => {
  //     // shows next image
        
  //       let i;
  //       let slides = document.getElementsByClassName("slide-Card"); // Grabs every slide
  
  //       for (i = 0; i < slides.length; i++) {
  //         // slides[i].style.display = "none";
  //         slides[i].classList.remove("active_style_slide");
  //       }
  //     if (left) {
  //       slideIndex--;
        
  //       if (slideIndex < 1) {
  //         slideIndex = slides.length;
  //       }
  //     } 
  //     else {
  //       slideIndex++;
        
  //       if (slideIndex > slides.length) {
  //         slideIndex = 1;
  //       }
  //     }
  //       slides[slideIndex - 1].classList.add("active_style_slide");
  
  //       slideTime = setTimeout(slideTimer, 3000); // changing seconds
  //   }
  //   // restart timer
  //   clearTimeout(slideTime);
  //   slideTimer();
  // }

  function toLeftItem() {
    console.log("left");
    // clearTimeout(slideTime);

    // slide(true);
  }

  function toRightItem() {
    console.log("right");
    // clearTimeout(slideTime);

    // slide();
  }

  // repeating amount of cards for the div structure from the api.
  const trendingMoviesLength = allMovies.trending.movies.length;
  const repeatTrendingMoviesCardDivs = new Array(trendingMoviesLength).fill(null);
  const trendingSeriesLength = allMovies.trending.tvSeries.length;
  const repeatTrendingSeriesCardDivs = new Array(trendingSeriesLength).fill(null);
  const moviesLength = allMovies.latestMovies.length;
  const repeatMovieCardDivs = new Array(moviesLength).fill(null);
  const seriesLength = allMovies.latestTvSeries.length;
  const repeatSerieCardDivs = new Array(seriesLength).fill(null);


  var ratingsTrendingMovies = [];
  for (var i = 0; i < allMovies.trending.movies.length; i++) {
    var movieRating = allMovies.trending.movies[i].stats.rating;
    if (movieRating == "?") {
      movieRating = "";
    }
    ratingsTrendingMovies.push(movieRating);
  }

  var ratingsTrendingSeries = [];
  var seasonsTrendingSeries = [];
  for (var i = 0; i < allMovies.trending.tvSeries.length; i++) {
    var serieRating = allMovies.trending.tvSeries[i].stats.rating;
    var serieSeasons = allMovies.trending.tvSeries[i].stats.seasons;

    if (serieRating == "?") {
      serieRating = "";
    }
    if (serieSeasons.includes("SS", "/ EPS")) {
      serieSeasons = serieSeasons.replace("SS ", "S",).replace("EPS ", "EP");
    }
    ratingsTrendingSeries.push(serieRating);
    seasonsTrendingSeries.push(serieSeasons);
  }


  var ratingsLatestMovies = [];
  for (var i = 0; i < allMovies.latestMovies.length; i++) {
    var movieRating = allMovies.latestMovies[i].stats.rating;
    if (movieRating == "?") {
      movieRating = "";
    }
    ratingsLatestMovies.push(movieRating);
  }


  var ratingsLatestTvSeries = [];
  var seasonsLatestTvSeries = [];
  for (var i = 0; i < allMovies.latestTvSeries.length; i++) {
    var serieRating = allMovies.latestTvSeries[i].stats.rating;
    serieSeasons = allMovies.latestTvSeries[i].stats.seasons;

    if (serieRating == "?") {
      serieRating = "";
    }

    if (serieSeasons.includes("SS", "/ EPS")) {
      serieSeasons = serieSeasons.replace("SS ", "S",).replace("EPS ", "EP");
    }
    ratingsLatestTvSeries.push(serieRating);
    seasonsLatestTvSeries.push(serieSeasons);
  }



  return (
    <>
      <div id="allSlideshows">
        {repeatSpotlightBannerDivs.map((_, number) => (
          <div key={number} className={"slideshow_wraper " + [number]}>
            <div className="slide_banner_wrapper">
              <img src={allMovies.spotlight[number].banner} draggable="false" />
              <div className="color_to_banner1">
                <div className="slide_info_inner">
                  <div className="titel">{allMovies.spotlight[number].title}</div>
                  <div className="review">{ratingsSpotlight[number]} <i className='bx bxs-star'></i></div>
                  <div className="year">{allMovies.spotlight[number].year}</div>
                </div>
              </div>
              <div className="color_to_banner2"></div>
            </div>

          </div>
        ))}
        <div id="buttons">
          <div className="slide_to_left">
            <button onClick={toLeftItem}><i className='bx bxs-left-arrow-alt'></i></button>
          </div>
          <div className="slide_to_right">
            <button onClick={toRightItem}><i className='bx bxs-right-arrow-alt' ></i></button>
          </div>
        </div>
      </div>


      <div className="Titles_wrapper">
        <div className="MainTitles">Most trending movies & series.</div>
        <div className="See_all_Links">See all. <i className='bx bx-right-arrow-alt'></i></div>
      </div>

      <div className='allCards'>
        {repeatTrendingMoviesCardDivs.map((_, number) => (

          <div className="card"
            key={number}>
            <div className="banner">
              <img src={allMovies.trending.movies[number].poster} draggable="false" />
            </div>
            <div className="card_info">
              <div className="titel">{allMovies.trending.movies[number].title} </div>
              <div className="card_info_inner">
                <div className="review">{ratingsTrendingMovies[number]} <i className='bx bxs-star'></i></div>
                <div className="duration">{allMovies.trending.movies[number].stats.duration}</div>
                <div className="year">{allMovies.trending.movies[number].stats.year}</div>
              </div>
            </div>
          </div>

        ))}
      </div>

      <div className='allCards'>
        {repeatTrendingSeriesCardDivs.map((_, number) => (

          <div className="card"
            key={number}>
            <div className="banner">
              <img src={allMovies.trending.tvSeries[number].poster} draggable="false" />
            </div>
            <div className="card_info">
              <div className="titel">{allMovies.trending.tvSeries[number].title} </div>
              <div className="card_info_inner">
                <div className="review">{ratingsTrendingSeries[number]} <i className='bx bxs-star'></i></div>
                <div className="year">{seasonsTrendingSeries[number]}</div>
              </div>
            </div>
          </div>
        ))}
      </div>


      <div className="Titles_wrapper">
        <div className="MainTitles">Newest movies.</div>
        <div className="See_all_Links">See all. <i className='bx bx-right-arrow-alt'></i></div>
      </div>

      <div className='allCards'>
        {repeatMovieCardDivs.map((_, number) => (

          <div className="card"
            key={number}>
            <div className="banner">
              <img src={allMovies.latestMovies[number].poster} draggable="false" />
            </div>
            <div className="card_info">
              <div className="titel">{allMovies.latestMovies[number].title} </div>
              <div className="card_info_inner">
                <div className="review">{ratingsLatestMovies[number]} <i className='bx bxs-star'></i></div>
                <div className="duration">{allMovies.latestMovies[number].stats.duration}</div>
                <div className="year">{allMovies.latestMovies[number].stats.year}</div>
              </div>
            </div>
          </div>

        ))}
      </div>


      <div className="Titles_wrapper">
        <div className="MainTitles">Newest Series.</div>
        <div className="See_all_Links">See all. <i className='bx bx-right-arrow-alt'></i></div>
      </div>

      <div className='allCards'>
        {repeatSerieCardDivs.map((_, number) => (

          <div className="card"
            key={number}>
            <div className="banner">
              <img src={allMovies.latestTvSeries[number].poster} draggable="false" />
            </div>
            <div className="card_info">
              <div className="titel">{allMovies.latestTvSeries[number].title} </div>
              <div className="card_info_inner">
                <div className="review">{ratingsLatestTvSeries[number]} <i className='bx bxs-star'></i></div>
                <div className="seasons">{seasonsLatestTvSeries[number]}</div>
              </div>
            </div>
          </div>

        ))}
      </div>

    </>
  );
}


export default Homepage;