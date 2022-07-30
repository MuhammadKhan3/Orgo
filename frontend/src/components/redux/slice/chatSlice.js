import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    chats:[],userlist:[],user:[],name:'',message:'',flag:false
}
// slices
//User slice we manage the registration process varaible
export const chatSlice = createSlice({
  name: 'chatSlice',
  initialState,
  reducers: {
    setchats:(state,action)=>{
        state.chats=action.payload;
    },
    setuserlist:(state,action)=>{
      state.userlist=action.payload;
    },
    setuser:(state,action)=>{
      state.user=action.payload;
    },
    setname:(state,action)=>{
      state.name=action.payload;
    },
    setmessage:(state,action)=>{
      state.message=action.payload;
    },
    setchat:(state,action)=>{
      state.chats.push(action.payload)
    },
    setflag:(state,action)=>{
      state.flag=action.payload;
    }

  },
})

export const chat_action=chatSlice.actions;

export default chatSlice;