import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'


const Home = () => {

  const { setAuth, auth } = useAuthContext()
  const navigate = useNavigate()

  const handleLogout = () => {
    setAuth({})
    navigate('/login')
  }
  console.log(auth)
  return (
    <section>
            <h1>Home</h1>
            <br />
            <p>You are logged in!</p>
            <br />
            <Link to="/editor">Go to the Editor page</Link>
            <br />
            <Link to="/admin">Go to the Admin page</Link>
            <br />
            <Link to="/lounge">Go to the Lounge</Link>
            <br />
            <Link to="/linkpage">Go to the link page</Link>
            <div className="flexGrow">
                <button onClick={handleLogout}>Sign Out</button>
            </div>
        </section>
  )
}

export default Home