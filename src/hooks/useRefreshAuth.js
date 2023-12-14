import axios from '../api/apiAxios'
import { useAuthContext } from './useAuthContext'


const useRefreshAuth = () => {
    const { setAuth } = useAuthContext()

    const refreshToken = async () => {
            const response = await axios.get('/refresh',{
                withCredentials : true
            })
            setAuth((prev)=>{
                console.log(prev)
                console.log(response.data.accessToken)
                return {
                    ...prev,
                    accessToken : response.data.accessToken
                }
            })
            return response.data.accessToken
    }
    return refreshToken
}

export default useRefreshAuth