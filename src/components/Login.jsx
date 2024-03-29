import { useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { Link,useNavigate } from "react-router-dom"
import authService from "../appwrite/auth"
import { loginUser } from "../store/authSlice"
import {Input, Button, Logo} from "./index"

function Login() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState("")

    const login = async(data) => {
        setError("")
        try {
            const session = await authService.login(data)

            if(session){
                dispatch(loginUser())
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className='flex items-center justify-center w-full'>
            <div className="mx-auto w-full max-w-lg bg-slate-50 p-10 border border-black">
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                <form onSubmit={handleSubmit(login)} className="mt-8">
                    <div className='space-y-5'>
                        <Input 
                        label="Email: "
                        placeholder="Enter your email"
                        type="email"
                        {...register("email",{
                            required: true,
                            validate: {
                                matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Email address must be a valid address",
                            }
                        })}
                        />
                        <Input 
                        label="Password: "
                        placeholder="Enter your password"
                        type="password"
                        {...register("password",{
                            required:true,
                        })}
                        />
                        <Button type="submit" textColor="text-black" bgColor="bg-white" className="w-full border-y">Sign in</Button>
                    </div>
                </form>
            </div>
        </div>
    )

}

export default Login