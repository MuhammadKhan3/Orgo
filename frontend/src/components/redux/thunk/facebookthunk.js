import axios from 'axios'
import {Cookies} from 'react-cookie'
const cookies=new Cookies();
const FacebookThunk = (token,clientId,usergroup,email,navigate) => {
  console.log(email)
  return async(dispatch)=>{
      const obj={
          token:token,
          clientId:clientId,
          usergroup:usergroup,
          email:email!=='' ? email:''
      }
      console.log(obj)
      const Facebook=async ()=>{
               const response= await axios.post('http://localhost:8000/facebook',obj);
              let hour = new Date();
              hour.setTime(hour.getTime() + (60*60*1000));
              cookies.set('token',response.data.token,{expires:hour});
              cookies.set('userId',response.data.userId,{expires:hour});
              navigate('/');
      }
      Facebook();
  }
}
export default FacebookThunk