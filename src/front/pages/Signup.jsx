import useGlobalReducer from "../hooks/useGlobalReducer";
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { signOut } from "../fetch";


export const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { store, dispatch } = useGlobalReducer();

    const handleClick = () => {
        signOut(email, password, dispatch);

    }

    useEffect(() => {
        if(store.isSignUpSuccessful){
            navigate('/login')
        }
    }, [store.isSignUpSuccessful])

    return (
        <>
        <div className="div">
            <div className="div">
                <h1>Sign Up here</h1>
            </div>
            <div className="">
                <input 
                    type='email'
                    placeholder='Enter email'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required                
                />
                <input 
                    type='password'
                    placeholder='Enter password'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    />
            </div>
            <div className="">
                <button
                    onClick={handleClick}
                >
                    Sign Up
                </button>
            </div>
        </div>
        </>
    )
}