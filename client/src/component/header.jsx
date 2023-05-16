import { useContext, useState } from "react";
import { Link, Navigate, useLocation, useParams } from "react-router-dom";
import { UserContext } from "../userContextProvider";
import axios from "axios";

export default function Header({ user }) {
    const { pathname } = useLocation()
    let page = pathname.split("/")[2]





    if (page === undefined) { page = "home" }
    console.log(page)
    function linkFunction(active) {
        let className = "px-4 py-1 text-xl w-48 "
        if (active === page) {
            className += "text-indigo-500 font-bold text-xl"
        }
        else {
            className += "text-indigo-300 font-semibold text-xl hover:text-indigo-300 hover:underline"
        }
        return className
    }
    const [redirect, setRedirect] = useState(false)
    async function logout(ev) {
        ev.preventDefault()
        const response = await axios.get('/api/users/logout')
        if (response) {
            setRedirect(true)
        }


    }
    if (redirect) { return <Navigate to={'/'} /> }
    return (
        <header className="mt-0 border-b-2 bg-gray-100 p-2">
            <div className="flex justify-between px-2">
                <Link className="font-bold text-2xl text-indigo-600"
                    to="/"> CNS</Link>
                <nav className="flex gap-4">
                    <Link className={linkFunction('home')} to="/mainpage">Home</Link>

                    <Link className={linkFunction('about')} to="/mainpage/about">About</Link>

                    <Link className={linkFunction('docs')} to="/mainpage/docs">Doc</Link>
                    {user && (<button className="bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 py-3 rounded-xl px-5 text-white" onClick={logout} >Logout</button>)}
                </nav></div>
        </header>
    )
}

