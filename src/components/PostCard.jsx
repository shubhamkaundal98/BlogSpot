import { Link } from "react-router-dom"
import appwriteService from "../appwrite/config"
import parse from "html-react-parser"

function PostCard({$id,title,featuredImage,content}) {
    return (
        <Link to={`/post/${$id}`}>
            <div className='w-72 h-full sm:w-full sm:h-72 flex flex-col sm:flex-row gap-4 border border-gray-400 sm:hover:w-11/12 hover:border-2 sm:hover:ml-8 transition-all ease-in-out duration-300 shadow-2xl hover:shadow-gray-500'>
                <div className="w-full sm:w-2/4">
                    <img src={appwriteService.getFilePreview(featuredImage)} alt={title}  className='w-full h-72 object-cover' />
                </div>
                <div className="flex flex-col justify-start px-4 py-8 gap-5 hover:text-purple-800 w-full sm:w-2/4">
                    <h2 className='text-xl font-semibold'>{title}</h2>
                    <div className="text-sm">{parse(content)}</div>
                </div>
            </div>
        </Link>
    )
}

export default PostCard