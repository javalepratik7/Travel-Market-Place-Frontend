import {createSlice} from "@reduxjs/toolkit"

export const loginSlice=createSlice({
    initialState:{
        isAuthenticate:false
    },
    name:"auth",
    reducers:{
        logintrue:(state)=>{ return { isAuthenticate: true }},
        logout:(state)=>{ return { isAuthenticate: false } }
    }
})

export const {logintrue,logout}=loginSlice.actions
export default loginSlice.reducer