import { GetServerSideProps } from "next";
import supabase from "../../supa";
import { useState, useEffect } from "react";
import { useGlobalContext } from "../../context";

import Image from "next/image";
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
  key: number;
}

interface Cast extends Movie {
  profile_path: string;
  name: string;
}

const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

export default function Movie({
  movie,
  official,
  // allTrailers,
  sliced,
  director,
  officialReleaseDate,
}: {
  movie: Movie;
  official: Movie;
  // allTrailers: any;
  sliced: [{ profile_path: string; name: string }];
  director: Cast;
  officialReleaseDate: string;
}) {
  const imgApi = "https://image.tmdb.org/t/p/w1280";
  const { id, poster_path, overview, title } = movie;

  // const [showAll, setShowAll] = useState(false);
  if (officialReleaseDate == "Date") {
    officialReleaseDate =
      "Stay Tuned! An Official US Release Date Hasn't Been Announced";
  }

  const [showAddButton, setShowAddButton] = useState(true);
  const [showRemoveButton, setShowRemoveButton] = useState(false);
  if (officialReleaseDate == "Date") {
    officialReleaseDate =
      "Stay Tuned! An Official US Release Date Hasn't Been Announced";
  }

  const { user, userID, handleSave, handleUnSave, buttonControlState } =
    useGlobalContext();

  useEffect(() => {
    buttonControlState.map((item: any) => {
      if (item.id === id) {
        setShowAddButton(() => item.anticipantActive);
        setShowRemoveButton(() => item.showUnSave);
      }
    });
  }, [buttonControlState, id]);
  return (
    <>
      <div className="pageWrapper">
        <div className="flex flex-col items-center w-screen md:flex-row md:flex-wrap md:mt-[40px] md:w-[90vw]">
          <div
            key={id}
            className="w-[400px] h-[500px] mb-[50px] flex flex-col  md:w-[50%] md:h-[50%] md:mb-[80px] md:order-1 md:flex-initial"
          >
            <div className="w-[80%] h-full self-center">
              {poster_path === null ? (
                <Image
                  src="/coming_soon.jpg"
                  className="object-cover w-full h-full border-none"
                  width={500}
                  height={700}
                  layout="responsive"
                  alt="Movie Poster"
                />
              ) : (
                <Image
                  src={imgApi + poster_path}
                  className="object-cover w-full h-full border-none"
                  width={500}
                  height={700}
                  layout="responsive"
                  alt="Movie Poster"
                />
              )}
            </div>
            {user && showAddButton ? (
              <button
                onClick={() => handleSave(id, poster_path, title, userID)}
                className="tooltip tooltip-bottom tooltip-success font-bold text-center bg-gradient-to-r from-yellow-300 to-yellow-500 text-black  rounded-[20px] p-[5px] w-[50%] h-[20%] mx-auto mt-[20px] cursor-pointer "
                data-tip="Save Movie To Profile"
              >
                Anticipate
              </button>
            ) : (
              ""
            )}
            {showRemoveButton ? (
              <button
                onClick={() => handleUnSave(id)}
                className="tooltip tooltip-bottom tooltip-error font-bold bg-gradient-to-t from-green-400 to-green-600 text-black w-[50%] h-[20%] mx-auto mt-[20px] p-[5px] rounded-[20px]  text-center hover:bg-gradient-to-t hover:from-rose-400 hover:to-rose-600"
                data-tip="Remove Movie From Profile?"
              >
                Saved!
              </button>
            ) : (
              ""
            )}
          </div>
          <div className="p-[50px] mt-0 mb-[70px] text-white text-center bg-white/5 md:w-[50%] md:ml-auto md:mr-auto md:order-2 md:flex-initial">
            <h1 className="text-[24px] mb-[5px]">{title}</h1>
            <p className="text-[12px] mt-0 mb-[20px] opacity-[.8] md:text-[16px] ">
              {officialReleaseDate}
            </p>
            <p className="pb-[10px] text-[18px] leading-6">{overview}</p>
          </div>
          <div className="mt-[30px] mx-0 mb-[100px] px-[30px] w-screen h-[500px] bg-white/5 text-center flex items-center gap-[30px] order-4 overflow-x-auto md:order-4">
            {director === null ? (
              <div className="text-center flex  flex-col shrink-0 grow justify-center w-[180px] h-[80%]">
                <Image
                  src="/ghost.jpg"
                  className="object-cover h-[60%] rounded-tl-[10px] rounded-tr-[10px]"
                  layout="responsive"
                  placeholder="blur"
                  blurDataURL={`data:image/svg+xml;base64,${toBase64(
                    shimmer(700, 475)
                  )}`}
                  width={500}
                  height={800}
                  alt="Movie Director"
                />
                <div className="h-[40%] pt-[20px] bg-white/5 rounded-bl-[10px] rounded-br-[10px]">
                  <h3 className="text-[18px] text-white">Director</h3>
                  <h3>No Director Announced</h3>
                </div>
              </div>
            ) : (
              <div className="text-center flex  flex-col shrink-0 grow justify-center w-[180px] h-[80%]">
                <Image
                  src={imgApi + director.profile_path}
                  className="object-cover h-[60%] rounded-tl-[10px] rounded-tr-[10px]"
                  layout="responsive"
                  placeholder="blur"
                  blurDataURL={`data:image/svg+xml;base64,${toBase64(
                    shimmer(700, 475)
                  )}`}
                  width={500}
                  height={800}
                  alt="Movie Director"
                />
                <div className="h-[40%] pt-[20px] bg-white/5 rounded-bl-[10px] rounded-br-[10px]">
                  <h3 className="text-[18px] text-white">Director</h3>

                  <h3 className="text-[18px] text-white">{director.name}</h3>
                </div>
              </div>
            )}
            {sliced.map((actor, index) => {
              return (
                <div
                  key={index}
                  className="text-center flex  flex-col shrink-0 grow justify-center w-[180px] h-[80%]"
                >
                  {actor.profile_path === null ? (
                    <Image
                      src="/ghost.jpg"
                      className="object-cover h-[60%] rounded-tl-[10px] rounded-tr-[10px]"
                      layout="responsive"
                      placeholder="blur"
                      blurDataURL={`data:image/svg+xml;base64,${toBase64(
                        shimmer(700, 475)
                      )}`}
                      width={500}
                      height={800}
                      alt="Movie Actor"
                    />
                  ) : (
                    <Image
                      src={imgApi + actor.profile_path}
                      className="object-cover h-[60%] rounded-tl-[10px] rounded-tr-[10px]"
                      layout="responsive"
                      placeholder="blur"
                      blurDataURL={`data:image/svg+xml;base64,${toBase64(
                        shimmer(700, 475)
                      )}`}
                      width={500}
                      height={800}
                      alt="Movie Actor"
                    />
                  )}
                  <div className="h-[40%] pt-[20px] bg-white/5 rounded-bl-[10px] rounded-br-[10px]">
                    <h3 className="text-[18px] text-white">Cast</h3>
                    {actor === null ? (
                      <h3>Uncast</h3>
                    ) : (
                      <h3 className="text-[18px] text-white">{actor.name}</h3>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="bg-white/5 w-screen h-[500px] mb-[50px] flex justify-center items-center gap-[50px] overflow-x-scroll md:order-3 md:mt-[50px] md:mb-[40px]">
            {official != null ? (
              <div className="ml-[65px]">
                <iframe
                  width="450"
                  height="250"
                  src={`https://www.youtube.com/embed/${official.key}`}
                  title="YouTube video player"
                  className="md:w-[550px] md:h-[350px]"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; 
                            encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            ) : (
              <div className="text-white mt-[50px] text-[20px] flex  text-center  ml-auto mr-auto w-[50%]">
                <div>
                  <h2>Stay Tuned!</h2>
                  <p className="font-bold text-white mt-[10px]">
                    An Official Trailer Hasn&#39;t Been Released For This Movie
                    Yet
                  </p>
                </div>
              </div>
            )}
          </div>
          {/* <div className="bg-white/5 w-screen h-[500px] my-[50px] flex flex-col justify-center ">
            <p
              className="text-white font-bold text-[20px] cursor-pointer text-center"
              onClick={() => setShowAll(!showAll)}
            >
              View All Non-Official Videos
            </p>
            <div className="flex items-center overflow-x-auto snap-x my-[50px]  gap-[65px]">
              {allTrailers != null && showAll
                ? allTrailers.map((trailer: any) => (
                    <div
                      key={trailer.id}
                      className="snap-center first-of-type:ml-[65px]"
                    >
                      <iframe
                        width="450"
                        height="250"
                        src={`https://www.youtube.com/embed/${trailer.key}`}
                        title="YouTube video player"
                        className="md:w-[550px] md:h-[350px]"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write;
                                  encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  ))
                : ""}
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const id = context.params.searchid;
  const [movieRes, videoRes, creditsRes, releaseRes] = await Promise.all([
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.API_KEY}&language=en-US`
    ),
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.API_KEY}&language=en-US`
    ),
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.API_KEY}&language=en-US`
    ),
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/release_dates?api_key=${process.env.API_KEY}`
    ),
  ]);
  const [movie, video, credits, release] = await Promise.all([
    movieRes.json(),
    videoRes.json(),
    creditsRes.json(),
    releaseRes.json(),
  ]);

  let official;
  // let allTrailers;
  if (video.results !== undefined) {
    official = video.results.find(
      (entry: { type: string; official: boolean }) => {
        if (entry.type === "Trailer" && entry.official === true) {
          return entry;
        }
      }
    );
    // allTrailers = video.results;
  }

  if (official == undefined) {
    official = null;
  }

  // if (allTrailers == undefined) {
  //   allTrailers = null;
  // }

  let dateUS = release.results.find(
    (country: any) => country["iso_3166_1"] == "US"
  );

  let releaseDates;

  if (dateUS == undefined) {
    dateUS = null;
  } else {
    releaseDates = dateUS.release_dates.map((entry: any) => {
      if (entry["type"] === 3) {
        return entry.release_date;
      }
    });
  }

  let officialReleaseDate;
  if (releaseDates == undefined) {
    officialReleaseDate = "Date";
  } else {
    const releaseDate = releaseDates
      .filter((entry: any) => entry != undefined)
      .join()
      .split("T")
      .slice(0, 1)
      .join()
      .split("-");
    const shift = releaseDate.shift();
    releaseDate.push(shift);
    const shiftedDate = releaseDate.join(" ");
    officialReleaseDate = new Date(shiftedDate)
      .toDateString()
      .split(" ")
      .slice(1)
      .join(" ");
  }

  let sliced = credits.cast.slice(0, 6);
  let director = credits.crew.find((member: any) => member.job === "Director");

  if (director == undefined) {
    director = null;
  }

  return {
    props: {
      movie,
      official,
      // allTrailers,
      sliced,
      director,
      officialReleaseDate,
    },
  };
};
