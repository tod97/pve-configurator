const Sidebar = ({ sidebar, setSidebar }) => {
  const hideSidebar = () => {
    setSidebar(!sidebar);
  };

  return (
    <>
      <div
        className={`
            min-h-screen
            absolute
            z-30
            top-0
            left-0
            bg-black
            opacity-50
            w-full
            ${sidebar ? '' : 'hidden'}
        `}
        onClick={() => setSidebar(false)}
      ></div>
      <div
        className={`
            overflow-x-hidden
            min-h-screen
            absolute
            z-50
            px-4
            py-10
            right-0
            top-0
            bg-white
            transform
            transition-width
            duration-300
            ease-in-out
            ${sidebar ? 'w-80' : 'w-0 px-0'}
        `}
        id="mobile-nav"
      >
        <nav className="lg:uppercase lg:text-white lg:tracking-wide lg:font-bold lg:text-xs lg:space-x-4 lg:flex">
          <a href="/catalogs" className="block h-16 leading-[4rem] border-b-4 border-transparent hover:text-cyan-400 hover:border-current">
            Cataloghi
          </a>

          <a href="/about" className="block h-16 leading-[4rem] border-b-4 border-transparent hover:text-cyan-400 hover:border-current">
            About
          </a>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
