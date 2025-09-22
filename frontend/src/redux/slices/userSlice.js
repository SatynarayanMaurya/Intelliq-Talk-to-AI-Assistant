import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    loading:false,
    userDetails :null,
    isLogin:false
}


const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        setLoading:(state,action)=>{
            state.loading = action.payload
        },
        setUserDetails:(state,action)=>{
            state.userDetails = action.payload
        },
        clearUserDetails :(state,action)=>{
            state.userDetails = null
        },
        setIsLogin:(state,action)=>{
            state.isLogin = action.payload
        }
    }
})

export const {setLoading,clearUserDetails,setUserDetails,setIsLogin} = userSlice.actions
export default userSlice.reducer