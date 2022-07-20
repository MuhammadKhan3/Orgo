import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    timezone:'',companyname:'',country:'',picture:'',languages:'',education:'',description:'',heading:'',rate:0,portfolio:[]
}
// slices
//User slice we manage the registration process varaible
export const companySlice = createSlice({
  name: 'companySlice',
  initialState,
  reducers: {
    setcompanyname:(state,action)=>{
      state.companyname=action.payload;
      console.log(state.companyname)
    },
    settimezone:(state,action)=>{
      state.timezone=action.payload;
    },
    setpicture:(state,action)=>{
      state.picture=action.payload;
    },
    setlanguages:(state,action)=>{
      state.languages=action.payload;
    },
    seteducation:(state,action)=>{
      state.education=action.payload;
    },
    setheading:(state,action)=>{
      state.heading=action.payload;
    },
    setdescription:(state,action)=>{
      state.description=action.payload;
    },
    setrate:(state,action)=>{
      state.rate=action.payload;
    },
    setportfolio:(state,action)=>{
      state.portfolio=action.payload
    },
    setcountry:(state,action)=>{
      state.country=action.payload
    }
  },
})

export const company_action=companySlice.actions;

export default companySlice;