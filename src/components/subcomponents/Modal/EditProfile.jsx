import React, { useContext, useEffect, useRef, useState } from "react";
import { Theme } from "../../context/ThemeProvider";
import { AnimatePresence, motion } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";
import { toast } from "react-hot-toast";
import { ColorRing } from "react-loader-spinner";
const secret = process.env.REACT_APP_SECRET;

const EditProfileModal = () => {
  const {
    themeMode,
    seteditprofileModal,
    editprofileModalanimation,
    seteditprofileModalanimation,
    profileinfo,
    setprofileinfo,
  } = useContext(Theme);
  const [mounted, setMounted] = useState(false);
  const imageref = useRef();
  const [imagefile,setimagefile] = useState();
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) <div className="min-h-screen bg-white dark:bg-black"></div>;
  
  const updateProfile = async () => {
    if (imagefile == null) {
      toast.error("Please select file");
      return;
    }
    if (isLoading) {
      toast.error("Uploading in progress plese do not turn off window");
      return;
    }
    const formData = new FormData();
    formData.append("file", imagefile);
    try {
      setisLoading(true);
      const responce = await toast.promise(
        fetch(
          `${process.env.REACT_APP_LOCALHOST_KEY}/api/addpost/uploadImage`,
          {
            method: "POST",
            body: formData,
          }
        ),
        {
          loading: "Image Uploading",
          success: "Image uploaded",
          error: <b>Failed to upload</b>,
        }
      );
      if (!responce.ok) {
        toast.error("Network error accured!");
        return;
      }
      const data = await responce.json();
      if (data.success) {
        try {
          const responceimg = await toast.promise(
            fetch(
              `${process.env.REACT_APP_LOCALHOST_KEY}/api/auth/updateUser`,
              {
                method: "POST",
                body: JSON.stringify({
                  token: localStorage.getItem("userlogintoken"),
                  secret: secret,
                  usernameemail:profileinfo?.useremail,
                  profileImage: data.url,
                  oldImage:profileinfo?.profileImage
                }),
                headers: {
                  "Content-type": "application/json",
                },
              }
            ),
            {
              loading: "Post data uploading",
              success: "Post data uploaded",
              error: <b>Failed to upload</b>,
            }
          );
          if (!responceimg.ok) {
            toast.error("Network error accured!");
            return;
          }
          const dataadd = await responceimg.json();
          if (dataadd.success) {
            toast.success(dataadd?.message);
            window.location.reload();
            setisLoading(false);
          } else {
            toast.error(dataadd?.message);
            setisLoading(false);
          }
          setisLoading(false);
        } catch (error) {

          toast.error("Some error ocuured!");
          setisLoading(false);
        }
      } else {
        toast.error(data?.message);
        setisLoading(false);
      }
      setisLoading(false);
    } catch (error) {
      toast.error("Some error occured");
      setisLoading(false);
    }
  };
   
  return (
    <div
      className="fixed w-screen h-screen selection:bg-none modal-backdrop"
      style={{ zIndex: 150 }}
    >
      <div
        onClick={() => {
          seteditprofileModalanimation(false);
          setTimeout(() => {
            seteditprofileModal(false);
            setprofileinfo({});
          }, 500);
        }}
        className="fixed hidden cursor-pointer md:flex right-10 top-5 modal-backdrop"
      >
        <AiOutlineClose
          color={themeMode === "dark" ? "white" : "black"}
          size={30}
        />
      </div>
      <div className="flex items-center justify-center w-full h-full">
        <AnimatePresence>
          {editprofileModalanimation && (
            <motion.div
              onClick={(e) => {
                e.stopPropagation();
              }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.8,
                delay: 0,
                ease: [0, 0.71, 0.2, 1.01],
              }}
              exit={{
                opacity: 0,
                scale: 0.5,
              }}
              className={`h-[570px] relative overflow-y-auto rounded-lg mx-3 max-w-xl w-full shadow-inner dark:shadow-slate-900 shadow-slate-500 dark:bg-neutral-700 bg-white `}
            >
              <div
                className={`h-12 dark:shadow-slate-900 shadow-slate-500 dark:bg-neutral-700 bg-white  border-b sticky top-0 z-50  items-center flex justify-between border-slate-300 dark:border-slate-800 px-3`}
              >
                <div className="items-center justify-center transition-all border-green-200 md:mx-auto">
                  <h1 className="inline-block font-semibold text-center text-black transition-all dark:text-white">
                    Profile
                  </h1>
                </div>
                <div>
                  <motion.div
                    onClick={() => {
                      seteditprofileModalanimation(false);
                      setTimeout(() => {
                        seteditprofileModal(false);
                        setprofileinfo({});
                      }, 500);
                    }}
                    initial={{ x: 100, y: -100 }}
                    animate={{ x: 0, y: 0 }}
                    transition={{
                      duration: 0.8,
                      delay: 0,
                      ease: [0, 0.71, 0.2, 1.01],
                    }}
                    exit={{
                      x: 100,
                      y: -100,
                    }}
                    className="items-center justify-center cursor-pointer md:hidden"
                  >
                    <AiOutlineClose
                      color={themeMode === "dark" ? "white" : "black"}
                      size={24}
                    />
                  </motion.div>
                </div>
                
              </div>
              <div className="">
              <input onChange={(e)=>{
                if(e.target.files[0]){
                    setimagefile(e.target.files[0]);
                }
              }} type="file" className="hidden" ref={imageref}/>
              <img 
                  onClick={()=>{
                    imageref.current.click();
                  }}
                  src={
                      (imagefile && URL.createObjectURL(imagefile)) || (profileinfo?.profileImage ? profileinfo?.profileImage : "/user.png")
                  }
                  alt="Profile"
                  className="w-32 mx-auto my-3 h-32 mb-2 rounded-full"
                />

<div className="mx-4">
              <label className="text-sm font-medium leading-none text-gray-800 dark:text-slate-400">
                Name
              </label>
              <input
                aria-label="enter email adress"
                type="email"
                value={profileinfo?.username}
                readOnly
                className="w-full py-3 pl-3 mt-2 text-xs font-medium leading-none text-gray-800 bg-gray-200 border rounded focus:outline-none"
              />
            </div>

            <div className="mx-4 mt-3">
              <label className="text-sm font-medium leading-none text-gray-800 dark:text-slate-400">
                Email
              </label>
              <input
                aria-label="enter email adress"
                type="email"
                value={profileinfo?.useremail}
                readOnly
                onChange={(e) => {
                //   setemail(e.target.value);
                }}
                className="w-full py-3 pl-3 mt-2 text-xs font-medium leading-none text-gray-800 bg-gray-200 border rounded focus:outline-none"
              />
            </div>
            
            <div className="mt-8 mx-5">
              {isLoading ? (
                <button
                  aria-label="create my account"
                  className="items-center justify-center w-full py-2 text-xl font-bold leading-none text-center text-white transition-transform border rounded focus:ring-indigo-700 focus:outline-none dark:border-slate-700 bg-gradient-to-tl from-pink-500 to-blue-400 border-slate-200 hover:from-slate-500 hover:to-white"
                >
                  <ColorRing
                    visible={true}
                    height="40"
                    width="40"
                    ariaLabel="blocks-loading"
                    wrapperStyle={{ margin: "auto" }}
                    wrapperClass="blocks-wrapper"
                    colors={[
                      "#e15b64",
                      "#f47e60",
                      "#f8b26a",
                      "#abbd81",
                      "#849b87",
                    ]}
                  />
                </button>
              ) : (
                <button
                  aria-label="create my account"
                  onClick={updateProfile}
                  className="w-full py-4 text-xl font-bold leading-none text-white transition-transform border rounded focus:ring-indigo-700 focus:outline-none dark:border-slate-700 bg-gradient-to-tl from-pink-500 to-blue-400 border-slate-200 hover:from-slate-500 hover:to-white"
                >
                  Update profile
                </button>
              )}
            </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default EditProfileModal;
