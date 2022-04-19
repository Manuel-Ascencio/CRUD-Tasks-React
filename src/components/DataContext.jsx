import React, { createContext, useState } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <DataContext.Provider value={{ tasks, setTasks, loading, setLoading }}>
      {children}
    </DataContext.Provider>
  );
};
