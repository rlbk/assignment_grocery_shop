const Navbar = () => {
  return (
    <nav className="w-full  bg-primary flex items-center justify-between py-6 px-10 ">
      <h1 className="hover:scale-105 text-xl font-bold cursor-pointer text-yellow-400 transition duration-300">
        Grocery Shop
      </h1>
      <div className="text-3xl hover:-rotate-12 cursor-pointer transition">
        👋
      </div>
    </nav>
  );
};

export default Navbar;
