import useSWR from 'swr';

// created function to handle API request
const fetcher = (...args) => fetch(...args).then((res) => res.json());
 function Swr() {
  const {
    data: allMovies,
    error,
    isValidating,
  } = useSWR('https://vidstream-api.vercel.app/home', fetcher);

  // Handles error and loading state
  if (error) return <div className='failed'>failed to load</div>;
  if (isValidating) return <div className="Loading">Loading...</div>;
  
  console.log(allMovies);
  // console.log(allMovies.spotlight[0].poster);

  for (let index = 0; index < allMovies.spotlight.length; index++) {
    console.log(index);  

    return (
      <div className="card">
          <div className="banner">
              <img src={allMovies.spotlight[1].poster} draggable="false" />
          </div>
          <div className="card_info">
              <div className="titel">titel </div>
              <div className="review">review</div>
              <div className="duration">duration</div>
              <div className="year">year</div>
          </div>
      </div>
    )
  }
};


export default Swr;