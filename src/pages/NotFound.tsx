import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { PRIMARY_LOCATION, formatAddress, phoneTelHref } from "@/data/locations";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Oops! Page not found</p>
        <p className="mb-4 text-muted-foreground">
          <strong>Ernest Steamers</strong>
          <br />
          <a href={phoneTelHref(PRIMARY_LOCATION.phoneSchema)} className="text-primary underline">
            {PRIMARY_LOCATION.phoneDisplay}
          </a>
          <br />
          {formatAddress(PRIMARY_LOCATION)}
        </p>
        <a href="/" className="text-primary underline hover:text-primary/90">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
