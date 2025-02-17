import { useRef } from "react";
import { Button } from "../Components/ui/Button";
import { Input } from "../Components/ui/Input";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { data, useNavigate } from "react-router-dom";

export function Signup(){
    const usernameRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();
    const navigate = useNavigate();
    async function signupHandler(){
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;

        try{
            const response = await axios.post(`${BACKEND_URL}/api/signup`,{ username , password});
            if(response.status === 200){
                alert(`${response.data.message}, you can now login to your account`)
                // navigate to loginPage
                navigate("/signin");
            } 
            else if(response.status === 403) return alert(`${response.data.message}`);
        }catch(e: any){
            alert(`${e.response?.data?.message}` || "signup failed");
        }
        
    }
        

    return <div className="h-100 w-full flex justify-center items-center">
        <div className="bg-white rounded-md text-black border p-2">
            Create Account for free
            <Input ref={usernameRef} placeholder="username"/>
            <Input ref={passwordRef} placeholder="password "/>
            <div  className="flex justify-center">
                <Button onClick={signupHandler} variant="primary" text="create" italic/>
            </div>
        </div>

    </div>
}