import { Link, useNavigate } from "react-router-dom"
import Button from "./ui/Button"

const Appbar = () => {
    const navigate = useNavigate();

    return (
        <div className="w-screen h-20 border-b flex justify-between items-center px-10 ">
            <Link to="/blogs" className="text-3xl font-bold font-roboto">
                Medium Clone
            </Link>
            <div className="">
                <Button label="New" onClick={()=>navigate('/publish')}/>
                <Button label="Logout" onClick={()=>{
                    localStorage.removeItem("auth_token");
                    navigate("/login");
                }}/>
                {/* <Avatar authorName="Sarthak Kadam" size={10} /> */}
            </div>
        </div>
    )
}

export default Appbar