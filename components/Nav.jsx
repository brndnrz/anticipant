import Link from "next/link";
import Image from "next/image";
import { BiSearch, BiUser } from "react-icons/bi";
import { useGlobalContext } from "../context";

const Nav = () => {
  const { logUserIn, user } = useGlobalContext();

  return (
    <div className="text-white flex w-full min-h-[80px] mb-[50px] mt-[30px] ">
      <Link href="/" legacyBehavior>
        <div className=" bg-white/5 ml-[30px] mr-auto w-[100px] h-[80px] rounded-[20px] flex flex-col items-center justify-center cursor-pointer">
          <Image
            src="/movie-ticket.png"
            width={50}
            height={50}
            alt="Anticipant Logo"
          />
        </div>
      </Link>

      <div className="flex  items-center  ml-auto mr-[30px] w-[150px] ">
        <Link href="/query" legacyBehavior>
          <div>
            <BiSearch className="h-[50px] w-[60px] text-white bg-white/5 p-[10px] text-center rounded-[20px] hover:cursor-pointer" />
          </div>
        </Link>
        <div className="ml-auto text-[18px] h-[50px] w-[80px] flex items-center justify-center bg-white/5 text-center rounded-[20px] hover:cursor-pointer">
          {user != null ? (
            <Link href="/user" legacyBehavior>
              <div>
                <BiUser className="text-[30px]" />
              </div>
            </Link>
          ) : (
            <button onClick={logUserIn}>Sign In</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Nav;
