import React,{useState,useEffect,useRef} from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from './api/apiAxios';
import { useAuthContext } from './hooks/useAuthContext';

const LOGIN_URL = '/auth'

const Login = () => {

    const { setAuth } = useAuthContext() 
    const userRef = useRef()
    const errorRef = useRef()
    const location = useLocation()
    const navigate = useNavigate()

    const from = location.state?.from?.pathname || "/"

    const [user,setUser] = useState('')
    const [pwd,setPwd] = useState('')

    const [errMsg,setErrorMsg] = useState('')

    useEffect(()=>{
        userRef.current.focus()
    },[])

    useEffect(()=>{
        setErrorMsg('')
    },[user,pwd])

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        try{
            const response = await axios.post(LOGIN_URL, JSON.stringify({
                username : user,
                password : pwd
            }),{
                headers : { 'Content-Type' : 'application/json' },
                withCredentials : true
            })

            console.log(JSON.stringify(response?.data))

            const accessToken = response.data.accessToken
            const roles = response.data.roles

            setAuth({
                username : user,
                password : pwd,
                roles,
                accessToken
            })

            setUser('')
            setPwd('')
            navigate(from, {replace : true})
        }catch(err){
            if(!err?.response){
                setErrorMsg("No server respond")
            }else if(err.response?.status === 400){
                setErrorMsg("Missing Username and Passsword")
            }else if(err.response?.status === 401){
                setErrorMsg('UnAuthorized')
            }else{
                setErrorMsg("Login Failed")
            }
        }
    }


  return (

        <section>
            <p ref={errorRef} className={errMsg.length ? "errmsg" : "offscreen"}>{errMsg}</p>
            <h1>Login In</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">User Name : </label>
                <input 
                autoComplete='off' 
                id='username' 
                ref={userRef} 
                required
                type="text" 
                value={user} 
                onChange={(e)=>setUser(e.target.value)} 
                />

                <label htmlFor="password">Password : </label>
                <input 
                id='password' 
                type="password" 
                value={pwd} 
                onChange={(e)=>setPwd(e.target.value)}
                required 
                />
                <button>Sign In</button>
            </form>
            <p>
                Don't have an accout ?
                <Link to='/'>Sign Up</Link>
            </p>
        </section>
        )
    }

export default Login