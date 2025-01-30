import axios from "axios";
import { userAction } from "./user-slice";
// hanlde signup
export const getSignup=(user)=>async(dispatch)=>{
    try{
        dispatch(userAction.getSignupRequest());
        const {data}=await axios.post("/api/v1/rent/user/signup",user);
        dispatch(userAction.getSignupDetails(data.user));
    }
    catch(error){
        dispatch(userAction.getErrors(error.response.data.message))
    }
}   
// 
export const getLogIn=(user)=>async(dispatch)=>{
    try{
        dispatch(userAction.getLoginRequest());
        const {data} =await axios.post("/api/v1/rent/user/login",user)
        dispatch(userAction.getLoginDetails(data.user));
    }
    catch(error){
        dispatch(userAction.getErrors(error.response.data.message))

    }
};
// get current user information
export const currentUser=()=>async(dispatch)=>{
    try{
        dispatch(userAction.getCurrentUserRequest());
        const {data}=await axios.get("/api/v1/rent/user/me");
        dispatch(userAction.getCurrentUser(data.user));
    }catch(error){
        dispatch(userAction.getErrors(error.response.data.message))

    }
};
// to update user information
export const updateUser =(updateUser)=> async(dispatch) =>{
    try{
        dispatch(userAction.getUpdateUserRequest());
        await axios.patch("/api/v1/rent/user/updateMe",updateUser);
        const {data}=await axios.get("/api/v1/rent/user/me")
        dispatch(userAction.getCurrentUser(data.user))
    }
    catch(error){
        dispatch(userAction.getErrors(error.response.data.message))

    }
}
export const forgotPassword=(email)=> async(dispatch)=>{
    try{
        await axios.post("/api/v1/rent/user/forgotPassword",{email})
    }
    catch(error){
        dispatch(userAction.getErrors(error.response.data.message))
    }
}
export const resetPassword=(repassword,token)=>async(dispatch)=>{
    try{
        await axios.patch(`/api/v1/rent/resetPassword${token}`,repassword);
    }
    catch(error){
        dispatch(userAction.getErrors(error.response.data.message))
    }
}
// pasword update
export const updatePassword =(passwords)=> async(dispatch)=>{
    try{
        dispatch(userAction.getPasswordRequest());
        await axios.patch("/api/v1/rent/user/updateMyPassword",passwords);
        dispatch(userAction.getPasswordSuccess(true))
    }
    catch(error){
        dispatch(userAction.getErrors(error.response.data.message))

    }
}
export const Logout=()=>async(dispatch)=>{
    try{
        await axios.get("/api/v1//rent/user/logout");
        dispatch(userAction.getLogout(null))
    }
    catch(error){
        dispatch(userAction.getErrors(error.response.data.message))
    }
}
