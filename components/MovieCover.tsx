import Image from "next/legacy/image";
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

const MovieCover = ({
  // id,
  title,
  poster_path,
  // release_date,
  popularity,
}: Movie) => {
  const imgApi = "https://image.tmdb.org/t/p/w1280";

  return (
    <div className="w-[300px] h-[500px] mb-[200px] flex flex-col cursor-pointer  lg:flex-row lg:flex-wrap lg:w-[350px] ">
      <div className="w-[100%] self-center ">
        {!!poster_path ? (
          <Image
            src={imgApi + poster_path}
            className="object-cover border-none rounded-t-[15px] "
            layout="responsive"
            placeholder="blur"
            blurDataURL={`data:image/svg+xml;base64,${toBase64(
              shimmer(700, 475)
            )}`}
            width={600}
            height={975}
            alt={`${title} Movie Cover`}
          />
        ) : (
          <Image
            src="/coming_soon.jpg"
            className="object-cover border-none"
            layout="responsive"
            width={600}
            height={975}
            alt={`${title} Movie Cover`}
          />
        )}
      </div>
      <div className="pt-8 px-[20px] w-[100%]   pb-8 mt-0 text-white text-center bg-white/5 md:ml-auto md:mr-auto rounded-b-[15px] ">
        <h3 className="text-[20px] mb-[5px] md:text-[16px] lg:text-[18px]">
          {title}
        </h3>
        <p className="text-[12px] mt-0 opacity-[.8] lg:text-[15px]">
          Votes: {`${Math.floor(popularity)}`}
        </p>
      </div>
    </div>
  );
};

export default MovieCover;
