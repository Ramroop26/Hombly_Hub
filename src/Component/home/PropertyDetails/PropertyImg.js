import React, { useState } from 'react'
import "../../../CSS/PropertyDetails.css"
import Modal from './Modal';

const PropertyImg = ({ images }) => {
    const [isModalOpen, setIsModelOpen] = useState(false);
    const handleShowAllPhotos = () => {
        setIsModelOpen(true);
    }
    const hadleCloseModel = () => {
        setIsModelOpen(false);
    }
    return (
        <>
            <div className='property-img-container'>
                <div className='img-item first-image'>
                    <img className='images' src={images[0].url} alt="property-1" />
                </div>
                {images.slice(1, 5).map((image, index) => (
                    <div key={index} className='img-item'>
                        <img className='images' src={image.url} alt={`property-${index + 2}`} />
                    </div>
                ))}
            </div>
            <div className='similar-photos-container'>
                <button className='similar-photos' onClick={handleShowAllPhotos}>
                    <span className="material-symbols-outlined">
                        photo_library
                    </span>
                </button>
            </div>
            {isModalOpen && <Modal images={images} onClose={hadleCloseModel}/>}
            
        </>
    )
}

export default PropertyImg