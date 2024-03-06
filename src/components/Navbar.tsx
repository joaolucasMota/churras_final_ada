export default function Navbar(){
    return(
        <>
         <nav >
            <ul className="flex flex-row text-xl font-medium"> 
                <li className="mr-10 cursor-pointer hover:text-teal-50 duration-500">Home</li>
                <li className="ml-10 cursor-pointer hover:text-teal-50 duration-500">Criar Churrasco</li>
            </ul>
         </nav>
        </>
    )
}