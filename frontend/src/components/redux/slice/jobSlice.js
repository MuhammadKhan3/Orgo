import { createSlice } from '@reduxjs/toolkit'
const initialState = {
     jobs:[],searches:[],heading:'',description:'',file:[],category:'',skill:[],min:0,files:[],max:0,deletefile:[],
     proposals:[],coverletter:'',proposalfile:'',createdat:'',rate:'',employeeId:'',
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
    setfiles:(state,action)=>{
      state.files=action.payload;
    },
    setfile:(state,action)=>{
        state.file.push(action.payload);
    },
    setremovefile:(state,action)=>{
       state.file=action.payload; 
    },
    setcategory:(state,action)=>{
      console.log(action.payload)
      state.category=action.payload;
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
      state.deletefile.push(action.payload)
    },
    setproposal:(state,action)=>{
      state.proposals=action.payload;
    },
    setcoverletter:(state,action)=>{
      state.coverletter=action.payload
    },
    setproposalfile:(state,action)=>{
      state.proposalfile=action.payload;
    },
    setcreatedat:(state,action)=>{
      console.log(action.payload)
      state.createdat=action.payload;
    },
    setrate:(state,action)=>{
      state.rate=action.payload;
    },
    setemployeeId:(state,action)=>{
      state.employeeId=action.payload;
    },

  },
})

export const job_action=jobSlice.actions;

export default jobSlice;