import axios from 'axios'
import {Cookies} from 'react-cookie'
const cookies=new Cookies();

// in this thunk we send the google authenticate token
const Googlethunk = (token,clientId,usergroup,navigate) => {
  return async(dispatch)=>{
      const obj={
          token:token,
          clientId:clientId,
          usergroup:usergroup
      }
      console.log(obj);
      const Googlepost=async ()=>{
        let hour = new Date();
        hour.setTime(hour.getTime() + (60*60*1000));
              const response= await axios.post('http://localhost:8000/google',obj);
              cookies.set('token',response.data.token,{expires:hour});
              cookies.set('userId',response.data.userId,{expires:hour});
              navigate('/');
      }
      Googlepost();
  }
}
export default Googlethunk