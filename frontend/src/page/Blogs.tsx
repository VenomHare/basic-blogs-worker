import { useEffect } from "react"
import { useNavigate } from "react-router-dom";
import BlogCard from "../component/BlogCard";
import Appbar from "../component/Appbar";
import useBlogs from "../hooks/useBlogs";
import Loading from "../component/ui/Loading";


const Blogs = () => {

    const navigate = useNavigate();
    const {loading, blogs}= useBlogs();

    useEffect(() => {

        const token = localStorage.getItem("auth_token");
        if (!token) {
            navigate("/login");
        }

    })

    if (loading)
    {
        return <><Loading/></>
    }

    return (<>
        <div className="flex flex-col items-center">
            <Appbar />
            <div className="max-w-xl ">
                {
                    blogs.map(blog=>
                        <BlogCard blog={blog}/>)
                }
            </div>
        </div>
    </>
    )
}

export default Blogs