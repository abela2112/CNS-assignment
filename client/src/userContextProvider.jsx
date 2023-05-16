import axios from "axios"
import { createContext, useEffect, useState } from "react"

export const UserContext = createContext({})


export default function UseContextProvider({ children }) {
    const [user, setUser] = useState(null)
    const [ready, setReady] = useState(false)
    useEffect(() => {

        axios.get('api/users').then(({ data }) => {
            setUser(data.data);
            setReady(true);

        }).catch(err => console.log(err))
    }, [])

    return (
        <UserContext.Provider value={{ user, setUser, ready }}>
            {children}
        </UserContext.Provider>
    )
}