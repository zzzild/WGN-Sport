import React, { createContext, useState } from "react";

export const AppContext = createContext();


const AppContextProvider = (props) => {

  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : false
  );

  const value = {
    token, setToken
  }

  return(
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
}

export default AppContextProvider;
