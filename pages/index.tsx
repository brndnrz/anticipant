import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import MovieCover from "../components/MovieCover";
import Featured from "../components/Featured";
interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: [number];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

const Home: any = ({ data, sortedMovies }: { data: []; sortedMovies: [] }) => {
  const router = useRouter();

  const [pageNumber, setPageNumber] = useState<number>(1);

  let day = new Date().toDateString();

  const nextPage = () => {
    router.push("/2");
  };

  return (
    <div className="pageWrapper">
      <h1 className="text-[20px] text-white font-light mb-[5px] md:text-[30px] lg:text-[25px]">
        Top 5 Most Anticipated Trailers
      </h1>
      <h3 className="font-[14px] text-white/10 italic mb-[15px] p-0 tracking-[0.3px]">
        from The Movie Database
      </h3>
      <header className="w-[80vw] h-[300px] mb-[50px] overflow-hidden text-center flex gap-[20px] items-center overflow-x-auto ml-auto mr-auto snap-mandatory snap-x scroll-auto md:h-[350px] lg:h-[400px] ">
        {sortedMovies.map((movie: Movie) => (
          <Link href={`/movies/${movie.id}`} key={movie.id}>
            <a>
              <Featured key={movie.id} {...movie} />
            </a>
          </Link>
        ))}
      </header>

      <main className="w-full h-auto flex flex-col items-center bg-white/5 rounded-[20px] md:min-w-[600px] md:mb-[60px] lg:mb-[100px] lg:min-w-[900px]">
        <h3 className="text-white my-[30px] md:text-[25px] lg:text-[30px]">
          Anticipated Trailers | {day}
        </h3>
        <div className="lg:flex lg:justify-center lg:flex-wrap lg:gap-[100px] lg:mt-[20px] lg:ml-auto lg:mr-auto">
          {data.map((movie: Movie) => (
            <Link href={`/movies/${movie.id}`} key={movie.id}>
              <a>
                <MovieCover key={movie.id} {...movie} />
              </a>
            </Link>
          ))}
        </div>

        <div className="flex justify-center gap-[30px] mb-[20px] w-full md:text-[20px] md:w-[80%] md:mb-[60px] lg:text-[22px]  lg:mt-[100px]">
          <button
            className={`
           ${
             pageNumber == 1
               ? //inactive
                 `border-none pl-[30px] m-0 bg-transparent text-white/10 mr-auto md:text-[15px] lg:text-[18px] p-0 cursor-not-allowed`
               : // previouspage
                 `border-none pl-[30px] m-0 bg-transparent text-white/50 mr-auto md:text-[15px] lg:text-[18px] p-0 cursor-pointer hover:text-btnYellow`
           }
          `}
          >
            Previous Page
          </button>

          <h3 className="p-0 m-0 text-white border-none">{pageNumber}</h3>

          <button
            onClick={nextPage}
            id="nextpage"
            className={`
           ${
             pageNumber == 5
               ? //inactive
                 `border-none pr-[30px] m-0 bg-transparent text-white/10 ml-auto cursor-not-allowed`
               : //nextpage
                 `pr-[30px] m-0 bg-transparent text-white/50 ml-auto cursor-pointer hover:text-btnYellow`
           }
          `}
          >
            Next Page
          </button>
        </div>
      </main>
    </div>
  );
};

export default Home;

export const getStaticProps = async () => {
  let newDate = new Date()
    .toLocaleDateString("en-us", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    })
    .split("/");
  let year: any = newDate.pop();
  newDate.unshift(year);
  if (newDate[1].length < 2) {
    newDate[1] = "0" + newDate[1];
  }
  if (newDate[2].length < 2) {
    newDate[2] = "0" + newDate[2];
  }
  let nextYear = (parseInt(newDate[0]) + 1).toString();

  function compare(a: { popularity: number }, b: { popularity: number }) {
    const movie_a = a.popularity;
    const movie_b = b.popularity;

    let comparison = 0;
    if (movie_a < movie_b) {
      comparison = 1;
    } else if (movie_a > movie_b) {
      comparison = -1;
    }
    return comparison;
  }

  let formattedDate = newDate.join("-");

  const page1res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_date.gte=${formattedDate}&primary_release_date.lte=${nextYear}-${newDate[1]}-${newDate[2]}`
  );
  const page1 = await page1res.json();

  const data = await page1.results;
  const sortedMovies = data.sort(compare).slice(0, 5);

  return {
    props: {
      data,
      sortedMovies,
    },
  };
};
