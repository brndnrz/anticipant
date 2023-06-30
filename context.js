import React, { useState, useContext, useReducer } from "react";
import { useRouter } from "next/router";

import supabase from "./supa";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const router = useRouter();

  let stateArr = [];
  const [user, setUser] = useState(null);
  const [userID, setUserID] = useState(null);
  const [buttonControlState, setButtonControlState] = useState(stateArr);

  const handleSave = async (id, poster_path, title, userID) => {
    const { data, error } = await supabase
      .from("movies")
      .insert([
        {
          movie_name: `${title}`,
          poster_path: `${poster_path}`,
          movie_id: `${id}`,
          user_fk: `${userID}`,
        },
      ])
      .select();

    if (data) {
      let tmp = [
        ...buttonControlState,
        {
          id: id,
          anticipantActive: false,
          showUnSave: true,
          poster_path: poster_path,
          movieRowId: data[0].id,
        },
      ];
      setButtonControlState(tmp);

      console.log("movie trailer saved successfully!");
    }

    if (error) {
      console.log(error);
    }
  };

  const handleUnSave = async (id) => {
    let tmp = buttonControlState.filter((item) => item.id === id);
    let tmpRowId = tmp[0].movieRowId;
    const { data, error } = await supabase
      .from("movies")
      .delete()
      .match({ id: `${tmpRowId}` })
      .select();
    if (data) {
      let filteredArr = buttonControlState.filter((item) => item.id !== id);
      setButtonControlState(filteredArr);
      console.log("movie trailer removed successfully!");
    }
    // return true;
  };

  const logUserIn = async () => {
    const { user, error } = await supabase.auth.signInWithOAuth({
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
        handleSave,
        handleUnSave,
        buttonControlState,
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
