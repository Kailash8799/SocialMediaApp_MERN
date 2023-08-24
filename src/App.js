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
import { useContext, useEffect, useState } from "react";
import { Theme } from "./components/context/ThemeProvider";
import { Toaster, toast } from "react-hot-toast";
import LoadingBar from "react-top-loading-bar";
import Modal from "./components/subcomponents/Uploadmodal/Modal";
import AllPosts from "./components/AllPosts";
import Postdetails from "./components/Postdetails";
import Profile from "./components/Profile";
import Messages from "./components/Messages";

function App() {
  const { isLoggedin, setisLoggedin, progress, setProgress, uploadimagemodal } =
    useContext(Theme);
  const [mounted, setisMounted] = useState(false);
  useEffect(() => {
    setisMounted(true);
    let token = localStorage.getItem("userlogintoken");
    let sessionim = sessionStorage.getItem("validuser");
    if (token) {
      setisLoggedin(true);
      if (sessionim) {
        return;
      }
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
            sessionStorage.setItem("validuser", true);
          } else {
            setisLoggedin(false);
            localStorage.removeItem("userlogintoken");
            toast.error(data?.message);
          }
        } catch (error) {
          setisLoggedin(false);
          localStorage.removeItem("userlogintoken");
          toast.error("Some error accured!");
        }
      })();
    }
  }, [setisLoggedin, isLoggedin]);
  if (!mounted)
    return <div className="w-screen h-screen bg-white dark:bg-black"></div>;
  return (
    <>
      <Toaster />
      {isLoggedin ? (
        <>
          {uploadimagemodal && <Modal />}
          <Routes>
            <Route path="/" element={<TopNavbar />}>
              <Route index element={<Home />} />
              <Route path="/friends" element={<Friends />} />
              <Route path="/watch" element={<Watch />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/tweets" element={<Marketplace />} />
              <Route path="/saved" element={<Marketplace />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/explore" element={<Marketplace />} />
              <Route path="/posts" element={<AllPosts />} />
              <Route path="/posts/:id" element={<Postdetails />} />
              <Route path="/profile/:username" element={<Profile />} />
              <Route path="*" element={<NoPage />} />
            </Route>
          </Routes>
        </>
      ) : (
        <>
          <LoadingBar
            color="#f11946"
            progress={progress}
            onLoaderFinished={() => setProgress(0)}
          />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Login />} />
            <Route path="/forgot" element={<Forgot />} />
            <Route path="/verifyemail" element={<Verifyuser />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
        </>
      )}
    </>
  );
}

export default App;
