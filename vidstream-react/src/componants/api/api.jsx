import useDrag from '../global functions/draggableItems';
import useSWR from 'swr';

// created function to handle API request
const fetcher = (...args) => fetch(...args).then((res) => res.json());
// using Swr for fetching api
function Swr() {
  const {
    data: allMovies,
    error,
    isValidating,
  } = useSWR('https://vidstream-api.vercel.app/home', fetcher);
  
  // drag function
  const { containerRef, handleMouseDown, handleMouseMove, handleMouseUpOrLeave } = useDrag();

  // Handles error and loading state
  if (error) return <div className='failed'>failed to load</div>;
  if (isValidating) return <div className="Loading">Loading...</div>;
  
  // console logging api etc.
  console.log(allMovies);
  console.log(allMovies.latestMovies.length);
  
  // repeating the card div structure to the amount of movies in api.
  const moviesLength = allMovies.latestMovies.length;
  const repeatCardDivs = new Array(moviesLength).fill(null);

// if a string has "?", function changes it to empty string.
let ratings = []; // making an object for updated strings.
var movieRating;

  for (let i = 0; i < allMovies.latestMovies.length; i++) {
    movieRating = allMovies.latestMovies[i].stats.rating;

    if(movieRating == "?") {
      movieRating = "EMPTY"; // empties string
    } 
    // sends the new strings to the object
    ratings.push(movieRating);
  }

  return (
    <>
      <div 
        className='allCards'
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
      >
        {repeatCardDivs.map((_, number) => (
          
          <div className="card"
          key={number}>
            <div className="banner">
              <img src={allMovies.latestMovies[number].poster} draggable="false" />
            </div>
            <div className="card_info">
              <div className="titel">{allMovies.latestMovies[number].title} </div>
              <div className="review">{ratings[number]}</div> 
              <div className="duration">{allMovies.latestMovies[number].stats.duration}</div>
              <div className="year">{allMovies.latestMovies[number].stats.year}</div>
            </div>
          </div>

        ))}
      </div>
    </>
  );
}


export default Swr;