export default function Navbar() {
  const handleHomeClick = () => {
    window.location.href = '/';
  };

  const handleCreateChurrascoClick = () => {
    window.location.href = '/form';
  };

  return (
    <>
      <nav>
        <ul className="flex flex-row text-xl font-medium">
          <li
            className="mr-10 cursor-pointer hover:text-teal-50 duration-500"
            onClick={handleHomeClick}
          >
            Home
          </li>
          <li
            className="ml-10 cursor-pointer hover:text-teal-50 duration-500"
            onClick={handleCreateChurrascoClick}
          >
            Criar Churrasco
          </li>
        </ul>
      </nav>
    </>
  );
}
