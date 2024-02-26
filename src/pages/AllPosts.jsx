import { useEffect, useState } from "react";
import { Container,PostCard } from "../components";
import appwriteService from "../appwrite/config"
import { useSelector, useDispatch } from "react-redux";
import { addPostData } from "../store/postSlice";

export default function AllPosts() {

    const dispatch = useDispatch()
    const postdata = useSelector(state => state.post.postData)
    useEffect(() => {
        appwriteService.getPosts([]).then((posts) => {
            if(posts){
                dispatch(addPostData({postData : posts.documents}))
            }
        })
    },[])

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