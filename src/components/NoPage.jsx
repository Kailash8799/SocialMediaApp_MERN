import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Theme } from "./context/ThemeProvider";

const NoPage = () => {
  const navigate = useNavigate();
  const [mounted,setisMounted] = useState(false)
  const {setProgress} = useContext(Theme)
  useEffect(()=>{
    setProgress(0)
    setisMounted(true)
    setProgress(100)
  },[setProgress])

  useEffect(() => {
    setTimeout(()=>{
      navigate('/', { replace: true });
    },1000)
  }, [navigate]);
  
  if (!mounted)
    return <div className="w-screen h-screen bg-white dark:bg-black"></div>;
  return <h1>404</h1>;
};

export default NoPage;
