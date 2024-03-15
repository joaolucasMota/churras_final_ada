import {ReactNode} from "react";
import Logo from "../assets/logo.svg"

interface HeaderProps {
  children: ReactNode;
}

export default function Header({children}: HeaderProps) {
  return (
    <>
      <header className=" flex justify-center items-center justify-around  shadow-lg p-8 bg-indigo-500">
        <img src={Logo} alt="logo" className="w-28 -ml-20"/>
        {children}
      </header>
    </>
  )
}