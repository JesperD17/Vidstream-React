import useSWR from 'swr';

// Import useSWR from swr package

// created function to handle API request
const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Swr = () => {
  const {
    data: allMovies,
    error,
    isValidating,
  } = useSWR('https://vidstream-api.vercel.app/home', fetcher);

  // Handles error and loading state
  if (error) return <div className='failed'>failed to load</div>;
  if (isValidating) return <div className="Loading">Loading...</div>;

  console.log(allMovies);
  console.log(allMovies.spotlight[0].poster);
  return (
    <div>
      {/* {Array.isArray(allMovies) &&
        allMovies.map((movie, index) => ( */}
          <img src={allMovies.spotlight[0].poster} />
        {/* ))} */}
    </div>
  );
};

export default Swr;