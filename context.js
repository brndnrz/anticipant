import React, { useState, useContext, useReducer } from "react";
import { useRouter } from "next/router";

import supabase from "./supa";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [userID, setUserID] = useState(null);

  const logUserIn = async () => {
    const { user, error } = await supabase.auth.signIn({
      provider: "google",
    });
    if (error) {
      console.log(error);
    }
  };

  supabase.auth.onAuthStateChange((event, session) => {
    if (event == "SIGNED_IN" && user === null && userID === null) {
      setUserID(session.user.id);
      setUser(session.user.user_metadata);
      router.push("/user");
    }
    if (event == "SIGNED_OUT") {
      router.push("/");
      setUser(null);
      setUserID(null);
    }
  });

  const logUserOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error);
    }
  };
  return (
    <AppContext.Provider
      value={{
        logUserIn,
        logUserOut,
        user,
        setUser,
        userID,
        setUserID,
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
