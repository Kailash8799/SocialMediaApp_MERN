import { createContext, useEffect, useState } from "react";

export const Theme = createContext();

const ThemeProvider = ({ children }) => {
  const [themeMode, setthemeMode] = useState("light");
  const [mounted, setMounted] = useState(false);
  const [isLoggedin, setisLoggedin] = useState(false);
  const [progress, setProgress] = useState(0)
  const [uploadfile,setUploadfile] = useState(null);
  const [uploadimagemodal,setuploadimagemodal] = useState(false)
  const [uploadimagemodalanimation,setuploadimagemodalanimation] = useState(false)
  const [sidebarModal,setsidebarModal] = useState(false)
  const [sidebarModalanimation,setsidebarModalanimation] = useState(false)
  const [leftsidebarModal,setleftsidebarModal] = useState(false)
  const [leftsidebarModalanimation,setleftsidebarModalanimation] = useState(false)
  const [postid,setpostid] = useState("");
  const [commentModal,setcommentModal] = useState(false)
  const [commentModalanimation,setcommentModalanimation] = useState(false)
  const [editprofileModal,seteditprofileModal] = useState(false)
  const [editprofileModalanimation,seteditprofileModalanimation] = useState(false)
  const [profileinfo,setprofileinfo] = useState({});
  const [storyModal,setstoryModal] = useState(false)
  const [storyModalanimation,setstoryModalanimation] = useState(false)

  useEffect(() => {
    setMounted(true);
    let themelocal = localStorage.getItem("thememode");
    if (themelocal === "dark") {
      document.body.classList.remove("light");
      document.body.classList.add("dark");
      setthemeMode("dark");
    } else {
      document.body.classList.remove("dark");
      document.body.classList.add("light");
      setthemeMode("light");
    }
  }, []);
  
  const ChangeTheme = () => {
    if (themeMode === "light") {
      document.body.classList.remove("light");
      document.body.classList.add("dark");
      setthemeMode("dark");
      localStorage.setItem("thememode", "dark");
    } else {
      document.body.classList.remove("dark");
      document.body.classList.add("light");
      setthemeMode("light");
      localStorage.setItem("thememode", "light");
    }
  };
  if (!mounted)return;
  return (
    <Theme.Provider
      value={{
        themeMode,
        setthemeMode,
        ChangeTheme,
        isLoggedin,
        setisLoggedin,
        progress,
        setProgress,
        uploadfile,
        setUploadfile,
        uploadimagemodal,
        setuploadimagemodal,
        uploadimagemodalanimation,
        setuploadimagemodalanimation,
        sidebarModal,
        setsidebarModal,
        sidebarModalanimation,
        setsidebarModalanimation,
        leftsidebarModal,
        setleftsidebarModal,
        leftsidebarModalanimation,
        setleftsidebarModalanimation,
        commentModal,
        setcommentModal,
        commentModalanimation,
        setcommentModalanimation,
        postid,
        setpostid,
        editprofileModal,
        seteditprofileModal,
        editprofileModalanimation,
        seteditprofileModalanimation,
        profileinfo,setprofileinfo,
        storyModal,
        setstoryModal,
        storyModalanimation,
        setstoryModalanimation
      }}
    >
      {children}
    </Theme.Provider>
  );
};

export default ThemeProvider;
