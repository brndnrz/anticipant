import Link from "next/link";
import { useRouter } from "next/router";
import MovieCover from "../components/MovieCover";
import { GetStaticPaths } from "next";

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

let formattedDate = newDate.join("-");

export const getStaticPaths: GetStaticPaths = async () => {
  const pageNumbers = [2, 3, 4, 5];

  const paths = pageNumbers.map((num) => {
    return {
      params: { pageID: num.toString() },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context: {
  params: { pageID: string };
}) => {
  const pageNum = context.params.pageID;

  const pageRes = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageNum}&primary_release_date.gte=${formattedDate}&primary_release_date.lte=${nextYear}-${newDate[1]}-${newDate[2]}`
  );

  const pageData = await pageRes.json();

  const pageResults = pageData.results;

  const data = [...pageResults];

  return {
    props: {
      data,
      pageNum,
    },
  };
};

const PageNum = ({ data, pageNum }: any) => {
  const router = useRouter();

  let day = new Date().toDateString();

  const previousPage = () => {
    if (pageNum - 1 === 1) {
      router.push("/");
    } else {
      router.push(`/${pageNum}`);
    }
  };

  const nextPage = () => {
    if (pageNum + 1 === 6) {
      pageNum;
    } else {
      const next = parseInt(pageNum) + 1;
      router.push(`/${next}`);
    }
  };
  return (
    <div className="pageWrapper">
      <main className="w-full h-auto flex flex-col items-center bg-white/5 rounded-[20px] md:min-w-[600px] md:mb-[60px] lg:mb-[100px] lg:min-w-[900px]">
        <h3 className="text-white my-[30px] md:text-[25px] lg:text-[30px]">
          Anticipated Trailers | {day}
        </h3>
        <div className="lg:flex lg:justify-center lg:flex-wrap lg:gap-[100px] lg:mt-[20px] lg:ml-auto lg:mr-auto">
          {data.map((movie: Movie) => {
            return (
              (<Link href={`/movies/${movie.id}`} key={movie.id}>

                <MovieCover key={movie.id} {...movie} />

              </Link>)
            );
          })}
        </div>

        <div className="flex justify-center gap-[30px] mb-[20px] w-full md:text-[20px] md:w-[80%] md:mb-[60px] lg:text-[22px]  lg:mt-[100px]">
          <button
            onClick={previousPage}
            className={`
           ${
             pageNum == 1
               ? //inactive
                 `border-none pl-[30px] m-0 bg-transparent text-white/10 mr-auto md:text-[15px] lg:text-[18px] p-0 cursor-not-allowed`
               : // previouspage
                 `border-none pl-[30px] m-0 bg-transparent text-white/50 mr-auto md:text-[15px] lg:text-[18px] p-0 cursor-pointer hover:text-btnYellow`
           }
          `}
          >
            Previous Page
          </button>

          <h3 className="p-0 m-0 text-white border-none">{pageNum}</h3>

          <button
            onClick={nextPage}
            id="nextpage"
            className={`
           ${
             pageNum == 5
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

export default PageNum;
