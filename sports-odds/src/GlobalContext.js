import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export function AppWrapper({ children }) {
  const [user, setUser] = useState();
  const [betInfo, setBetInfo] = useState();
  const [allBets, setAllBets] = useState();
  const [allBetsOutcome, setAllBetsOutcome] = useState();

  let sharedState = {
    user,
    setUser,
    betInfo,
    setBetInfo,
    allBets,
    setAllBets,
    allBetsOutcome,
    setAllBetsOutcome,
  };

  return (
    <AppContext.Provider value={sharedState}>{children}</AppContext.Provider>
  );
}
export function useAppContext() {
  return useContext(AppContext);
}
