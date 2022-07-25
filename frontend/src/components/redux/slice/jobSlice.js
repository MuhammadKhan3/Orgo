import { createSlice } from '@reduxjs/toolkit'
const initialState = {
     jobs:[],searches:[],heading:'',description:'',file:[],category:'',skill:[],min:0,max:0,deletefile:[]
}
// slices
//User slice we manage the registration process varaible
export const jobSlice = createSlice({
  name: 'jobSlice',
  initialState,
  reducers: {
    setjobs:(state,action)=>{
        state.jobs=action.payload
    },
    setsearches:(state,action)=>{
      state.searches=action.payload
    },
    setheading:(state,action)=>{
      state.heading=action.payload;
    },
    setdescription:(state,action)=>{
      state.description=action.payload;
    },
    setfile:(state,action)=>{
      state.file=action.payload;
    },
    setcategory:(state,action)=>{
      state.category=action.payload[0];
    },
    setskill:(state,action)=>{
      state.skill=action.payload;
    },
    setminimum:(state,action)=>{
      state.min=action.payload;
    },
    setmaximum:(state,action)=>{
      state.max=action.payload;
    },
    setdeletefile:(state,action)=>{
      state.deletefile=action.payload;
    }
  },
})

export const job_action=jobSlice.actions;

export default jobSlice;