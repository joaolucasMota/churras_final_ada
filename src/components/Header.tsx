import Navbar from "./Navbar"
import Logo from "../assets/logo.svg"

export default function Header(){
    return(
        <>
        <header className=" flex justify-center items-center justify-around  shadow-lg p-8 bg-indigo-500">

            <img src={Logo} alt="logo" className="w-28 -ml-20" />
            
            <Navbar/>
            

        </header>
        </>
    )
}