import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export function AppWrapper({ children }) {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [merchant, setMerchant] = useState({});
  const [token, setToken] = useState("");
  const [categories, setCategories] = useState([]);
  // const baseURL = "https://pricewards-test.herokuapp.com/api/v1";
  const baseURL = "https://api.pricewards.com";

  return (
    <AppContext.Provider
      value={{
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
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
