import useGlobalReducer from "../hooks/useGlobalReducer";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { login } from "../fetch";

export const Login = () => {
    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleClick = () => {
        //Create a fetch to attemp to retrieve an access_token
        login(email, password, dispatch)
    }

    useEffect(() => {
        if(store.isLoginSuccessful){
            navigate('/private')
        }
    }, [store.isLoginSuccessful])

    return (
        <>
         <div className="text-center mt-5">
            {
                //create a ternary for the following:
                //check the store for a valid token
                //if there is a token, welcome the user
                //otherwise, direct the user to login
                (store.token && store.token !== undefined && store.token !== "")
                    ?
                    <>
                        <h1>Hello! You are logged in!</h1>
                    </>
                    :
                    <>
                        <h1>Loggin</h1>
                        <div className="">
                            <input
                                type='text'
                                placeholder='email'
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                />
                        </div>
                        <div className="">
                            <input
                                type='password'
                                placeholder='password'
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                />
                        </div>
                        <div className="div">
                            <button
                                onClick={handleClick}
                            >Login</button>
                        </div>
                    </>
            }
         </div>
        </>
    );
}