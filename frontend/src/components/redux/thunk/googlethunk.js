import axios from 'axios'
import {Cookies} from 'react-cookie'
import { user_action } from '../slice/userSlice';
const cookies=new Cookies();

// in this thunk we send the google authenticate token
const Googlethunk = (token,clientId,usergroup,companyName,coordinates,navigate) => {
  return async(dispatch)=>{
      const obj={
          token:token,
          clientId:clientId,
          usergroup:usergroup,
          companyName:companyName,
          coordinates:coordinates
      }
      console.log(obj);
      const Googlepost=async ()=>{
        let hour = new Date();
        hour.setTime(hour.getTime() + (60*60*1000));
              const response= await axios.post('http://localhost:8000/google',obj);
              console.log(response)
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
                cookies.set('authenticate',response.data.authenticate,{expires:hour});
                 console.log(response.data.msg)
                 dispatch(user_action.seterrors(response.data.msg));
              }
      }
      Googlepost();
  }
}
export default Googlethunk