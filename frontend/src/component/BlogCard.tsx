import { Link } from "react-router-dom"
import { Blog } from "../hooks/useBlogs"
import Avatar from "./ui/Avatar"

interface Props {
    blog: Blog
}


const BlogCard = ({
    blog
}: Props) => {
    return (
        <Link to={`/blog/${blog.id}`}>
            <div className="border-b shadow border-slate-500 p-2 pb-4 cursor-pointer">

                <div className="flex gap-1 items-center my-2 px-1">
                    <div className="flex flex-col justify-center">
                        <Avatar authorName={blog.author.name} />
                    </div>
                    <div className="font-extralight text-sm">{blog.author.name}</div>
                    <div className="text-[5px] text-slate-700">&#9679;</div>
                    <div className="font-light text-slate-400 text-sm">{"14th Feb, 2025"}</div>
                </div>
                <div className="text-xl font-semibold">{blog.title}</div>
                <div className="text-md font-thin">
                    {
                        blog.content.length > 100 ?
                            <>
                                {blog.content.slice(0, 100)}...
                            </>
                            : <>{blog.content}</>
                    }
                </div>
                <div className="text-slate-500 text-sm font-thin mt-2">
                    {Math.ceil(blog.content.split(" ").length / 240)} minute(s) read
                </div>
            </div>
        </Link>
    )
}



export default BlogCard