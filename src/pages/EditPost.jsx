import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import {Container, PostForm} from "../components"
import appwriteService from "../appwrite/config"

export default function EditPost() {

    const [post,setPost] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if(slug) {
            appwriteService.getPost(slug).then((post) => {
                if(post) {
                    setPost(post)
                }
            })
        } else {
            navigate("/")
        }
    },[])

    return post ? (
        <div className="py-8">
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
    ) : null

}