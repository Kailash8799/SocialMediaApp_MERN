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
        setuploadimagemodalanimation
      }}
    >
      {children}
    </Theme.Provider>
  );
};

export default ThemeProvider;
