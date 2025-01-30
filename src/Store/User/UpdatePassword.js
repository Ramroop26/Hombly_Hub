import React,{useEffect,useState} from 'react'
import {toast} from "react-toastify"
import { useDispatch,useSelector } from 'react-redux'
import {useNavigate} from "react-router-dom"
import { userAction } from './user-slice'
import { updatePassword } from './user-action'

const UpdatePassword = () => {
    const dispatch=useDispatch();
    const navigate= useNavigate();
    const [Confirmpassword, setConfirmPassword]=useState("");
    const [Currentpassword, setCurrentPassword]=useState("");
    const [password, setPassword]=useState("");
    const {errors,success}=useSelector((state)=>state.user);
    const submitHandler=(e)=>{
        e.preventDefault();
        if(password !== Confirmpassword){
            toast.error("password does not match");
            return false;
        }
        else{
            dispatch(updatePassword({Confirmpassword, password, Currentpassword}));
        }
    }
    useEffect(()=>{
        if(errors){
            toast.error(errors);
            dispatch(userAction.clearError());
        }
        else if(success){
            toast.success("Password has been updated")
            navigate("/profile");
            dispatch(userAction.getPasswordSuccess(false));
        }
    },[errors,dispatch,navigate , success])
return (
    <>
    <div className="row wrapper">
        <form onSubmit={submitHandler}>
            <h1 className='password_tittle'>Upadate Password</h1>
            <div className='form_group'>
                <label htmlFor='new_current_password_field'>
                New Current  Password
                </label>
                <input type='password'  id='new_current_password_field' className='form-control' value={Currentpassword} onChange={(e) => setCurrentPassword(e.target.value)} />
            </div>
            <div className='form_group'>
                <label htmlFor='new_password_field'>
                    New Password
                </label>
                <input type='password'  id='new_password_field' className='form-control' value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className='form_group'>
                <label htmlFor='new_confirm_password_field'>
                    New Confirm Password 
                </label>
                <input type='password' id='new_confirm_password_field' className='form-control' value={Confirmpassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>
            <button type='submit' className='btn-block mt-3 py-3 password-btn'>
                Update Password
            </button>
        </form>
    </div>
    </>
)
}

export default UpdatePassword