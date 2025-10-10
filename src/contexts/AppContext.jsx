import React, { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext(undefined);

export const AppProvider = ({ children }) => {
  const [stagiaires, setStagiaires] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("stagiaires");
    if (stored) {
      setStagiaires(JSON.parse(stored));
    }
    const auth = localStorage.getItem("isAuthenticated");
    setIsAuthenticated(auth === "true");
  }, []);

  useEffect(() => {
    localStorage.setItem("stagiaires", JSON.stringify(stagiaires));
  }, [stagiaires]);

  const addStagiaire = (stagiaire) => {
    setStagiaires([...stagiaires, stagiaire]);
  };

  const updateStagiaire = (id, updatedStagiaire) => {
    setStagiaires(stagiaires.map((s) => (s.id === id ? updatedStagiaire : s)));
  };

  const deleteStagiaire = (id) => {
    setStagiaires(stagiaires.filter((s) => s.id !== id));
  };

  const getStagiaire = (id) => {
    return stagiaires.find((s) => s.id === id);
  };

  const login = (email, password) => {
    // Mock authentication - in real app this would call an API
    if (email === "admin@ista.ma" && password === "admin123") {
      setIsAuthenticated(true);
      localStorage.setItem("isAuthenticated", "true");
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
  };

  return (
    <AppContext.Provider
      value={{
        stagiaires,
        addStagiaire,
        updateStagiaire,
        deleteStagiaire,
        getStagiaire,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
};
