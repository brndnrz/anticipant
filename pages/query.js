import { useState } from "react";
import Link from "next/link";
import MovieCover from "../components/MovieCover";

const Query = () => {
  const [movie, setMovie] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showMovies, setShowMovies] = useState(false);
  const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&language=en-US&query=${searchTerm}&page=1&include_adult=false`;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (searchTerm) {
      const res = await fetch(SEARCH_API);
      const data = await res.json();
      const results = data.results;
      setMovie(results);
      setShowMovies(true);
    }
    setSearchTerm("");
  };

  const handleOnChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <div className="pageWrapper">
        <form onSubmit={handleSubmit}>
          <input
            type="search"
            name="search"
            id="search"
            className="w-[400px] h-[50px] my-[30px] border-none rounded-[15px] pl-[20px] text-[20px] bg-white opacity-[.2] hover:cursor-pointer focus:outline-none focus:opacity-[.5] md:w-[600px] md:ml-auto md:mr-auto  md:flex md:flex-col md:justify-center md:items-center lg:w-[800px] lg:gap-[100px] lg:flex-row lg:flex-wrap "
            placeholder="Search Films..."
            value={searchTerm}
            onChange={handleOnChange}
          />
        </form>

        {showMovies ? (
          <div className="bg-white/5 rounded-[20px] mt-[30px] pt-[60px] w-full ml-auto mr-auto flex flex-wrap justify-center gap-[60px]">
            {movie.map((item) => (
              <Link href={`/search/${item.id}`} key={item.id}>
                <a>
                  <MovieCover
                    key={item.id}
                    {...item}
                    className="w-[400px] h-[500px] flex flex-col cursor-pointer"
                  />
                </a>
              </Link>
            ))}
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </>
  );
};

export default Query;
