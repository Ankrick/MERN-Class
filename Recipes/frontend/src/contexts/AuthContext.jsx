import { createContext, useReducer } from "react";

const AuthContext = createContext();

let AuthReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return { user : action.payload }
        case "LOGOUT":
            return { user : null }
        default:
            return state;
    }
}


const AuthContextProvider = ({children}) => {

    let [state, dispatch] = useReducer(AuthReducer, {
        user : null
    });


    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}


export {AuthContext, AuthContextProvider}