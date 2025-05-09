
import {useState} from 'react';
import Button from '../common/Button';
import googleIcon from '../../assets/google.png'
import croissantImage from '../../assets/croissant.png'

export default function Login(){
    //check if the user is already logged in --> checks if there's a session or a google token
    const handleGoogleLogin = () => {
        window.location.href = `${import.meta.env.VITE_BACKEND_URL}/api/auth/google`
    }

    return (
        <div className="flex flex-col pt-20 items-center min-h-screen">
                <div className="flex flex-col justify-center items-center gap-12 ">
                    <div >
                        <h1 className="font-serif text-3xl  text-shadow-sm">What cafes will you discover today?</h1>
                    </div>
                    <div className="bg-white rounded rounded-3xl border border-charcoal shadow">
                        <img src={croissantImage} className="h-72 w-72"></img>
                    </div>
                       
                        <Button
                            onClick={handleGoogleLogin}
                            type="loginGoogle"
                            label="Log in with Google"
                        />
            </div>

                    
        </div>

    )


}