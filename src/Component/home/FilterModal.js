import React,{useEffect,useState} from 'react'
import PropTypes from 'prop-types' // for using of type checking
import "../../CSS/FilterModal.css"
import "react-input-range/lib/css/index.css";
import InputRage from "react-input-range"
import Filter from './Filter';
function FilterModal({selectedFilters,onFilterChange,onClose}) {
    const [priceRange,setPriceRange]=useState({
        min: selectedFilters.priceRange?.min || 600,
        max: selectedFilters.priceRange?.max || 3000
    });
    const [propertyType, setPropertyType]=useState(
        selectedFilters.propertyType || ""
    )
    const[roomType,setRoomType] =useState(selectedFilters.roomType || "");
    const[amenities,setAmenities]=useState(selectedFilters.amenities || []);
    //useEffect hook 
    useEffect(()=>{
        setPriceRange({
            min:selectedFilters.priceRange?.min || 600,
            max:selectedFilters.priceRange?.max || 30000,
        });
        setPropertyType(selectedFilters.propertyType ||"");
        setRoomType(selectedFilters.roomType || "");
        setAmenities(selectedFilters.amenities || []);

    },[selectedFilters]);
    // fuction to handle changes in price range
    const handlePriceRangeChange=(value)=>{
        setPriceRange(value)//it will update the price range state
    }
    const handleMinInputChange =(e)=>{
        const minValue= parseInt(e.target.value,10);
        setPriceRange((prev)=>({...prev,min:minValue}))
    }
    const handleMaxInputChange = (e)=>{
        const maxValue =parseInt(e.target.value,10)
        setPriceRange((prev)=>({...prev,max:maxValue}))
    
    }
    const hadleFilterChange=()=>{
        onFilterChange("minPrice", priceRange.min)
        onFilterChange("maxPrice", priceRange.max)
        onFilterChange("propertyType",propertyType)
        onFilterChange("amenities",amenities)
        onClose();
    }
    const propertyTypeOption=[{
        value:"House",
        label: "House",
        icon:"home"
    },
    {value:"Flat,",label:"Flat",icon:"apartment"},{
        value:"Guest House",
        label: "Guest House",
        icon:"hotel"
    },
    {value:"Hotel",label:"Hotel",icon:"meeting_room"}
    ];

    const roomTypeOption=[
        {
        value:"Entire Room",
        label:"Entire Room",
        icon: "hotel"
        },
        {
        value:"Room",
        label:"Room",
        icon: "meeting_room"
        },
        {
        value:"AnyType",
        label:"AnyType",
        icon: "apartment"
        },
    ]
// 
    const amenitiesTypeOption=[
        {
            value:"Wife",
            label:"Wifi",
            icon:"wifi"
        },
        {
            value:"Kitchen",
            label:"Kitchen",
            icon:"kitchen"
        },
        {
            value:"Ac",
            label:"AC",
            icon:"ac_unit"
        },
        
        {
            value:"Washing Machine",
            label:"Washing Machine",
            icon:"local_laundry_service"
        },
        {
            value:"Tv",
            label:"Tv",
            icon:"tv"
        },
        {
            value:"Pool",
            label:"Pool",
            icon:"pool"
        },
        {
            value:"Free Parking",
            label:"Free Parking",
            icon:"local_parking"
        },
    ]
    // reset the filters
    const handleClearFilters=()=>{
        setPriceRange({min:600,max:30000})
        setPropertyType("")
        setRoomType("")
        setAmenities([])
    }
    const hadleAmenityChange=(selectedAmenity)=>{
        setAmenities((prevAmenities)=>prevAmenities.includes(selectedAmenity)?prevAmenities.filter((item)=>item!==selectedAmenity):[...prevAmenities,selectedAmenity])
    }
    const hadlePropertyTypeChange=(selectedType)=>{
        setPropertyType((prevType)=>
            prevType===selectedType?"":selectedType)
        
    }
    const hadleRoomTypeChange=(selectedType)=>{
        setRoomType((prevType)=>
            prevType===selectedType?"":selectedType)
        
    }
    
    return (
    <div className='modal-backdrop'>
        <div className='modal-content'>
            <h4>
                Filter
            </h4>
            <button className='close-button' onClick={onClose}>
                <span>&times;</span>
            </button>
            {/* Filter section */}
            <div className='modal-filters-container'>
                <div className='filter-section'>
                    <label>PraceRange:</label>
                    <InputRage minValue={600} maxValue={30000} value={priceRange} onChange={handlePriceRangeChange}></InputRage>
                    <div className='range-inputs'>
                        <input type='number' value={priceRange.min}
                        onChange={handleMinInputChange}/>
                        <span>-</span>
                        <input type='number' value={priceRange.max}
                        onChange={handleMaxInputChange}/>
                    </div>
                </div>
                {/* propertyType Filter */}
                <div className='filter-section'>
                    <label>Property Type:</label>
                    <div className='icon-box'>
                        {propertyTypeOption.map((options)=>(<div key={options.value}
                        className={`selectable-box ${propertyType===options.value ? "selected" : ""}`}
                        onClick={()=>hadlePropertyTypeChange(options.value)}>
                            <span className='material-icons'>{options.icon}</span>
                            <span>{options.label}</span>
                        </div>
                            ))}
                    </div>
                </div>
                <div className='filter-section'>
                    <label>Room Type:</label>
                    <div className='icon-box'>
                        {roomTypeOption.map((options)=>(<div key={options.value}
                        className={`selectable-box ${roomType===options.value ? "selected" : ""}`}
                        onClick={()=>hadleRoomTypeChange(options.value)}>
                            <span className='material-icons'>{options.icon}</span>
                            <span>{options.label}</span>
                        </div>
                            ))}
                    </div>
                </div>
                <div className='filter-section'>
                    <label>Amenities Type:</label>
                    <div className='icon-box'>
                        {amenitiesTypeOption.map((options)=>(<div key={options.value}
                        className={"amenity-checkbox"}>
                        <input type='checkbox'
                        value={options.value}
                        checked={amenities.includes(options.value)}
                        onClick={()=>hadleAmenityChange(options.value)}/>
                        
                            <span className='material-icons'>{options.icon}</span>
                            <span>{options.label}</span>
                        </div>
                            ))}
                    </div>
                </div>

                <div className='filter-buttons'>
                    <button className='clear-button' onClick={handleClearFilters}>Clear</button>
                    <button onClick={hadleFilterChange}>Filter filter</button>

                </div>


            </div>

        </div>
    </div>
  )
}
FilterModal.prototype={
    selectedFilters: PropTypes.func.isRequired,
    onFilterChange: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired
};

export default FilterModal