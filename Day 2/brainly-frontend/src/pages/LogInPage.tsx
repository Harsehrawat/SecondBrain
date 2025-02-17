import { useRef } from "react";
import { Button } from "../Components/ui/Button";
import { Input } from "../Components/ui/Input";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export function LogIn(){
    const usernameRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();
    const navigate = useNavigate();
    
    async function LogInHandler(){
        try{
            const username = usernameRef.current?.value;
            const password = passwordRef.current?.value;
            // axios req. to signup Backend
            const response = await axios.post(`${BACKEND_URL}/api/signin` , { username , password});

            if(response.status === 403){
                alert(`Login Failed : ${response.data.message}`);
            }
            else if(response.status === 200){
                // store token in localStorage and navigate to dashboard fn
                alert(`${response.data.message}`);
                localStorage.setItem("token",response.data.token);
                navigate("/dashboard");
            }   
        }catch(e: any){
            console.log(e);
            alert(`${e.response?.data?.message}`);
        }                
        
    }
    return <div className="h-100 w-full flex justify-center items-center">
        <div className="bg-white rounded-md text-black border p-2">
            <Input ref={usernameRef} placeholder="username"/>
            <Input ref={passwordRef} placeholder="password"/>
            <div className="flex justify-center">
                <Button onClick={LogInHandler} variant="primary" text="log in" italic/>
            </div>
        </div>

    </div>
}