import { useCallback, useEffect } from "react";
import {useForm} from 'react-hook-form'
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import appwriteService from '../../appwrite/config'
import {Input,Button,Select,RTE} from "../index"

export default function PostForm({post}) {

    const {register, handleSubmit, watch, setValue, getValues, control} = useForm({
        defaultValues:{
            title: post?.title || "",
            slug: post?.slug || "",
            subtitle: post?.subtitle || "",
            content: post?.content || "",
            status: post?.status || "active"
        }
    })

    const navigate = useNavigate()
    const userData = useSelector(state => state.auth.userData)

    const submit = async (data) => {
        if(post) {
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null

            if(file) {
                await appwriteService.deleteFile(post.featuredImage)
            }

            const updatedPost = await appwriteService.updatePost(post.$id, {
                ...data,
                featuredImage : file ? file.$id : undefined
            })

            if(updatedPost) {
                navigate(`/post/${updatedPost.$id}`)
            }
        } else {
            const file = await appwriteService.uploadFile(data.image[0])

            if(file) {
                const fileId = file.$id
                data.featuredImage = fileId
                const newPost = await appwriteService.createPost({
                    ...data,
                    userId : userData.$id
                })

                if(newPost) {
                    navigate(`/post/${newPost.$id}`)
                }
            }
        }
    }

    const slugTransform = useCallback((value) => {
        if(value && typeof value === "string"){
            return value.trim().toLowerCase().replace(/[^a-zA-Z\d\s]+/g, "-").replace(/\s/g, "-");
        }
        return ""
    },[])

    useEffect(() => {

        const subscription = watch((value, {name}) => {
            if(name === "title") {
                setValue("slug", slugTransform(value.title), {shouldValidate:true})
            }
        })

        return () => subscription.unsubscribe()

    },[watch,slugTransform,setValue])

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                label="Title: "
                placeholder="Title"
                className="mb-4"
                {...register("title",{
                    required:true
                })}
                />
                <Input 
                label="Slug :"
                placeholder="Slug"
                className="mb-4"
                {...register("slug", { required: true })}
                onInput = {(e) => {
                    setValue("slug",slugTransform(e.currentTarget.value),{shouldValidate:true})
                }}
                />
                <Input
                label="Sub-Title: "
                placeholder="Sub-Title"
                className="mb-4"
                {...register("subtitle",{
                    required:true
                })}
                />
                <RTE label="Content" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                label="Featured Image :"
                type="file"
                className="mb-4"
                accept="image/png, image/jpg, image/jpeg, image/gif"
                {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                options={["active","inactive"]}
                label="Status"
                className="mb-4"
                {...register("status", { required: true })}
                />
                <Button type="submit" textColor="text-black" className="w-full border-y">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    )

}