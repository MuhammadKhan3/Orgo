import React from 'react'

const Profile = () => {
  return (<>
  {/* main container */}
  <div>
    {/* Start inner white container */}
    <div className='mt-[50px] bg-white w-[1100px] h-[1000px] ml-[250px] rounded-md '>

           {/* Start Avatar */}
           <div class="avatar online mt-[30px] ml-[30px]">
                <div class="w-20  rounded-full">
                    <img src="https://placeimg.com/192/192/people" />

 
                </div>
              </div>
            {/* Close Avatar */}
            <div className=' btn btn-ghost rounded-xl h-[10px] z-10 text-black'>
                       <svg xmlns="http://www.w3.org/2000/svg" width='20' height='20' viewBox="0 0 24 24" fill="none"><path fill="currentColor" fill-rule="evenodd" d="M15.586 3a2 2 0 0 1 2.828 0L21 5.586a2 2 0 0 1 0 2.828L19.414 10 14 4.586 15.586 3zm-3 3-9 9A2 2 0 0 0 3 16.414V19a2 2 0 0 0 2 2h2.586A2 2 0 0 0 9 20.414l9-9L12.586 6z" clip-rule="evenodd"/></svg>
            </div>
        </div>
    {/* Close inner white container */}
  </div>
  {/* close main container */}
    </>)
}

export default Profile