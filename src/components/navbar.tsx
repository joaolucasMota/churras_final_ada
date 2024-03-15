// Navbar.js
import {Link} from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <nav>
        <ul className="flex flex-row text-xl font-medium">
          <li className="mr-10 cursor-pointer hover:text-teal-50 duration-500">
            <Link to="/">Home</Link>
          </li>
          <li className="ml-10 cursor-pointer hover:text-teal-50 duration-500">
            <Link to="/form">Criar Churrasco</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
