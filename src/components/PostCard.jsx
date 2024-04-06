import { Link } from "react-router-dom"
import appwriteService from "../appwrite/config"
import parse from "html-react-parser"
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function PostCard({ $id, title, featuredImage, content, likedBy, status }) {
    const [like, setLike] = useState(false)
    const userName = useSelector(state => state.auth.userData.name)
    const [likedUsers, setLikedUsers] = useState([])
    const [postLikeCount, setPostLikeCount] = useState(likedBy.length)
    const [menuOpen, setMenuOpen] = useState(false)

    useEffect(() => {
        if (likedBy && likedBy.includes(userName)) {
            setLike(true);
        }
        setLikedUsers(Object.values(likedBy));
    }, [likedBy, userName]);

    const handleLike = async () => {
        setLike(true)
        setPostLikeCount(postLikeCount + 1)
        const updatedLikedUsers = [...likedUsers, userName]
        setLikedUsers(updatedLikedUsers)
        await appwriteService.updateLikeCount($id, updatedLikedUsers)
    }

    const handleUnlike = async () => {
        setLike(false)
        setPostLikeCount(postLikeCount - 1)
        const updatedLikedUsers = likedUsers.filter(user => user !== userName)
        setLikedUsers(updatedLikedUsers)
        await appwriteService.updateLikeCount($id, updatedLikedUsers)
    }

    const showLikedUsers = () => {
        setMenuOpen(!menuOpen)
    }
    console.log(appwriteService.getFilePreview(featuredImage).href)
    return (
        <div className={`relative card ${menuOpen? 'cardFlip':''}`}>    
            <div className='w-72 h-full sm:w-full sm:h-72 flex flex-col sm:flex-row gap-4 border border-gray-400 front'>
                <div className="w-full sm:w-2/4">
                    <Link to={`/post/${$id}`}><img src={appwriteService.getFilePreview(featuredImage)} alt={title} className='w-full h-72 object-cover' /></Link>
                </div>
                <div className="flex flex-col justify-between px-4 py-8 gap-5 w-full sm:w-2/4">
                    <Link to={`/post/${$id}`}>
                        <div className="flex flex-col gap-2">
                            <div className='text-xl font-semibold hover:text-purple-800'>{title}{status === "inactive" ? <h2 className="text-sm text-red-500">(Inactive post)</h2> : null}</div>
                            <div className="text-sm hover:text-purple-800">{parse(content)}</div>
                        </div>
                    </Link>
                    <div className="flex flex-row items-center gap-2 cursor-pointer">
                        {status === 'active' ? (!like ? <IoMdHeartEmpty onClick={handleLike} /> : <IoMdHeart onClick={handleUnlike} className="text-red-600" />) : null}
                        {postLikeCount > 0 ? <div onClick={showLikedUsers} className="hover:text-purple-800" >{postLikeCount}</div> : null}
                    </div>
                </div>
            </div>

            <div className="w-72 h-full sm:w-full sm:h-72 flex flex-col sm:flex-col gap-4 border border-gray-400 px-4 rounded-lg absolute top-0 back">
                <div className="flex flex-row justify-between w-full pt-4 text-xl font-semibold">
                    <div>Reactions</div>
                    <RxCross2 onClick={showLikedUsers} className="cursor-pointer" />
                </div>
                <div className="border-t border-gray-400"></div>
                <div className="w-full px-4">
                    {likedUsers.map(user => <div key={user} className="my-2" >{user}</div>)}
                </div>
            </div>
        </div>

    )
}

export default PostCard