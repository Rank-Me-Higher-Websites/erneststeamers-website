import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { applySeoToDocument, getSeo } from "@/seo";

const Seo = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    applySeoToDocument(getSeo(pathname));
  }, [pathname]);

  return null;
};

export default Seo;
