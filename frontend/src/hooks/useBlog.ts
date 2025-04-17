import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../main";
import { Blog } from "./useBlogs";

const useBlog = (id: string) => {

    const [loading, setLoading] = useState(false);
    const [blog, setBlog] = useState<Blog>();
    const [isOwned, setIsOwned] = useState(false);

    const fetchBlog = async () => {
        try{
            setLoading(true);
            const token = localStorage.getItem("auth_token");
            if (!token)
            {
                setLoading(false);
                return
            }
            const req = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setBlog(req.data.post);
            setIsOwned(req.data.isOwned);
        }
        catch(err)
        {
            console.log(err);
        }
        finally{
            setLoading(false);
        }
        
    }
    useEffect(() => {
        fetchBlog();
    }, [])


    return {
        loading,
        blog,
        isOwned
    }

}
export default useBlog