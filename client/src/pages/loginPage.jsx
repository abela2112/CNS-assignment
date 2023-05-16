import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../userContextProvider";
import useFetch from "../hooks/useFetch";
import { ErrorBoundary, useErrorBoundary } from "react-error-boundary";
import LoginError from "../error/loginError";


// https://developers.google.com/identity/gsi/web/reference/js-reference

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [redirect, setRedirect] = useState(false)
  const [loginerror, setLoginerror] = useState([])
  const { showBoundary } = useErrorBoundary()
  const { user, setUser } = useContext(UserContext)


  const { handleGoogle, loading, error, redirectWithGoogle } = useFetch(
    `/api/v1/auth/google`
  );

  useEffect(() => {
    /* global google */
    if (window.google) {
      google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        callback: handleGoogle,
      });

      google.accounts.id.renderButton(document.getElementById("loginDiv"), {
        //type: "standard",
        theme: "filled_blue",
        size: "large",
        text: "signin_with",
        shape: "rectangular",
      });

      // google.accounts.id.prompt()
    }
  }, [handleGoogle]);

  const removeError = (id) => {
    setLoginerror([...loginerror.filter((error) => error.id !== id)])
  }
  async function login(ev) {
    ev.preventDefault()
    try {
      const { data } = await axios.post('/api/auth/login', { email, password })
      if (data) {
        console.log(data)
        setUser(data.data)
        setRedirect(true)
      }
    } catch (error) {
      let random = Math.random(1000).toString(36).substring(10)
      console.error(error.response.data.message)
      setLoginerror([
        ...loginerror, {
          message: error.response.data.message,
          id: random,
          time: Date.now()
        }
      ])

    }
  }

  if (redirect || redirectWithGoogle) return <Navigate to='/mainPage' />
  return (

    <section className="flex flex-col md:flex-row h-screen items-center">

      <div className="bg-indigo-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
        <img src="http://127.0.0.1:4000/photo/istockphoto-1356115619-170667a.jpg" className="w-full h-full object-cover" />
      </div>

      <div className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto  md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
      flex items-center justify-center">

        <div className="w-full h-100">


          <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12">Log in to your account</h1>

          <form className="mt-6" onSubmit={login}>
            <div>
              <label className="block text-gray-700">Email Address</label>
              <input type="email" value={email} onChange={ev => setEmail(ev.target.value)} placeholder="Enter Email Address" className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none" autoFocus required />
            </div>

            <div className="mt-4">
              <label className="block text-gray-700">Password</label>
              <input type="password" value={password} onChange={(ev) => setPassword(ev.target.value)} placeholder="Enter Password" minLength="6" className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
              focus:bg-white focus:outline-none" required />
            </div>

            <div className="text-right mt-2">
              <a href="#" className="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700">Forgot Password?</a>
            </div>

            <button type="submit" className="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg
            px-4 py-3 mt-6">Log In</button>
          </form>

          <hr className="my-6 border-gray-300 w-full" />
          {/* <button onClick={() => loginWithGoogle()} type="button" className="w-full block bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold rounded-lg px-4 py-3 border border-gray-300">
            <div className="flex items-center justify-center">

              <span className="ml-4">
                Log in
                with
                Google</span>
            </div>
          </button> */}

          {error && <p>{error}</p>}
          {loading ? <div>Loading....</div> : <div id="loginDiv"></div>}
          {
            loginerror && loginerror.map((error) => (
              <div key={error.id} className='w-full bg-red-300 flex justify-center items-center mt-2 border rounded-sm'>
                <div className="flex justify-between p-2">
                  <div>
                    <h1 className='text-xl text-red-500'>{error.message}</h1></div>
                  <div>
                    <button className="text-red-500" onClick={() => removeError(error.id)}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    </button>
                  </div>
                </div>
              </div>
            )

            )
          }




          <p className="mt-8">Need an account? <Link to={'/register'} className="text-blue-500 hover:text-blue-700 font-semibold">Create an
            account</Link></p>


        </div>
      </div>

    </section>


  );
}