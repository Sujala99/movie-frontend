// import React from 'react';

// const UserContext = React.createContext();

// const UserProvider = UserContext.Provider;

// export default UserContext;




import React, { createContext, useState } from 'react';

// Initialize UserContext with default values to avoid `null` issues.
const UserContext = createContext({
  user: { id: null, isAdmin: false },
  setUser: () => {},
  unsetUser: () => {},
});

// Provide a UserProvider wrapper to make it easy to use the context.
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ id: null, isAdmin: false });

  const unsetUser = () => {
    setUser({ id: null, isAdmin: false });
    localStorage.clear(); // Clear user data on logout.
  };

  return (
    <UserContext.Provider value={{ user, setUser, unsetUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
