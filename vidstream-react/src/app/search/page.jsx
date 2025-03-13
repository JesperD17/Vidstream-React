"use client"
import './search.css';
import useSWR from 'swr';

import { useSearchParams  } from 'next/navigation';
import SkeletonCards from '../standard/skeletonS/skeletonCards';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function Search() {
  const searchQuery = useSearchParams().get("q");
  var endQuery = 30
  if (searchQuery.length > endQuery) {
    searchQuery = searchQuery.substring(0, endQuery) + "...";
  }

  const {
    data: allMovies,
    error,
    isValidating,
  } = useSWR(`http://localhost:4030/Search?q=${searchQuery}`, fetcher, { // inputs the searchQuery to new fetch link
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  });

  if (error) return console.log("FAILED OR INCOMPLETE API!"), <div id="Empty"></div>;
  if (isValidating | !allMovies) {
    return <SkeletonCards />;    
  }

  const allLength = allMovies.items.length;
  const totalOnPaginate = new Array(allLength).fill(null); // fills the div structure

  var stats = [];
  var ratingsSearchPage = [];
  var seasonsSearchPage = [];
  var titlesSearchPage = [];

  for (let i = 0; i < allLength; i++) {
    stats.push(allMovies.items[i].stats); // pushes all the stats to var

    var allRating = allMovies.items[i].stats.rating;
    if (allRating == "?") {
      allRating = "";
    }
    ratingsSearchPage.push(allRating);

    var allSeasons = allMovies.items[i].stats.seasons;
    if (allSeasons && allSeasons.includes("SS", "/ EPS")) {
      allSeasons = allSeasons.replace("SS ", "S",).replace("EPS ", "EP");
    }
    seasonsSearchPage.push(allSeasons);

    // Adds max length to titles
    var endEllipsis = 18;
    var ending = '...'
    var allTitles = allMovies.items[i].title;
    if(allTitles.length > endEllipsis && window.screen.width < 700) {
      allTitles = allTitles.substring(0, endEllipsis) + ending;
    }
    titlesSearchPage.push(allTitles)
  }

  return (
    <div className="searchWrapper">
      <div id="Searched">Searched for:<div className="SearchWord">{searchQuery}</div></div>
      <div className="allCards" id="searchCards">
        {totalOnPaginate.map((_, number) => (
          <div className="card"
            key={number}>
            <div className="banner">
              <img src={allMovies.items[number].poster} draggable="false" />
            </div>
            <div className="card_info">
              <div className="titel">{titlesSearchPage[number]} </div>
              <div className="card_info_inner">
                <div>{stats[number].hasOwnProperty("duration", 'year', 'rating') ? // if stats contains specific arrays its a movie, else its a serie.
                  <>
                    <div className="review">{ratingsSearchPage[number]} <i className='bx bxs-star'></i></div>
                    <div className="duration">{allMovies.items[number].stats.duration}</div>
                    <div className="year">{allMovies.items[number].stats.year}</div>
                  </>
                  :
                  <>
                    <div className="review">{ratingsSearchPage[number]} <i className='bx bxs-star'></i></div>
                    <div className="seasons">{seasonsSearchPage[number]}</div>
                  </>
                }</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Search;