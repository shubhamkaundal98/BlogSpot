import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "../appwrite/auth"

export const loginUser = createAsyncThunk('loginUser', async () => {
    const data = await authService.getCurrentUser()
    return data
})

const initialState = {
    status: false,
    userData : null
}

const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers : {
        login : (state,action) => {
            state.status = true
            state.userData = action.payload.userData
        },
        logout : (state) => {
            state.status = false
            state.userData = null
        }
    },
    extraReducers : (builder) => {
        builder.addCase(loginUser.pending, (state,action) => {
            state.status = false;
        });
        builder.addCase(loginUser.fulfilled, (state,action) => {
            state.status = true
            state.userData = action.payload
        });
        builder.addCase(loginUser.rejected, (state, action) => {
            state.status = false;
        });
    }
})

export const {login,logout} = authSlice.actions

export default authSlice.reducer