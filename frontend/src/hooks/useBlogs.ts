import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../main";
export interface Blog {
    id: string,
    title: string,
    content: string,
    author: {
        name: string
    },
}

const useBlogs = () => {

    const [loading, setLoading] = useState(false);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    const fetchBlogs = async () => {
        try{
            setLoading(true);
            const token = localStorage.getItem("auth_token");
            if (!token)
            {
                setLoading(false);
                return
            }
            const req = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setBlogs(req.data);
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
        fetchBlogs();
    }, [])


    return {
        loading,
        blogs
    }

}
export default useBlogs