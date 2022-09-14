import React, { createContext, useState } from 'react';

export const Context = createContext()

export default function Provider({ children }) {

    const [id, setId] = useState()

    return (
        <Context.Provider value={{ id, setId }}>
            {children}
        </Context.Provider>
    )

}