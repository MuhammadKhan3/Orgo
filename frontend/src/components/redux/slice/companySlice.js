import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    timezone:'',companyname:'',country:'',picture:'',languages:[],education:'',description:'',title:'',rate:0,portfolio:[],language:'',level:'',
    school:'',sdescription:'',degree:'',degreelevel:'',hourworking:''
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
    settitle:(state,action)=>{
      state.title=action.payload;
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
    },
    setlanguage:(state,action)=>{
      state.language=action.payload
      console.log(state.language)
    },
    setlevel:(state,action)=>{
      state.level=action.payload
    },
    setschool:(state,action)=>{
    state.school=action.payload;
    },
    setdegree:(state,action)=>{
      state.degree=action.payload;
    },
    setdegreelevel:(state,action)=>{
      state.degreelevel=action.payload;
    },
    setsdescription:(state,action)=>{
      state.sdescription=action.payload;
    },
    sethourswork:(state,action)=>{
      state.hourworking=action.payload;
    }
  },
})

export const company_action=companySlice.actions;

export default companySlice;