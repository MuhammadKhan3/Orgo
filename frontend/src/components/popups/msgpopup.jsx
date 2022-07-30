import React from 'react'

const MsgPopup = ({setflag,msg,title}) => {
  return (<div class="modal modal-bottom sm:modal-middle modal-open" >
    <div class="modal-box">
      <h3 class="font-bold text-lg">{title}</h3>
      <p class="py-4">{msg}!</p>
      <div class="modal-action" onClick={()=>{setflag({flag:true})}}>
        <label for="my-modal-6" class="btn bg-red-500 border-none hover:bg-red-600 active:bg-red-800">close</label>
      </div>
    </div>
   </div>)
}

export default MsgPopup;