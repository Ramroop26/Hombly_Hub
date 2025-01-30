import React,{useState} from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate,useParams } from 'react-router-dom';
import { resetPassword } from '../../Store/User/user-action';
import {toast} from "react-toastify";

const ResetPassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {token} = useParams();
    const [password, setPassword] = useState("");
    const [Confirmpassword, setConfirmPassword] = useState("");
    const submitHandler = (e)=>{
        e.preventDefault();
        if(password !== Confirmpassword){
            return toast.error("Password Does not matched");
        }
        dispatch(resetPassword({password,Confirmpassword},token));
        toast.success("Password has been changed Successfully");
        navigate("/login");
    };
  return (<>
  <div className="row wrapper">
    <div className='col-10 col-lg-5'>
        <form className='shadow-lg' onSubmit={submitHandler}>
             <h1 className="passord_title">New Password</h1>
             <div className="form-group">
              <label htmlFor='password_field'>Password</label>
              <input 
              type='password'
              id='password_field'
              className='form-control'
              value={password}
              onChange={(e)=> setPassword(e.target.value)}
              />
             </div>
             <div className="form-group">
              <label htmlFor='confirm_password_field'>Confirm Password </label>
              <input 
              type='password'
              id='confirm_password_field'
              className='form-control'
              value={Confirmpassword}
              onChange={(e)=> setConfirmPassword(e.target.value)}
              />
             </div>
             <button id='new_password_button'
             type='submit'
             className='btn-block py-3 password-btn'>
                Set Password
             </button>
        </form>
    </div>
    </div>
    </>
    );
};
export default ResetPassword;