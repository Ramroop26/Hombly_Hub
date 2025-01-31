
import './App.css';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import Main from './Component/home/Main';
import PropertyList from './Component/home/PropertyList';
import PropertyDetails from './Component/home/PropertyDetails/PropertyDetails';
import {Flip, ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useEffect } from 'react';
import {useDispatch,useSelector } from 'react-redux';
import { currentUser } from './Store/User/user-action';
import { userAction } from './Store/User/user-slice';
import Login from './Component/User/Login';
import Signup from './Component/User/Signup';
import Profile from './Component/User/Profile';
import EditProfile from './Component/User/EditProfile';
import UpdatePassword from './Store/User/UpdatePassword';
import ForgotPassword from './Component/User/ForgotPassword';

import ResetPassword from './Component/User/ResetPassword';
import Payment from './Component/Payment/payment';
import { Elements } from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js'
import MyBookings from './Component/Mybookings/MyBookings';
import BookingDetails from './Component/Mybookings/BookingDetails';
import AccomodationForm from './Component/Accomodation/AccomodationForm';
import Accomodation from './Component/Accomodation/Accomodation';

function App() {
  const stripePromise =loadStripe("pk_test_51OtVWiSHqCHq3FHGyGH2xl2g6MXFeCvMSZIoQLnZg2CqAr9hSOm5ExIriRMLhbY5roqvgEJ6MoKLjdLDQyJ36SaB00TjAroFFF");
  const dispatch=useDispatch();
  const {errors} =useSelector((state)=>
    state.user
  );
  useEffect(()=>{
    if(errors){
      dispatch(userAction.clearError());
    }
    dispatch(currentUser());
  },[errors,dispatch]);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Main/>} id='main' exact>
        <Route id='home' index element={<PropertyList />} exact />
        <Route element={<PropertyDetails />} id='PropertyDetails' path='propertylist/:id' exact />
        <Route id='login' path='login'  element={<Login/>}/>
        <Route id='signup' path='Signup' element={<Signup/>}/>
        <Route id='profile' path="profile" element={<Profile/>} />
        <Route id='editprofile' path='editprofile' element={<EditProfile/>}/>
        <Route id='updatepassword' path='user/updatepassword' element={<UpdatePassword/>}/>
        <Route id='forgotpassword' path='user/forgotpassword' element={<ForgotPassword/>}/>
        <Route id='resetpassword' path="user/resetPassword/:token"element={<ResetPassword/>} />
        <Route id='payment' path='payment/:propertyId' element={
          <Elements stripe={stripePromise}><Payment/></Elements>}/>
        <Route id='mybookings' path='user/booking' element={<MyBookings/>}/>
        <Route id='bookingdetails' path="user/booking/:bookingId" element={<BookingDetails/>} />

        <Route id='accomodation' path="accommodation" element={<Accomodation/>}/>
        <Route id='accomodationform' path='accomodationform' element={<AccomodationForm/>} />

      </Route>

    )
  );
  return (<>
    <div className="App">
      <RouterProvider router={router}/>
      <ToastContainer
      position='bottom-center'
      autoClose={3000}
      draggable={true}
      transition={Flip}
      />
    </div>
  </>
  );
}

export default App;
