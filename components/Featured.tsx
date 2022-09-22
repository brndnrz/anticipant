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
}
const Featured = ({
  // id,
  title,
  poster_path,
  // release_date,
  popularity,
}: Movie) => {
  const imgApi = "https://image.tmdb.org/t/p/w1280";

  return (
    <div className="flex justify-center items-center snap-start origin-center shrink-0 grow mr-10 scale-100 h-[280px] w-[300px] lg:h-[300px] lg:w-[350px]">
      <div className="w-[72%] lg:w-[57%] ">
        {!!poster_path && (
          <Image
            src={imgApi + poster_path}
            className=" border-transparent rounded-tl-[10px] rounded-tr-0 rounded-bl-[10px] rounded-br-0 object-cover"
            layout="responsive"
            width={600}
            height={975}
            alt={`${title} Movie Cover`}
          />
        )}
      </div>
      <div className="flex flex-col text-center items-center text-white self-center w-[50%] h-full rounded-tl-0 rounded-tr-[10px] rounded-br-[10px] rounded-bl-0 bg-white/5 px-[20px]">
        <h3 className="mt-auto text-[20px] ">{title}</h3>
        <p className="mb-auto text-[12px] font-bold opacity-[.8]">
          Votes: {`${Math.floor(popularity)}`}
        </p>
      </div>
    </div>
  );
};

export default Featured;
