"use client";
import { useState, useRef, useEffect } from "react";
import useSWR from "swr";

import ErrorPage from "./error/page";
import SkeletonHome from "./standard/skeletonS/skeletonHome";
import "././css/slideshow.css";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

// helper: fix ratings
const cleanRating = (rating) => (rating === "?" ? "" : rating);

// helper: shorten titles for mobile
const shortenTitle = (title, max = 18) => 
  window.screen.width < 700 && title.length > max
    ? title.substring(0, max) + "..."
    : title;

// helper: fix season strings
const fixSeasonString = (str) =>
  str.includes("SS", "/ EPS")
    ? str.replace("SS ", "S").replace("EPS ", "EP")
    : str;

// slideshow component
function SpotlightSlideshow({ spotlight, ratings, slideIndex, onLeft, onRight }) {
  return (
    <div id="allSlideshows">
      {spotlight.map((item, number) => (
        <div key={number} style={{ translate: `${-100 * slideIndex}%` }} className={"slideshow_wraper " + number}>
          <div className="slide_banner_wrapper">
            <img src={item.banner} draggable="false" />
            <div className="color_to_banner1">
              <div className="slide_info_inner">
                <div className="titel">{item.title}</div>
                <div className="watch_button"><button>Watch now</button><i className='bx bx-play bx-tada' /></div>
                <div className="review">{ratings[number]} <i className='bx bxs-star'></i></div>
                <div className="year">{item.year}</div>
              </div>
            </div>
            <div className="color_to_banner2"></div>
          </div>
        </div>
      ))}

      <div id="buttons">
        <div className="slide_to_left">
          <button onClick={onLeft}><i className='bx bxs-left-arrow-alt'></i></button>
        </div>
        <div className="slide_to_right">
          <button onClick={onRight}><i className='bx bxs-right-arrow-alt'></i></button>
        </div>
      </div>
    </div>
  );
}

// card list component
function CardList({ items, type }) {
  return (
    <div className="allCards">
      {items.map((item, i) => (
        <div className="card" key={i}>
          <div className="banner">
            <img src={item.poster} draggable="false" />
          </div>
          <div className="card_info">
            <div className="titel">{item.title}</div>
            <div className="card_info_inner">
              <div className="review">{item.rating} <i className='bx bxs-star'></i></div>
              {type === "movie" && (
                <>
                  <div className="duration">{item.duration}</div>
                  <div className="year">{item.year}</div>
                </>
              )}
              {type === "series" && (
                <div className="seasons">{item.seasons}</div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// title section
function Section({ title }) {
  return (
    <div className="Titles_wrapper">
      <div className="MainTitles">{title}</div>
      <div className="See_all_Links">See all. <i className='bx bx-right-arrow-alt'></i></div>
    </div>
  );
}

// main page
export default function Homepage() {
  const { data: allMovies, error, isValidating } = useSWR('http://localhost:4030/home', fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  });

  const [slideIndex, setslideIndex] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!allMovies) return;
    intervalRef.current = setInterval(() => {
      setslideIndex((i) => (i === allMovies.spotlight.length - 1 ? 0 : i + 1));
    }, 5000);
    return () => clearInterval(intervalRef.current);
  }, [allMovies]);

  if (error) return <ErrorPage />;
  if (isValidating || !allMovies) return <SkeletonHome />;

  const handleLeft = () => {
    setslideIndex((i) => (i === 0 ? allMovies.spotlight.length - 1 : i - 1));
    clearInterval(intervalRef.current);
  };

  const handleRight = () => {
    setslideIndex((i) => (i === allMovies.spotlight.length - 1 ? 0 : i + 1));
    clearInterval(intervalRef.current);
  };

  // format spotlight ratings
  const spotlightRatings = allMovies.spotlight.map(m => cleanRating(m.rating));

  const trendingMovies = allMovies.trending.movies.map(m => ({
    poster: m.poster,
    title: shortenTitle(m.title),
    rating: cleanRating(m.stats.rating),
    duration: m.stats.duration,
    year: m.stats.year,
  }));

  const trendingSeries = allMovies.trending.tvSeries.map(s => ({
    poster: s.poster,
    title: shortenTitle(s.title),
    rating: cleanRating(s.stats.rating),
    seasons: fixSeasonString(s.stats.seasons),
  }));

  const latestMovies = allMovies.latestMovies.map(m => ({
    poster: m.poster,
    title: shortenTitle(m.title),
    rating: cleanRating(m.stats.rating),
    duration: m.stats.duration,
    year: m.stats.year,
  }));

  const latestSeries = allMovies.latestTvSeries.map(s => ({
    poster: s.poster,
    title: shortenTitle(s.title),
    rating: cleanRating(s.stats.rating),
    seasons: fixSeasonString(s.stats.seasons),
  }));

  return (
    <>
      <SpotlightSlideshow
        spotlight={allMovies.spotlight}
        ratings={spotlightRatings}
        slideIndex={slideIndex}
        onLeft={handleLeft}
        onRight={handleRight}
      />

      <Section title="Most trending movies & series." />
      <CardList items={trendingMovies} type="movie" />
      <CardList items={trendingSeries} type="series" />

      <Section title="Newest movies." />
      <CardList items={latestMovies} type="movie" />

      <Section title="Newest Series." />
      <CardList items={latestSeries} type="series" />
    </>
  );
}