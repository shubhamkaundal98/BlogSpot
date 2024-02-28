import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { Container, Button } from "../components"
import appwriteService from "../appwrite/config"
import { useSelector } from "react-redux"
import parse from "html-react-parser"

export default function Post() {

    const [post, setPost] = useState(null)
    const [menuOpen, setMenuOpen] = useState(false);
    const { slug } = useParams()
    const navigate = useNavigate()

    const userData = useSelector(state => state.auth.userData)

    const isAuthor = post && userData ? post.userId === userData.$id : false

    useEffect(() => {

        if (slug) {
            appwriteService.getPost(slug).then(post => {
                if (post) {
                    setPost(post)
                } else {
                    navigate("/")
                }
            })
        } else {
            navigate("/")
        }

    }, [slug, navigate])

    const deletePost = () => {
        const isConfirmed = window.confirm("Are you sure you want to delete this post?");
        if (isConfirmed) {
            appwriteService.deletePost(post.$id).then((status) => {
                if (status) {
                    appwriteService.deleteFile(post.featuredImage)
                    navigate("/")
                }
            })
        }
    }

    const handleToggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex flex-col items-center justify-center">
                    <div className="w-full sm:w-2/3 my-2 mx-4 px-10 sm:px-20 py-8 border border-black">
                        <div className="w-full mb-6 flex justify-evenly">
                            <h1 className="text-2xl text-center font-bold w-2/3">{post.title}</h1>
                            {isAuthor && (
                                <div className="relative">
                                    <div>
                                        <button
                                            type="button"
                                            className=" text-gray-400 hover:text-gray-600"
                                            onClick={handleToggleMenu}
                                        >
                                            <span className="flex flex-row text-2xl text-black">&#10247;</span>
                                        </button>
                                    </div>
                                    {menuOpen && (
                                        <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                            <div className="py-1">
                                                <Link to={`/edit-post/${post.$id}`}>
                                                    <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                                                        Edit
                                                    </button>
                                                </Link>
                                                <button onClick={deletePost} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                        </div>
                        <div className="flex flex-col gap-4">
                            <div>
                                <h1 className="text-xl font-medium">{post.subtitle}</h1>
                            </div>
                            <div>
                                <img
                                    src={appwriteService.getFilePreview(post.featuredImage)}
                                    alt={post.title}
                                />

                            </div>
                            <div className="browser-css">
                                {parse(post.content)}
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    ) : null

}