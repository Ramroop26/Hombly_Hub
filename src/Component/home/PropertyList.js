import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { getAllProperties } from '../../Store/Property/property-action';
import { propertyAction } from '../../Store/Property/property-slice';
import { Link } from 'react-router-dom';
const Card = ({id, image, address, price, name }) => {
    return (
        <figure className='property'>
            <Link to={`/propertylist/${id}`}>

                <img src={image} alt='Propertyimg' />
            </Link>
            <h4>{name}</h4>
            <figcaption>
                <main className='propertydetails'>
                    <h5>{name}</h5>
                    <h6>
                        <span className="material-symbols-outlined houseicon">
                            home_pin
                        </span>
                        {address}
                    </h6>
                    <p>
                        <span className="material-symbols-outlined">
                            currency_rupee
                            <span className="price">
                                {price}
                            </span>
                        </span>
                        / night
                    </p>
                </main>
            </figcaption>
        </figure>

    )
};
const PropertyList = () => {
    const [currentPage, setCurrentPage] = useState({ page: 1 })
    const { properties, totalProperties } = useSelector(
        (state) => state.properties
    );
    const lastpage = Math.ceil(totalProperties / 12);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchPropeties = async (page) => {
            dispatch(propertyAction.updateSearchParams(page));
            dispatch(getAllProperties());
        };
        fetchPropeties(currentPage);
    }, [currentPage, dispatch]);

    return (<>
        {properties.length === 0 ? (
            <p className='not_found'>"Property is not found"</p>
        ) : (
            <div className='propertylist'>
                {properties.map((property) => (<Card
                    key={property._id}
                    id={property._id}
                    image={property.images[0].url}
                    name={property.propertyName}
                    address={`${property.address.city},${property.address.state},${property.address.pincode}`}
                    price={property.price}
                />))}
            </div>
        )}

        {/* Pagination Control */}
        <div className='pagination'>
            <button className='previous_btn' onClick={() =>setCurrentPage((prev)=> ({
                page: prev.page - 1
            }))} 
            disabled={currentPage.page === 1}>
                <span className="material-symbols-outlined">
                    arrow_back_ios_new
                </span>
            </button>
            {/* Next button */}
            <button className='previous_btn' onClick={() =>setCurrentPage((prev)=> ({
                page: prev.page + 1
            }))} 
            disabled={properties.length<12 || currentPage === lastpage}>
                <span className="material-symbols-outlined">
arrow_forward_ios
</span>
            </button>

        </div>
    </>
    )
}

export default PropertyList