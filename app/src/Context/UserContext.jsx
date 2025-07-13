import { createContext, useEffect, useState } from 'react'
export let userContext = createContext(0)


export default function UserContextProvider(props) {
    let [isLoged, setisLoged] = useState(null)
    let [ispass, setispass] = useState(null)

    useEffect(() => {
        if (localStorage.getItem('userToken') !== null) {
            const token = localStorage.getItem('userToken');
            setisLoged(token);
        }

    }, []);
    return <userContext.Provider value={{ isLoged, setisLoged, setispass, ispass }}>
        {props.children}
    </userContext.Provider>

}
