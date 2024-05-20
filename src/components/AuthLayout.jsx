//this page is designedd or made to protect the routes or for authentication nothing else
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Protected({ children, authentication = true }) {
  //function mname and the file name can be different for ex here protected is the name of the function
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const authstatus = useSelector((state) => state.auth.status);

  //useeffect is used to check whenever the things in the dependency array changes like if the page navigate sif there is a change in the status and authentication
  useEffect(() => {
    if (authentication && authstatus !== authentication) {
      navigate("/login");
    } else if (!authentication && authstatus !== authentication) {
      navigate("/");
    }
    setLoader(false);
  }, [authentication, authstatus, navigate]);
  return loader ? <h1>Loading...</h1> : <>{children}</>;
}
