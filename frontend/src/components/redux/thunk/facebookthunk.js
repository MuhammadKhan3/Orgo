import axios from 'axios'
import {Cookies} from 'react-cookie'
import { user_action } from '../slice/userSlice';

const cookies=new Cookies();
const FacebookThunk = (token,clientId,usergroup,company,coordinates,email,navigate) => {
  return async(dispatch)=>{

      const obj={
          token:token,
          clientId:clientId,
          usergroup:usergroup,
          company:company,
          coordinates:coordinates,
          email:email!=='' ? email:''
      }
      console.log(obj)
      const Facebook=async ()=>{
               const response= await axios.post('http://localhost:8000/facebook',obj);
               let hour = new Date();
               hour.setTime(hour.getTime() + (60*60*1000));
               if(response.data.userType==='company' || response.data.userType==='freelancer'){
                cookies.set('token',response.data.token,{expires:hour});
                cookies.set('userId',response.data.userId,{expires:hour});
                cookies.set('companyId',response.data.companyId,{expires:hour});
                cookies.set('userType',response.data.userType,{expires:hour});
                cookies.set('authenticate',response.data.authenticate,{expires:hour});
                navigate('/');
              }else if(response.data.userType==='employee'){
                cookies.set('token',response.data.token,{expires:hour});
                cookies.set('userId',response.data.userId,{expires:hour});
                cookies.set('employeeId',response.data.employeeId,{expires:hour});
                cookies.set('userType',response.data.userType,{expires:hour});
                cookies.set('authenticate',response.data.authenticate,{expires:hour});

                navigate('/');
              }else if(response.data.msg){
                 console.log(response.data.msg)
                 dispatch(user_action.seterrors(response.data.msg));
              }
      }
      Facebook();
  }
}
export default FacebookThunk