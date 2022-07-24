import { createSlice } from '@reduxjs/toolkit'
const initialState = {
     jobs:[],searches:[]
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
    }
  },
})

export const job_action=jobSlice.actions;

export default jobSlice;