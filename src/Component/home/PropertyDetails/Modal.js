import { useEffect } from "react"
import React from 'react'
import propTypes from "prop-types"
import "../../../CSS/Modal.css"
import "../../../CSS/PropertyDetails.css"

const Modal = ({images,onClose}) => {
useEffect(()=>{
    document.body.style.overflow="hidden";
    return()=>{
        document.body.style.overflow="visible";
    };
},[]);
    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>
                    <span>&times;</span>
                </button>
                <div className="modal-image-container">
                    {images.map((image,index)=>(
                        <img key={index} src={image.url} alt={`Image ${index+1}`}/>
                    ))}
                </div>
            </div>
        </div>
    )
    

};
Modal.prototype={
    images:propTypes.array.isRequired,
    onClose:propTypes.func.isRequired,
}

export default Modal