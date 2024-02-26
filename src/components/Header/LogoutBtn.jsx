import { useDispatch } from "react-redux"
import authService from "../../appwrite/auth"
import { logout } from "../../store/authSlice"
import { removePostData } from "../../store/postSlice"

function LogoutBtn() {

    const dispatch = useDispatch()
    const logoutHandler = () => {

        authService.logout().then(() => {
            dispatch(logout())
            dispatch(removePostData())
        })

    }

    return (
        <button
        className='inline-bock px-6 py-2 duration-200 hover:text-blue-900 hover:underline'
        onClick={logoutHandler}
        >Logout</button>
    )
}

export default LogoutBtn