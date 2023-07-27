import React, { useEffect, useState } from 'react'

const Marketplace = () => {
  const [mounted,setisMounted] = useState(false)
  useEffect(()=>{
    setisMounted(true)
  },[])
  if (!mounted)
    return <div className="w-screen h-screen bg-white dark:bg-black"></div>;
  return (
    <div className='min-h-screen bg-white dark:bg-black'>Marketplace</div>
  )
}

export default Marketplace