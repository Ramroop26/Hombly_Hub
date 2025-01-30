import { createSlice } from "@reduxjs/toolkit";

const propertySlice= createSlice({
    // slice name
    name: "property",
    initialState:{
        properties:[],
        totaleProperties: 0,
        searchParams:{}, //parameters use for search
        error: null,// erros state
        loading: false, //loading state of properties

    },
    // reducers fuction to hadle the different fuction
    reducers:{
        getRequest(state){
            state.loading= true;             
        },
        // Action to update properties state with fetch data
        getProperties(state,action){
            state.properties=action.payload.data;
            state.totaleProperties=action.payload.all_properties;
            state.loading=false;
        },

        // action to search parameters
        updateSearchParams:(state, action)=>{
            state.searchParams=Object.keys(action.payload).length===0?{}:{
                ...state.searchParams,
                ...action.payload,
            }
        },
        //Action to update error state
        getErrors(state,action){
            state.error=action.payload;
        },
    }
    
});
export const propertyAction=propertySlice.actions;
export default propertySlice;