import React, { useState } from "react";
import LogoImg from "../assets/images/logo-black.png";
import { LinkData } from "../assets/data/dummydata";
import { NavLink, useNavigate } from "react-router-dom";
import { HiOutlineMenuAlt1} from "react-icons/hi";

export const Header = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/applyNow'); 
  };

  const handlePageAdmin = () => {
    navigate('/login')
  }
  return (
    <>
      <header className="bg-headercolor py-2 text-white sticky z-50 shadow-md top-0 left-0 w-full">
        <div className="container flex justify-between items-center">
          <div className="logo flex items-center gap-6 flex-col ">
            <img src={LogoImg} alt="logo" className="h-24" />
            <p className="-mt-6 font-semibold space-x-2">
             <span className="text-red-500 space-2"> BUSARA</span>
              <span className="text-white-500 ">MEDICAL</span>
               <span className="text-green-500">COLLEGE</span>
               </p>
          </div>
          <nav className={open ? "mobile-view" : "desktop-view"}>
            <ul className="flex items-center gap-6">
              {LinkData.map((link) => (
                <li key={link.id} onClick={() => setOpen(null)}>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "text-white text-sm" : "text-backgroundcolor hover:text-white"
                    }
                    to={link.url}
                  >
                    {link.title}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <div className="account flex items-center gap-5">
            <button onClick={handleButtonClick} className="bg-buttoncolor p-2 rounded-lg  flex align-center justify-center text-black font-bold">
              APPLY NOW
            </button>
            <button onClick={handlePageAdmin} className="bg-buttoncolor p-2 rounded-lg  flex align-center justify-center text-black font-bold">
              LOGIN
            </button>{" "}
            <button className="open-menu" onClick={() => setOpen(!open)}>
              <HiOutlineMenuAlt1 size={25} />
            </button>
          </div>
        </div>
      </header>
    </>
  );
};
