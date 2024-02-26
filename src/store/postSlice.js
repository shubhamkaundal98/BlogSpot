import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    postData : []
}

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers : {
        addPostData : (state,action) => {
            state.postData = action.payload.postData
        },
        removePostData : (state) => {
            state.postData = []
        }
    }
})

export const {addPostData,removePostData} = postSlice.actions

export default postSlice.reducer