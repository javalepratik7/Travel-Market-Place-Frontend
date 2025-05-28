import {configureStore} from "@reduxjs/toolkit"
import loginSlice from "./slices/login/index"

export const store=configureStore({
    reducer:{
        auth:loginSlice
    }
})