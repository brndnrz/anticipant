import { useGlobalContext } from "../../context";
import Image from "next/image";
import { useEffect } from "react";
import supabase from "../../supa";
const Index = () => {
  const { logUserIn, logUserOut, user, setUser, setUserUID } =
    useGlobalContext();

  useEffect(() => {
    const checkUserStatus = supabase.auth.user();
    if (checkUserStatus != null) {
      const userMetaData = checkUserStatus.user_metadata;
      setUser(userMetaData);
      setUserUID(checkUserStatus.identities[0].user_id);
    }
  }, [setUser, setUserUID]);

  if (user) {
    return (
      <>
        <div className="flex flex-col w-[80%] h-auto ml-auto mr-auto">
          <div className=" w-full h-[100px] bg-white/5 flex justify-center items-center text-white text-[20px] font-bold tracking-wider mt-[25px] mb-[50px] ml-auto mr-auto">
            <h3>Welcome {user.full_name}</h3>
            {user.picture ? (
              <div className="w-[50px] h-[50px] ml-[15px]">
                <Image
                  src={user.picture}
                  width={200}
                  height={200}
                  layout="responsive"
                  className="rounded-full"
                  alt=""
                />
              </div>
            ) : (
              ""
            )}
          </div>
          <button
            onClick={logUserOut}
            className="text-white text-[18px] w-[100px] self-end hover:cursor-pointer rounded-[20px] bg-white/5 h-[50px]"
          >
            Sign Out
          </button>
          <div className="mt-[50px] w-full">
            <h3 className="text-white text-[20px] mb-[20px]">
              Your Saved Trailers:
            </h3>
            {/* <div className="flex flex-wrap gap-[50px] items-center justify-center py-[50px] ">
              {userData
                ? userData.movies.map((movie) => {
                    return (
                      <Link href={`/search/${movie}`} key={parseInt(movie)}>
                        <a className="w-[200px] h-[350px] border-2">{movie}</a>
                      </Link>
                    );
                  })
                : ""}
            </div> */}
          </div>
        </div>
      </>
    );
  }

  if (user === null) {
    return (
      <>
        <div className="text-white text-[18px] mt-[50px] mb-[100px] bg-white/5 w-[80%] text-center h-[100px] flex justify-center items-center ml-auto mr-auto lg:w-[50%]">
          You Need To Sign In To Access Your Profile
        </div>
        <button
          onClick={logUserIn}
          className="text-white text-[20px] bg-white/5 h-[60px] w-[200px] rounded-[20px] hover:cursor-pointer"
        >
          Sign In
        </button>
      </>
    );
  }
};

export default Index;
