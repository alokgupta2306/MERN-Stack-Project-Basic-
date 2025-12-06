import { createContext, useReducer, useMemo , useEffect } from "react";

export const AuthContext = createContext({ user: null, dispatch: () => {} });

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { 
    user: null
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))

    if(user){
      dispatch({type: 'LOGIN', payload: user})
    }
  }, [])


  console.log("AuthContext State: ", state);

  const value = useMemo(
    () => ({ user: state.user, dispatch }),
    [state.user, dispatch]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
