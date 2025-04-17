import { useNavigate, useParams } from "react-router-dom";
import useBlog from "../hooks/useBlog";
import { useEffect } from "react";
import Loading from "../component/ui/Loading";
import Appbar from "../component/Appbar";
import Avatar from "../component/ui/Avatar";
import Button from "../component/ui/Button";

const Blog = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { loading, blog, isOwned } = useBlog(id!);

    useEffect(() => {

        const token = localStorage.getItem("auth_token");
        if (!token) {
            navigate("/login");
        }

        if (!id) {
            navigate('/blogs');
            return
        }

    }, [])

    if (loading || !blog) {
        return <><Loading /></>
    }

    return (<>
        <div className="flex flex-col items-center overflow-x-clip">
            <Appbar />
            <div className="w-screen flex flex-col lg:flex-row justify-evenly">
                <div className="max-w-[50svw] flex flex-col gap-2">
                    <div className="text-5xl font-bold font-roboto my-5">{blog?.title}</div>
                    <div className="font-roboto text-lg text-gray-500">Posted on {"14th Feb, 2025"}</div>

                    <div className="text-md font-gothic text-gray-800">
                        {blog.content}
                    </div>
                </div>
                <div className="flex flex-col gap-2 lg:w-[30svw] sticky top-[10svh]">
                    <div className="text-md text-gray-600 mt-[10svh]">Author</div>
                    <div className="flex gap-2">
                        <Avatar size={10} authorName={blog.author.name || "Anonymous"} />
                        <div className="text-xl font-bold">
                            {blog.author.name || "Anonymous"}
                        </div>
                    </div>
                    {
                        isOwned &&
                            <Button label="Edit" onClick={() => navigate(`/blog/${blog.id}/edit`)} />
                    }
                </div>
            </div>
        </div>
    </>
    )
}

export default Blog