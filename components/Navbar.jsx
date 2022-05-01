const Navbar = ({ sidebar, setSidebar }) => {
  return (
    <header className="border-b border-gray-100 bg-cyan-400">
      <div className="flex items-center justify-between h-16 mx-auto max-w-screen-2xl sm:px-6 lg:px-8">
        <div className="flex items-center ml-3">
          <a href="/" className="flex">
            <span className="inline-block w-32 h-10 bg-gray-200 rounded-lg"></span>
          </a>
        </div>

        <div className="flex items-center justify-start flex-1 ml-10">
          <nav className="hidden lg:uppercase lg:text-white lg:tracking-wide lg:font-bold lg:text-xs lg:space-x-4 lg:flex">
            <a href="/catalogs" className="block h-16 leading-[4rem] border-b-4 border-transparent hover:border-current">
              Cataloghi
            </a>

            <a href="/about" className="block h-16 leading-[4rem] border-b-4 border-transparent hover:border-current">
              About
            </a>
          </nav>
        </div>

        <div className="flex items-center">
          <button type="button" className="p-2 sm:mr-4 lg:hidden" onClick={() => setSidebar(true)}>
            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
