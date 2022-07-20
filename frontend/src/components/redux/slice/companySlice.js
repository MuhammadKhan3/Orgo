import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    timezone:'',ownername:'',profile:'',languages:'',education:'',description:'',heading:'',rate:0
}
// slices
//User slice we manage the registration process varaible
export const companySlice = createSlice({
  name: 'userslice',
  initialState,
  reducers: {
  },
})

export const company_action=companySlice.actions;

export default companySlice;