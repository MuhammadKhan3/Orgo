// for testing backend
import axios from 'axios'
import React,{useState} from 'react'

const Portfolio = () => {
    const [image,setimages]=useState([])
    const uploadImage=(e)=>{
        setimages([...e.target.files]);

    }
    const clickupload=(e)=>{
        e.preventDefault();
        const formdata=new FormData();
        image.forEach(file=>{
            console.log(file)
            formdata.append('files',file)
        })
        formdata.append('title','Pointing sale software')
        const response=axios.post('http://localhost:8000/portfolio/62d1614e3c8a314742fea206',formdata);
    }

  return (<>
   <div>
    {image.map((value)=>{
        console.log(value)
       return <img src={URL.createObjectURL(value)} width='200' height='200'/>
    })}
   </div>
    <form onSubmit={clickupload} >
        <input type="file" onChange={uploadImage} multiple/>
        <button type='submit'>click</button>
    </form>
    </>)
}

export default Portfolio