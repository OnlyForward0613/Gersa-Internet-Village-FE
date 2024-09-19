import { useRouter } from "next/router";
import { useEffect } from "react";

const Logout = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/signin");
  });

  return <div className="bg-pwprimary-100 h-screen">Redirecting...</div>;
};

export default Logout;
