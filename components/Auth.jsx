import Head from "next/head";
import React from "react";
import { useAppContext } from "../context/state";
import NavBar from "./NavBar";
import SimpleFooter from "./SimpleFooter";
import favicon from "../public/images/favicon.ico";

const Auth = ({ children }) => {
  const {
    products,
    setProducts,
    orders,
    setOrders,
    merchant,
    setMerchant,
    categories,
    setCategories,
    token,
    setToken,
    baseURL,
  } = useAppContext();

  return (
    <div className="h-full bg-pwprimary-100">
      <Head>
        <title>Pricewards Merchant Portal</title>
        <meta
          name="Merchant Portal for Pricewards E-Commerce"
          content="Portal"
        />
        <link rel="shortcut icon" href={favicon.src} />
      </Head>
      <NavBar />
      <main>
        <div className="flex justify-center items-center mx-2 px-2 h-full">
          <div className="h-screen">
            {React.cloneElement(children, {
              products,
              setProducts,
              orders,
              setOrders,
              merchant,
              setMerchant,
              categories,
              setCategories,
              token,
              setToken,
              baseURL,
            })}
          </div>
        </div>
      </main>
      <footer>
        <SimpleFooter />
      </footer>
    </div>
  );
};

export default Auth;
