import React, { useState, useContext } from "react";
import { useRouter } from "next/router";

import supabase from "./supa";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [userUID, setUserUID] = useState(null);

  // const handleUnSave = async (id) => {
  //   setSaved(!saved);
  //   setShowButton(!showButton);
  // };

  // const updateMoviesArray = async (id) => {};

  // const fetchData = async () => {};

  const logUserIn = async () => {
    const { user, error } = await supabase.auth.signIn({
      provider: "google",
    });
    if (error) {
      console.log(error);
    }
  };

  supabase.auth.onAuthStateChange((event, session) => {
    if (event == "SIGNED_IN");
    router.push("/user");
  });

  const logUserOut = async () => {
    const { error } = await supabase.auth.signOut();
    setUser(null);
    router.push("/");
    if (error) {
      console.log(error);
    }
  };
  return (
    <AppContext.Provider
      value={{
        // handleUnSave,
        // fetchData,
        // error,
        // userData,
        // status,
        logUserIn,
        logUserOut,
        user,
        setUser,
        userUID,
        setUserUID,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
