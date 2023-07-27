import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NoPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(()=>{
      navigate('/', { replace: true });
    },1000)
  }, [navigate]);
  return <h1>404</h1>;
};

export default NoPage;
