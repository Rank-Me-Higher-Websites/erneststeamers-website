import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-primary border-t border-primary-foreground/10 py-10 px-4">
      <div className="container max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <img src={logo} alt="Ernest Steamers" className="h-6 opacity-70" />
        <p className="text-primary-foreground/50 text-sm">
          © {new Date().getFullYear()} Ernest Steamers. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
