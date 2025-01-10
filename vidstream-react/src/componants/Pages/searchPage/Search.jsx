import './Search.css';
import useSWR from 'swr';

import { useLocation, Outlet } from 'react-router-dom';
import SkeletonCards from '../../skeletonS/skeletonCards';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function Search() {
  // grabs the url afer /Search
  const location = useLocation();
  const searchQuery = location.search;
  var newQuery = searchQuery.replace('?q=', '').replaceAll('%20', ' ') // onscreen search result
  var endQuery = 30
  if (newQuery.length > endQuery)
  newQuery = newQuery.substring(0, endQuery) + "..."
  const {
    data: allMovies,
    error,
    isValidating,
  } = useSWR(`https://vidstream-api.vercel.app/Search${searchQuery}`, fetcher, { // inputs the searchQuery to new fetch link
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  });

  if (error) return console.log("FAILED OR INCOMPLETE API!");
  if (isValidating | !allMovies) {
    return <SkeletonCards />;
  }

  const allLength = allMovies.items.length;
  const totalOnPaginate = new Array(allLength).fill(null); // fills the div structure

  var ratingsSearchPage = [];
  var seasonsSearchPage = [];
  var titlesSearchPage = [];
  var stats = [];
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
    <>
      <div id="Searched">Searched for:<div className="SearchWord">{newQuery}</div></div>
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
                <div>{stats[number].hasOwnProperty("duration", 'year', 'rating') ? // if stats contains strings its a movie, else its a serie.
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
      <Outlet />
    </>
  )
}

export default Search;