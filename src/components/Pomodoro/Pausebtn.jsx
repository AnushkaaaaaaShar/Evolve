import React from 'react'

const Pausebtn = ({onClick}) => {
  return (
     <button onClick={onClick} className='cursor-pointer bg-transparent text-[#FAFFC5] w-[100px] inline-block' > <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-22">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
</svg> </button>
  )
}

export default Pausebtn