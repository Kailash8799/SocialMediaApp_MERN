import SideNavbar from "./subcomponents/SideNavbar";

const Home = () => {
  return (
    <>
      <SideNavbar />
      <div className="min-h-screen bg-white lg:ml-64 sm:ml-16 dark:bg-black">
        <div>
          <h1 className="text-black dark:text-white">Friends</h1>
        </div>
      </div>
    </>
  );
};

export default Home;
