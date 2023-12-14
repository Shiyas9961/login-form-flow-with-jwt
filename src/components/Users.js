import React, { useEffect, useState } from 'react'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import { useNavigate, useLocation } from 'react-router-dom'


const Users = () => {
    const [users, setUsers] = useState()
    const privateAxios = useAxiosPrivate()
    const navigate = useNavigate()
    const location = useLocation()


    useEffect(() => {
        const controller = new AbortController()
        //const signal = controller.signal
        let isMounted = true;

        const fetchUsers = async () => {
            try{
                const response = await privateAxios.get('/users',{
                   //signal
                })

                console.log(response.data)
                isMounted && setUsers(response.data)
            }catch(err){
                console.error(err)
                navigate('/login', { state: { from: location }, replace: true })
            }

        }
        fetchUsers()

        return () => {
            isMounted = false;
            //controller.abort();
            console.log("willUnmount")
        }
    },[])

  return (
    <article>
        <h1>Users List</h1>
        {
            users?.length ? (
                <ul>
                    {
                        users.map((user, i) => {
                            return (
                            <li key={i}>{user.username}</li>
                            )
                        })
                    }
                </ul>
            ) : (
                <p>Users Not Found !</p>
            )
        }
    </article>
  )
}

export default Users