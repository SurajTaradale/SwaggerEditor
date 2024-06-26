import Link from 'next/link';
import React, { useState } from 'react';
import { IoMdMenu } from "react-icons/io";
const Navbar = () => {
  // State to manage the navbar's visibility
  const [nav, setNav] = useState(false);

  // Toggle function to handle the navbar's display
  const handletoggle = () => {
    setNav(!nav);
  };

  return (

    <nav className="bg-white py-2 md:py-4">
    <div className="container px-4 mx-auto md:flex md:items-center">

      <div className="flex justify-between items-center">
        <Link href="#" className="font-bold text-xl text-indigo-600">Developer Portal</Link>
        <button
          className="border border-solid border-gray-600 px-3 py-1 rounded text-gray-600 opacity-50 hover:opacity-75 md:hidden"
          id="navbar-toggle" onClick={handletoggle}>
          <IoMdMenu/>
        </button>
      </div>
      <div className={nav ? "md:flex flex-col md:flex-row md:ml-auto mt-3 md:mt-0 flex": "md:flex flex-col md:flex-row md:ml-auto mt-3 md:mt-0 hidden"} id="navbar-collapse">
        <Link href="/login"
          className="p-2 lg:px-4 md:mx-2 text-gray-600 text-center border border-transparent rounded ">Login</Link>
        <Link href="/signup"
          className="p-2 lg:px-4 md:mx-2 text-gray-600 text-center border border-transparent  rounded">Signup</Link>
      </div>
    </div>
  </nav>
  );
};

export default Navbar;