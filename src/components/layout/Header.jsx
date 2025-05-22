import Navbar from './Navbar';

const Header = () => {
  return (
    <>
        <header className="bg-cyan-950 text-white p-4 lg:p-8 fixed top-0 left-0 right-0 z-50">
            <Navbar />
        </header>
    </>
  );
};

export default Header;