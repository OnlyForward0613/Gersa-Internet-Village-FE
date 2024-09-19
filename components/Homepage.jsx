import React, { useEffect, useState } from "react";
import Head from "next/head";
import NavBar2 from "../components/NavBar2";
import SideBar from "../components/SideBar";
import SimpleFooter from "../components/SimpleFooter";
import favicon from "../public/images/favicon.ico";
import { AppWrapper, useAppContext } from "../context/state";

// const Homepage = ({ setUser, children }) => {
const Homepage = ({ children }) => {
  const [collapsed, setCollapsed] = useState(true);
  const [active, setActive] = useState("dashboard");

  const [sidebarOpen, setSidebarOpen] = useState(false);

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
    // <AppWrapper>
    <div className="bg-pwprimary-100">
      <Head>
        <title>Pricewards Merchant Portal</title>
        <meta
          name="Merchant Portal for Pricewards E-Commerce"
          content="Portal"
        />
        <link rel="shortcut icon" href={favicon.src} />
      </Head>
      <div className="sticky top-0 z-50">
        <header>
          <NavBar2
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            merchant={merchant}
          />
        </header>
      </div>
      <main>
        <div className="flex">
          <aside>
            <SideBar
              sidebarOpen={sidebarOpen}
              setActive={setActive}
              active={active}
            />
          </aside>
          <div className="h-full w-screen pb-20 sm:ml-24 mx-1 mt-2 p-2">
            {React.cloneElement(children, {
              products,
              setProducts,
              orders,
              setOrders,
              merchant,
              setMerchant,
              categories,
              setCategories,
              baseURL,
              token,
              setToken,
            })}
          </div>
        </div>
      </main>
      <footer>
        <SimpleFooter />
      </footer>
      {/* </AppWrapper> */}
    </div>
  );
};

export default Homepage;
