
import {useState} from 'react';
import Button from '../common/Button';
import googleIcon from '../../assets/google.png'

export default function Login(){
    //check if the user is already logged in --> checks if there's a session or a google token
    const handleGoogleLogin = () => {
        window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/google`
    }

    return (
        <div className="flex flex-col justify-center items-center min-h-screen">
            <div className="border border-charcoal shadow shadow-xl rounded rounded-xl px-32 py-32">
                    <div className="flex flex-col justify- items-center">
                        <h1 className="font-semibold text-3xl">Log in</h1>
                        <div className="flex flex-row justify-center items-center bg-charcoal rounded rounded-3xl px-2 py-1 ">
                        <Button
                        
                            onClick={handleGoogleLogin}
                            label={<div className="flex flex-row gap-1 justify-center items-center "><img className="w-6 h-6 m-0" src={googleIcon} alt="Google Icon"/><p className="text-md">Login with Google</p></div>}
                        />
                        </div>
                        
                    </div>
            </div>
        </div>

    )


}