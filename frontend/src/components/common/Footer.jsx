import React from "react";
import { NavLink } from "react-router-dom";

export const Footer = () => {
  return (
    <>
      <section className="app w-3/4 m-auto rounded-lg shadow-shadow2 text-white flex md:flex-col bg-backgroundcolor mt-auto  sticky ">
        <div className="left w-[60%] md:w-full p-5">
          <h1 className="text-4xl font-semibold leading-tight">
            Start learning by <br /> Joining Us.
          </h1>
        </div>
        <div className="right w-[40%] md:w-full flex items-center px-5 rounded-r-lg rounded-bl-[500px] gap-8 bg-[#FF7C54] md:bg-backgroundcolor md:p-8"></div>
      </section>
      <footer className="bg-headercolor py-10 pt-32 -mt-24 ">
        <div className="container grid grid-cols-3 gap-5 md:grid-cols-2 mx-auto">
          <div className="logo">
            <span className="text-white">
              <h1 className="text-buttoncolor text-lg font-semibold mb-5">
                {" "}
                Busara Medical Training College
              </h1>
              At Busara Medical Training College , we believe that the
              foundation of a transformed world lies in the meaningful
              engagement of each individual with their work and with each other.
              Great lesson ideas and lesson plans.
            </span>
          </div>

          <li className="mx-auto">
            <h4 className="text-buttoncolor text-lg font-semibold mb-5">
              BMTC{" "}
            </h4>
            <NavLink to="#" className=" text-white block mb-2 ">
              Contact
            </NavLink>
            <NavLink to="#" className=" text-white block mb-2">
              Blog
            </NavLink>
            <NavLink to="#" className=" text-white block mb-2">
              Our team
            </NavLink>
            <NavLink to="#" className=" text-white block mb-2">
              Get in Touch
            </NavLink>
          </li>

          <li className="mx-auto">
            <h4 className="text-buttoncolor font-bold text-lg mb-5 uppercase">
              get in touch
            </h4>
            <h1 className="text-white font-bold">Location:</h1>
             Busara Medical Training College <br /> P.O Box 1249 - 20300
            Nyahururu. along Silibwet road, in Gatimu location <br /> Phone: +(254) 718
            322222 <br /> Email: bmtc.co.ke | bmtc.co.ke
          </li>
        </div>
      </footer>
    </>
  );
};
