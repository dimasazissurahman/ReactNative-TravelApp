import React, { useState } from 'react';

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    const [tokenKey, setTokenKey] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [isLoading, SetIsLoading] = useState(true);

    return <AppContext.Provider value={{
        tokenKey: tokenKey,
        setTokenKey: setTokenKey,
        errMsg: errMsg,
        setErrMsg: setErrMsg,
        isLoading: isLoading,
        SetIsLoading: SetIsLoading
    }}>
        {children}
    </AppContext.Provider>
}

export { AppContext, AppProvider };