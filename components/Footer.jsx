import { BiUpArrowCircle } from "react-icons/bi";
import Image from "next/image";
const Footer = () => {
  return (
    <footer className="mt-[30px] mb-[15px] w-full flex">
      <div>
        <div className="opacity-[.2] mb-0 ml-[30px]">
          <Image
            src="/tmdb_logo.svg"
            width={180}
            height={30}
            alt="The Movie Database Logo"
          />
        </div>
        <div className="ml-[30px] mt-0 text-white  max-w-[50%] opacity-[.2] text-[10px]">
          <p>
            This product uses the TMDB API but is not endorsed or certified by
            TMDB.
          </p>
          <p>
            Icon made by{" "}
            <a href="https://www.freepik.com" title="Freepik">
              Freepik
            </a>
            from{" "}
            <a href="https://www.flaticon.com/" title="Flaticon">
              www.flaticon.com
            </a>
          </p>
        </div>
      </div>

      <div
        className=" text-[35px] text-white text-center ml-auto mr-[30px] p-[2px] cursor-pointer md:text-[50px]"
        data-tip="Sroll To Top"
        onClick={() => {
          window.scrollTo(0, 0);
        }}
      >
        <BiUpArrowCircle />
      </div>
    </footer>
  );
};

export default Footer;
