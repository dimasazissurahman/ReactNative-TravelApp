import React, { useState } from 'react';

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    const [tokenKey, setTokenKey] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [role, setRole] = useState("Tourist");

    return <AppContext.Provider value={{
        tokenKey: tokenKey,
        setTokenKey: setTokenKey,
        errMsg: errMsg,
        setErrMsg: setErrMsg,
        isLoading: isLoading,
        setIsLoading: setIsLoading,
        role: role,
        setRole: setRole
    }}>
        {children}
    </AppContext.Provider>
}

export { AppContext, AppProvider };