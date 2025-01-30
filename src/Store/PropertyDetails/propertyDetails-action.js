import axios from  "axios";
import { propertyDetailsAction } from "./propetyDetails-slice";
export const getPropertyDetails=(id)=>async(dispatch)=>{
    try{
        dispatch(propertyDetailsAction.getListRequest())
        const responce =await axios(`/api/v1/rent/listing/${id}`);
        if(!responce){
            throw new Error("Could not fetch any property details!!")
        }
        const {data}=responce.data;
        dispatch(propertyDetailsAction.getPropertyDetails(data));
    }

    catch(error){
        dispatch(propertyDetailsAction.getErrors(error.responce.data.error))
    }
}