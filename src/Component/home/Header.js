import React from 'react'
import Search from './Search'
import Filter from './Filter'
import { Link ,useNavigate} from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { propertyAction } from '../../Store/Property/property-slice'
import { getAllProperties } from '../../Store/Property/property-action'
import { Logout } from '../../Store/User/user-action'
import {toast} from "react-toastify";
const Header = () => {
  const dispatch = useDispatch();
  const {isAuthenticated,user}=useSelector((state)=>state.user);
  const navigate=useNavigate();
  const logout=()=>{
    dispatch(Logout());
    toast.success("user has been logged out successfully");
    navigate("/");
  }

  const allProperties = () => {
    dispatch(propertyAction.updateSearchParams({}))
    dispatch(getAllProperties());
  }
  return (
    <>
      <nav className='header row sticky-top '>
        <Link to="/">
          <img src="/assets/logo.png" onClick={allProperties} alt='logo' className='logo'></img>
        </Link>
        <div className='search_filter'>
          <Search />
          <Filter />
            <span className="material-symbols-outlined c_ptr" onClick={allProperties} >
              restart_alt
            </span>
            <span className="resetLogo">Reset Filter</span>
          
        </div>



        {!isAuthenticated && !user && (
          <Link to="/login">
            <span className="material-symbols-outlined web_logo c_ptr">
              account_circle
            </span>
          </Link>
        )}
        {isAuthenticated && user && (
          <div className='dropdown'>
            <span className="material-symbols-outlined web_logo dropdown-toggle" href="#" role="button" id='dropdownMenuLink' data-bs-toggle="dropdown" aria-expanded="false">
            {user.avatar.url && (
              <img src={user.avatar.url} className='user-img' alt='icon'/>
            )}
            {
              !user.avatar.url==="" && "acount_circle"
            }
            </span>
            <ul className='dropdown-menu' aria-labelledby='dropdownMenuLink'>
              <li>
                <Link className='dropdown-item' to="/profile">
                  My Account
                </Link>
              </li>
              <li>
                <button className='dropdown-item' type='button' onClick={logout}>Logout</button>
              </li>
            </ul>

          </div>
        )}
      </nav>

    </>
  )
}

export default Header
