import React, { useEffect, useRef, useState } from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faCheck, faInfoCircle, faTimes } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import axios from './api/apiAxios'

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/register'


const Register = () => {
    const userRef = useRef()
    const errRef = useRef()

    const [user,setUser] = useState('')
    const [validName,setValidName] = useState(false)
    const [userFocus,setUserFocus] = useState(false)

    const [pwd,setPwd] = useState('')
    const [validPwd,setValidPwd] = useState(false)
    const [pwdFocus,setPwdFocus] = useState(false)

    const [matchPwd,setMatchPwd] = useState('')
    const [validMatch,setValidMatch] = useState(false)
    const [matchFocus,setMatchFocus] = useState(false)

    const [errMsg,setErrorMsg] = useState('')
    const [isSuccess,setIsSuccess] = useState(false)

    
    useEffect(() => {
      userRef.current.focus();
  }, [])

  useEffect(() => {
      const result = USER_REGEX.test(user);
      setValidName(result)
  }, [user])

  useEffect(() => {
      setValidPwd(PWD_REGEX.test(pwd));
      setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd])

  useEffect(() => {
      setErrorMsg('');
  }, [user, pwd, matchPwd])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const v1 = USER_REGEX.test(user) 
    const v2 = PWD_REGEX.test(pwd)

    if(!v1 || !v2){
      setErrorMsg("Invalid Submition")
      return
    }
    try{
      const response = await axios.post(REGISTER_URL,JSON.stringify({
        username : user,
        password : pwd
      }),{
        headers : { 'Content-Type' : 'application/json' },
        withCredentials : true
      })
      console.log(response.data)
      console.log(response.accessToken)
      console.log(JSON.stringify(response))

      setIsSuccess(true)
      setUser('')
      setPwd('')
      setMatchPwd('')
    }catch(err){
      if(!err?.response){
        setErrorMsg("No server response")
      }else if(err.response?.status === 409){
        setErrorMsg("Username Taken")
      }else{
        setErrorMsg("Login failed")
      }
    }
  
  }

  return (
    <>
      {
        isSuccess ? (
          <section>
            <p>SuccessFully Signed Up</p>
            <a href="/login">Go to Sign In</a>
          </section>
        ) : (
          <section>
            <p 
            ref={errRef} 
            className={errMsg.length ? "errmsg" : "offscreen"} 
            aria-live='assertive'
            >{errMsg}</p>

            <h1>User Registration</h1>
            <form 
            onSubmit={handleSubmit}>
              {/* Username */}
              <label htmlFor="username">
                User Name :
                <span className={validName ? "valid" : "hide"}>
                  <FontAwesomeIcon icon={faCheck}/>
                </span>
                <span className={validName || !user ? "hide" : "invalid"}>
                  <FontAwesomeIcon icon={faTimes}/>
                </span>
              </label>

              <input 
              value={user} 
              type="text" 
              id='username' 
              ref={userRef} 
              autoComplete='off' 
              onChange={(e)=>setUser(e.target.value)} 
              aria-invalid={validName ? "false" : "true"} 
              aria-describedby='uidnote' 
              onFocus={()=>setUserFocus(true)} 
              onBlur={()=>setUserFocus(false)}
              />

              <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
              <FontAwesomeIcon icon={faInfoCircle} />4 to 24 characters.<br />Must begin with a letter.<br />Letters, numbers, underscores, hyphens allowed.</p>

              {/* Password */}
              <label htmlFor="password">
                Password : 
                <span className={validPwd ? "valid" : "hide"}>
                  <FontAwesomeIcon icon={faCheck}/>
                </span>
                <span className={validPwd || !pwd ? "hide" : "invalid"}>
                  <FontAwesomeIcon icon={faTimes}/>
                </span>
              </label>

              <input 
              value={pwd} 
              type="password" 
              id='password' 
              onChange={(e)=>setPwd(e.target.value)} 
              onFocus={()=>setPwdFocus(true)} 
              onBlur={()=>setPwdFocus(false)} aria-invalid={validName ? "false" : "true"} 
              aria-describedby='pwdnote' 
              />

              <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                  <FontAwesomeIcon icon={faInfoCircle} />
                  8 to 24 characters.<br />
                  Must include uppercase and lowercase letters, a number and a special character.<br />
                  Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
              </p>

              {/* Confirm Password */}
              <label htmlFor="confirmpwd">
                Confirm Password : 
                <span className={validMatch && matchPwd ? "valid" : "hide"}>
                  <FontAwesomeIcon icon={faCheck}/>
                </span>
                <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
                  <FontAwesomeIcon icon={faTimes}/>
                </span>
              </label>

              <input 
              value={matchPwd} 
              id='confirmpwd' 
              type="password" 
              onChange={(e)=>setMatchPwd(e.target.value)} 
              aria-invalid={validMatch ? "false" : "true"} 
              aria-describedby='confirmnote' 
              onFocus={()=>setMatchFocus(true)} 
              onBlur={()=>setMatchFocus(false)}
              />

              <p id='confirmnote' className={matchFocus && !validMatch ? 'instructions' : 'offscreen'}>
                <FontAwesomeIcon icon={faInfoCircle} />
                Must match the first password input field.
              </p>

              <button disabled={!validName || !validPwd || !validMatch ? true : false}>Sign Up</button>

            </form>

            <p>
              Already registered ?<br/>
              <span className='line'>
                <Link to="/login">Sign In</Link>
              </span>
            </p>
          </section>
      )
      }
    </>
  )
}

export default Register