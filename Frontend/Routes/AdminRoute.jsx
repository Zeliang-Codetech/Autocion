// "use client";

// import { useRouter } from "next/navigation";
// import Cookies from "js-cookie";

// const PrivateRoute = ({ children }) => {
//   const isAuthenticated = Cookies.get("admin");
//   const router = useRouter();
//   if (!isAuthenticated) {
//     router.push("/admin");
//   }
//   return children;
// };
// export default PrivateRoute;


"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const PrivateRoute = ({ children }) => {
  useEffect(() => {
    const router = useRouter();
    const isAuthenticated = Cookies.get("admin");
    if (!isAuthenticated) {
      router.push("/admin");
    }
      return isAuthenticated ? children : null;
  }, []);


};

export default PrivateRoute;
