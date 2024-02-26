import { useEffect, useState } from "react";
import appwriteService from "../appwrite/config"
import { Container, PostCard } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { addPostData } from "../store/postSlice";

export default function Home() {
    const userLoginStatus = useSelector(state => state.auth.status)
    const dispatch = useDispatch()
    const postdata = useSelector(state => state.post.postData)
    useEffect(() => {
        if (userLoginStatus) {
            appwriteService.getPosts().then((posts) => {
                if (posts) {
                    dispatch(addPostData({ postData: posts.documents }))
                }
            })
        }
    }, [])

    if (!userLoginStatus) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-blue-900">
                                Login to read posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='grid grid-cols place-items-start ml-12 sm:place-items-center sm:mx-auto'>
                    {postdata.map((post) => (
                        <div key={post.$id} className="p-2 w-2/4">
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}