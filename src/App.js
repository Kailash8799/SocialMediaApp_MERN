import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import NoPage from "./components/NoPage";
import TopNavbar from "./components/subcomponents/TopNavbar";
import Friends from "./components/Friends";
import Watch from "./components/Watch";
import Marketplace from "./components/Marketplace";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Forgot from "./components/Forgot";
import Verifyuser from "./components/Verifyuser";
import { useContext, useEffect } from "react";
import { Theme } from "./components/context/ThemeProvider";
import { Toaster, toast } from "react-hot-toast";

function App() {
  const { isLoggedin, setisLoggedin } = useContext(Theme);
  useEffect(() => {
    let token = localStorage.getItem("userlogintoken");
    if (token) {
      (async () => {
        try {
          const responce = await fetch(
            `${process.env.REACT_APP_LOCALHOST_KEY}/api/auth/getUser`,
            {
              method: "POST",
              body: JSON.stringify({ token }),
              headers: {
                "Content-type": "application/json",
              },
            }
          );
          const data = await responce.json();
          if (data?.success) {
            toast.success(data?.message);
            setisLoggedin(true);
          } else {
            setisLoggedin(false);
            toast.error(data.message);
          }
        } catch (error) {
          setisLoggedin(false);
          toast.error(error);
        }
      })();
    }
  }, [setisLoggedin, isLoggedin]);

  return (
    <>
      <Toaster />
      {isLoggedin ? (
        <Routes>
          <Route path="/" element={<TopNavbar />}>
            <Route index element={<Home />} />
            <Route path="/friends" element={<Friends />} />
            <Route path="/watch" element={<Watch />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/verifyuser" element={<Verifyuser />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      )}
    </>
  );
}

export default App;
