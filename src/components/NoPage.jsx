import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const NoPage = () => {
  const navigate = useNavigate();
  const [mounted,setisMounted] = useState(false)
  useEffect(()=>{
    setisMounted(true)
  },[])

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
