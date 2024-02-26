import { useEffect, useState } from "react";
import { Container,PostCard } from "../components";
import appwriteService from "../appwrite/config"
import { Query } from "appwrite";
import { useSelector, useDispatch } from "react-redux";
import { addPostData } from "../store/postSlice";


export default function MyPosts() {

    const userData = useSelector(state => state.auth.userData)
    const dispatch = useDispatch()
    const postdata = useSelector(state => state.post.postData)
    
    useEffect(() => {
        if(userData) {
            const userDataId = userData.$id
            appwriteService.getPosts([Query.equal("userId",userDataId)]).then((posts) => {
                if(posts){
                    dispatch(addPostData({postData : posts.documents}))
                }
            })
        }
    },[])

    if(postdata.length === 0){
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-blue-900">
                                You didn&apos;t published a blog yet
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    return (
        <div className="w-full py-8">
            <Container>
                <div className="grid grid-cols-1 mx-10 sm:grid-cols-2">
                    {postdata.map(post => (
                        <div key={post.$id} className='p-2 w-11/12'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}