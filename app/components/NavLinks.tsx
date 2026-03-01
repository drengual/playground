import React from "react";
import { Link, Links } from "react-router";

function NavLinks() {
  return (
    <>
      <Link to="/" className="text-blue-600 hover:underline font-semibold">
        Home
      </Link>
      <Link to="/about" className="text-blue-600 hover:underline font-semibold">
        About
      </Link>
      <Link
        to="/brightsmile"
        className="text-blue-600 hover:underline font-semibold"
      >
        BrightSmile
      </Link>
      <Link
        to="/brightsmile-vtwo"
        className="text-blue-600 hover:underline font-semibold"
      >
        BrightSmile V2
      </Link>
      <Link
        to="/brightsmile-vthree"
        className="text-blue-600 hover:underline font-semibold"
      >
        BrightSmile V3
      </Link>
      <Link
        to="/adminBrightSmile"
        className="text-blue-600 hover:underline font-semibold"
      >
        BrightSmile Admin
      </Link>
      <Link
        to="/adminBrightSmile-LRN"
        className="text-blue-600 hover:underline font-semibold"
      >
        BrightSmile LoginRegNotif
      </Link>
      <Link
        to="/aldrenbagual-v1"
        className="text-blue-600 hover:underline font-semibold"
      >
        AldrenBagual V1
      </Link>
      <Link
        to="/aldrenbagual-v2"
        className="text-blue-600 hover:underline font-semibold"
      >
        AldrenBagual V2
      </Link>
      <Link
        to="/adminBrightSmile-v1"
        className="text-blue-600 hover:underline font-semibold"
      >
        BrightSmile Admin V1
      </Link>
      <Link
        to="/adminBrightSmile-v2"
        className="text-blue-600 hover:underline font-semibold"
      >
        BrightSmile Admin V2
      </Link>
      <Link
        to="/adminMenu"
        className="text-blue-600 hover:underline font-semibold"
      >
        Admin Menu
      </Link>
      <Link to="/para" className="text-blue-600 hover:underline font-semibold">
        Para
      </Link>
      <Link to="/para2" className="text-blue-600 hover:underline font-semibold">
        Para V2
      </Link>
      <Link to="/para3" className="text-blue-600 hover:underline font-semibold">
        Para V3
      </Link>
      <Link to="/pcs" className="text-blue-600 hover:underline font-semibold">
        PCS
      </Link>
      <Link
        to="/pcs-v2"
        className="text-blue-600 hover:underline font-semibold"
      >
        PCS V2
      </Link>
      <Link
        to="/pcs-v3"
        className="text-blue-600 hover:underline font-semibold"
      >
        PCS V3
      </Link>
    </>
  );
}

export default NavLinks;
