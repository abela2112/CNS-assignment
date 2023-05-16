import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [redirect, setRedirect] = useState(false)

  async function register(ev) {
    ev.preventDefault()
    const response = await axios.post('/api/auth/register', { email, password, name })
    if (response) {
      setRedirect(true)
    }


  }
  if (redirect) return <Navigate to='/' />
  return (

    <section className="flex flex-col md:flex-row h-screen items-center">

      <div className="bg-indigo-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
        <img src="http://127.0.0.1:4000/photo/istockphoto-1356115619-170667a.jpg" className="w-full h-full aspect-square object-cover" />
      </div>

      <div className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto  md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
      flex items-center justify-center">

        <div className="w-full h-100">

          <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12">create new account</h1>

          <form className="mt-4" onSubmit={register}>
            <div>
              <label className="block text-gray-700">Full name</label>
              <input type="text" value={name} onChange={ev => setName(ev.target.value)} placeholder="Enter your fullname" className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none" autoFocus required />
            </div>
            <div>
              <label className="block text-gray-700">Email Address</label>
              <input type="email" value={email} onChange={ev => setEmail(ev.target.value)} placeholder="Enter Email Address" className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none" autoFocus required />
            </div>
            <div className="mt-2">
              <label className="block text-gray-700">Password</label>
              <input type="password" value={password} onChange={(ev) => setPassword(ev.target.value)} placeholder="Enter Password" minLength="6" className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
              focus:bg-white focus:outline-none" required />
            </div>

            <div className="text-right mt-2">
              <a href="#" className="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700">Forgot Password?</a>
            </div>

            <button type="submit" className="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg
            px-4 py-3 mt-6">Register</button>
          </form>

          <hr className="my-6 border-gray-300 w-full" />

          <a href='' className="w-full block bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold rounded-lg px-4 py-3 border border-gray-300">

            <span className="ml-4">
              continue
              with
              Google</span>

          </a>

          <p className="mt-8">Need an account? <Link to={'/'} className="text-blue-500 hover:text-blue-700 font-semibold">login in here</Link></p>


        </div>
      </div>

    </section>


  );
}