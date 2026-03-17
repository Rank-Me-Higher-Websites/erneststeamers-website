import logo from "@/assets/logo.png";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container flex items-center justify-between h-16 px-4">
        <img src={logo} alt="Ernest Steamers" className="h-8" />
        <a
          href="#vsl"
          className="bg-primary text-primary-foreground font-heading font-bold px-6 py-2.5 rounded-lg text-sm hover:brightness-110 transition-all"
        >
          GET STARTED
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
