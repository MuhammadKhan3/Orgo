import React from 'react'
import './test.css'
const Test = () => {
    const [usergroup,setuserGroup]=React.useState('')

  return (<>
  <form>
    <div>
        <input type='radio' name='employee' id='employee' hidden/>
        <div style={{border:'1px solid lightblue',width:'80px',padding:'5px',backgroundColor:usergroup=='employee'? 'lightblue':'',color: usergroup=='employee'? 'white':'',float:'left'}} onClick={()=>{setuserGroup('employee')}}>
        <label htmlFor='employee'>
             employee
        </label>
        </div>
        <input type='radio' name='employee' id='employee' value='' hidden/>
        <div style={{border:'1px solid lightblue',width:'180px',padding:'5px',backgroundColor:usergroup=='freelancer'? 'lightblue':'',color: usergroup=='freelancer'? 'white':'',float:'left'}} onClick={()=>{setuserGroup('freelancer')}}>
        <label htmlFor='employee'>
             organization/Freelancer
        </label>
        </div>

    </div>
  </form>
  </>)
}

export default Test