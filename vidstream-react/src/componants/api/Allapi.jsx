import useDrag from '../global functions/draggableItems';
import useSWR from 'swr';
import Skeleton from '../skeleton/skeleton';


// created function to handle API request
const fetcher = (...args) => fetch(...args).then((res) => res.json());
// using Swr for fetching api
function Homepage() {
  const {
    data: allMovies,
    error,
    isValidating,
  } = useSWR('https://vidstream-api.vercel.app/home', fetcher,  { // settings to stop swr from reloading.
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  });
  
  // imported drag function.
  const { containerRef, handleMouseDown, handleMouseMove, handleMouseUpOrLeave } = useDrag();

  // Handles error and loading/Skeleton.
  if (error) return <div className='failed'>failed to load</div>;
  if (isValidating | !allMovies) return <Skeleton />; 
 
  
  // console logging api
  console.log(allMovies);
  
// repeating the card div structure to the amount of movies in api.
const trendingMoviesLength = allMovies.trending.movies.length;
const repeatTrendingMoviesCardDivs = new Array(trendingMoviesLength).fill(null);
// if a string has "?", function changes it to empty string.
let ratingsTrendingMovies = [] // making an object for updated strings.
var trendingMovieRating; 
  for (let i = 0; i < allMovies.trending.movies.length; i++) {
    trendingMovieRating = allMovies.trending.movies[i].stats.rating;

    if(trendingMovieRating == "?") {
      trendingMovieRating = ""; // empties string
    } // sends the new strings to the object
    ratingsTrendingMovies.push(trendingMovieRating);
  }

const trendingSeriesLength = allMovies.trending.tvSeries.length;
const repeatTrendingSeriesCardDivs = new Array(trendingSeriesLength).fill(null);
let ratingsTrendingSeries = [] 
var trendingSerieRating; 
  for (let i = 0; i < allMovies.trending.tvSeries.length; i++) {
    trendingSerieRating = allMovies.trending.tvSeries[i].stats.rating;

    if(trendingSerieRating == "?") {
      trendingSerieRating = "";
    } 
    ratingsTrendingSeries.push(trendingSerieRating);
  }

const moviesLength = allMovies.latestMovies.length;
const repeatMovieCardDivs = new Array(moviesLength).fill(null);
let ratingsLatestMovies = [];
var movieRating;
  for (let i = 0; i < allMovies.latestMovies.length; i++) {
    movieRating = allMovies.latestMovies[i].stats.rating;

    if(movieRating == "?") {
      movieRating = ""; 
    } 
    ratingsLatestMovies.push(movieRating);
  }

const seriesLength = allMovies.latestTvSeries.length;
const repeatSerieCardDivs = new Array(seriesLength).fill(null);

let ratingsLatestTvSeries = []
var serieRating; 
  for (let i = 0; i < allMovies.latestTvSeries.length; i++) {
    serieRating = allMovies.latestTvSeries[i].stats.rating;

    if(serieRating == "?") {
      serieRating = "";
    }
    ratingsLatestTvSeries.push(serieRating);
  }


  
  return (
    <>
      <div className="Titles_wrapper">
        <div className="MainTitles">Most trending movies & series.</div>
        <div className="See_all_Links">See all. <i className='bx bx-right-arrow-alt'></i></div>
      </div>
      <div 
        className='allCards'
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
      >

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
      <div 
        className='allCards'
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
      >

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
                <div className="year">{allMovies.trending.tvSeries[number].stats.seasons}</div>
              </div>
            </div>
          </div>

        ))}
      </div>


      <div className="Titles_wrapper">
        <div className="MainTitles">Newest movies.</div>
        <div className="See_all_Links">See all. <i className='bx bx-right-arrow-alt'></i></div>
      </div>
      <div 
        className='allCards'
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
      >

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
      <div 
        className='allCards'
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
      >

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
                <div className="seasons">{allMovies.latestTvSeries[number].stats.seasons}</div>
              </div>
            </div>
          </div>

        ))}
      </div>
    </>
  );
}


export default Homepage;