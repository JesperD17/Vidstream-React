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
  
  console.log(allMovies);
  console.log(allMovies.latestMovies.length);
  
  const totalItems = allMovies.latestMovies.length;
  const items = new Array(totalItems).fill(null);

  // if array has "?", function changes it to empty array.
  

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
        {items.map((any, number) => (
          
          <div className="card"
          key={number}>
            <div className="banner">
              <img src={allMovies.latestMovies[number].poster} draggable="false" />
            </div>
            <div className="card_info">
              <div className="titel">{allMovies.latestMovies[number].title} </div>
              <div className="review">{allMovies.latestMovies[number].stats.rating}</div>
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