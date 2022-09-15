import React, { createContext, useState } from 'react';

export const Context = createContext()

export default function Provider({ children }) {

    const [id, setId] = useState()
    const [dados, setDados] = useState()

    return (
        <Context.Provider value={{ id, setId, dados, setDados }}>
            {children}
        </Context.Provider>
    )

}