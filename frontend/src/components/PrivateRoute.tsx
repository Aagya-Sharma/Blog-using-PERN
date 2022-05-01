import useAuthStatus from '../hooks/useAuthStatus'
import {Navigate,Outlet} from 'react-router-dom'

function PrivateRoute (){
    const {isLoggedIn,isCheckingStatus} = useAuthStatus()

    if(isCheckingStatus){
        return <h1>loading...</h1>
    }

    return isLoggedIn ? <Outlet /> : <h1>not allowed</h1>

}
 
export default PrivateRoute