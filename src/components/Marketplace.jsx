import React, { useContext, useEffect, useState } from 'react'
import { Theme } from './context/ThemeProvider'

const Marketplace = () => {
  const [mounted,setisMounted] = useState(false)
  const {setProgress} = useContext(Theme)
  useEffect(()=>{
    setProgress(0)
    setisMounted(true)
    setProgress(100)
  },[setProgress])
  if (!mounted)
    return <div className="w-screen h-screen bg-white dark:bg-black"></div>;
  return (
    <div className='min-h-screen bg-white dark:bg-black'>Marketplace</div>
  )
}

export default Marketplace