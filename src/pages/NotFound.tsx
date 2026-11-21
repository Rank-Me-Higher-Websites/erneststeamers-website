import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { PRIMARY_LOCATION, formatAddress, phoneTelHref } from "@/data/locations";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <main className="missing-page">
      <div>
        <h1 className="mb-4 text-4xl font-bold">Page not found</h1>
        <p className="mb-4 text-xl text-muted-foreground">Try the homepage or call our Franklin Park office.</p>
        <p className="mb-4 text-muted-foreground">
          <strong>Ernest Steamers</strong>
          <br />
          <a href={phoneTelHref(PRIMARY_LOCATION.phoneSchema)} className="text-primary underline">
            {PRIMARY_LOCATION.phoneDisplay}
          </a>
          <br />
          {formatAddress(PRIMARY_LOCATION)}
        </p>
        <a href="/" className="book-clean">
          Return to Home
        </a>
      </div>
    </main>
  );
};

export default NotFound;
