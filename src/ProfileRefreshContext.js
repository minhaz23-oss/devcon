import React, { createContext, useState, useContext } from 'react';

const ProfileRefreshContext = createContext();

export const useProfileRefresh = () => useContext(ProfileRefreshContext);

export const ProfileRefreshProvider = ({ children }) => {
  const [refresh, setRefresh] = useState(false);

  return (
    <ProfileRefreshContext.Provider value={{ refresh, setRefresh }}>
      {children}
    </ProfileRefreshContext.Provider>
  );
};
