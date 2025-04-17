import { Link, useNavigate } from "react-router-dom"
import LabeledInput from "../component/LabeledInput"
import { useState } from "react"
import { signInTypes } from "@sarthak00dev/mediumtypes";
import axios from "axios";
import { BACKEND_URL } from "../main";
import Loading from "../component/ui/Loading";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const SignInType: signInTypes = { email, password }
        setLoading(true);
        try {
            const req = await axios.post(`${BACKEND_URL}/api/v1/user/signin`,
                SignInType
            );

            localStorage.setItem("auth_token", req.data.token);
            navigate("/blogs");
        }
        catch (err) {
            console.log(err);
        }
        setLoading(false);
    }
    return (<>
        {
            loading &&
                <Loading/>
        }

        <div className="w-screen min-h-[80svh] flex flex-col lg:flex-row items-center lg:justify-around">
            <div className="w-full h-[60svh] lg:h-screen lg:w-1/2 xl:w-[30%] flex flex-col justify-end lg:justify-center items-center">
                <div className="font-bold text-4xl font-roboto">Log into your account</div>
                <div className="text-lg text-gray-600">Don't have an account? <Link to="/signup" className="font-normal underline ">Sign Up</Link></div>
                <form onSubmit={onSubmit} className="w-[80%] md:w-1/ lg:w-[80%] text-center font-gothic flex flex-col gap-5">

                    <LabeledInput id="email" label="Email" setValue={setEmail} placeholder="Enter your email id" />
                    <LabeledInput id="password" label="Password" setValue={setPassword} type="password" placeholder="Enter a password" />

                    <button type="submit" className="w-full bg-black text-white font-gothic py-2 rounded-md">Log In</button>
                </form>
            </div>

            <div className="w-[80%] h-[40svh] lg:h-screen lg:w-[40%] xl:ps-6 xl:w-[30%] flex flex-col justify-center gap-4 lg:px-5">
                <div className="text-xl lg:text-3xl font-bold font-gothic">
                    "The customer service I received was
                    exceptional. The support team went above
                    and beyond to address my concerns."
                </div>
                <div className="flex flex-col font-gothic">
                    <div className="font-roboto font-bold">Jules Winnfield</div>
                    <div className="text-gray-400 font-gothic">CEO, Acme lnc</div>
                </div>
            </div>

        </div>
    </>
    )
}

export default Login