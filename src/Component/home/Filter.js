import React,{useEffect, useState} from 'react'
import FilterModal from './FilterModal'
import { useDispatch } from 'react-redux'
import { getAllProperties } from '../../Store/Property/property-action'
import { propertyAction } from '../../Store/Property/property-slice'
const Filter = () => {
  // state for controlling model visibility
  const [isModalOpen,setIsModelOpen]=useState(false)
  // state for selected filter
  const [selectedFilters,setSelectedFilters]=useState({})
  const dispatch=useDispatch();

  useEffect(()=>{
    dispatch(propertyAction.updateSearchParams(selectedFilters));
    dispatch(getAllProperties())
  }, [selectedFilters,dispatch] );
  // fuction to open the model or popupWindow
  const handleOpenModel = ()=>{
    setIsModelOpen(true);
  }
  // fuction to hadle  closing the modle
  const hadleCloseModel=()=>{
      setIsModelOpen(false);
  }
  const hadleFilterChange=(filterName,value)=>{
    // update the selected filters
    setSelectedFilters((prevFilters)=>({
      ...prevFilters, // its store the previouse value of filter  
      [filterName]: value,
    }))
  }
  return (
    <>
      <span className="material-symbols-outlined filter c_ptr" onClick={handleOpenModel}>
        tune
      </span>
      {isModalOpen&& (
        <FilterModal selectedFilters={selectedFilters} onFilterChange={hadleFilterChange} onClose={hadleCloseModel}/>
      )}
    </>
  )
}

export default Filter