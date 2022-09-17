import { createContext, useEffect, useReducer } from "react";
import { onAuthChangeListener } from "../../utils/firebase/firebase.auth.utils";
import { createAction } from "../../utils/reducer/reducer.util";

export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null
})

const USER_ACTION_TYPES = {
    SET_CURRENT_USER: 'SET_CURRENT_USER'
}

const userReducer = (state, action) => {
    const {type, payload} = action;

    if (type === USER_ACTION_TYPES.SET_CURRENT_USER) {
        return {
            currentUser: payload
        }
    } else {
        throw new Error(`unhandled type ${type} in userReducer`)
    }
}

const INITIAL_STATE = {
    currentUser: null
}

export const UserProvider = ({children}) => {
    const [{currentUser}, dispatch] = useReducer(userReducer, INITIAL_STATE);

    const setCurrentUser = (user) => {
        dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user));
    }

    const value = {currentUser, setCurrentUser};

    useEffect(() => {
        return onAuthChangeListener((user) => {
            setCurrentUser(user);
        });
    }, []);

    return <UserContext.Provider value={value}>
        {children}
    </UserContext.Provider>
}