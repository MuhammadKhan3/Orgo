import axios from 'axios'
import { user_action } from '../slice/userSlice';
import { Cookies } from 'react-cookie'
const cookies=new Cookies();



const GoogleLoginThunk=(token,navigate)=>{
    
    const obj={
        token:token
    }
    return async (dispatch)=>{
       

        const GoogleLogin=async ()=>{
            const response=await axios.post('http://localhost:8000/google-logins',obj);
            console.log(response)
            let hour = new Date();
            hour.setTime(hour.getTime() + (60*60*1000));
            if(response.data.userType==='company' || response.data.userType==='freelancer'){
                cookies.set('token',response.data.token,{expires:hour});
                cookies.set('userId',response.data.userId,{expires:hour});
                cookies.set('companyId',response.data.companyId,{expires:hour});
                cookies.set('userType',response.data.userType,{expires:hour});
                cookies.set('authenticate',response.data.authenticate,{expires:hour});
                cookies.set('authorize',response.data.authorize,{expires:hour});
                
                navigate('/');
              }else if(response.data.userType==='employee'){
                cookies.set('token',response.data.token,{expires:hour});
                cookies.set('userId',response.data.userId,{expires:hour});
                cookies.set('employeeId',response.data.employeeId,{expires:hour});
                cookies.set('userType',response.data.userType,{expires:hour});
                cookies.set('authenticate',response.data.authenticate,{expires:hour});
                cookies.set('authorize',response.data.authorize,{expires:hour});

                navigate('/');
              }else if(response.data.msg){
                 console.log(response.data.msg)
                 dispatch(user_action.seterrors(response.data.msg));
              }

        }
        GoogleLogin();
    }
}

export default GoogleLoginThunk;