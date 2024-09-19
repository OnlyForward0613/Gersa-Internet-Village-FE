import { BsPlusSquareDotted } from "react-icons/bs";
import Button from "./Button";
import ProductCard from "./ProductCard";
import Link from "next/link";
import { useEffect, useState } from "react";
import { trackPromise } from "react-promise-tracker";
import { useRouter } from "next/router";

const Products = ({ ...pageProps }) => {
  const { products, setProducts, baseURL, token, setToken } = pageProps;
  const [refreshToken, setRefreshToken] = useState("");
  const router = useRouter();

  useEffect(() => {
    const merchantToken = token;

    setRefreshToken(JSON.parse(localStorage.getItem("pwmerchantToken")));

    if (!token && refreshToken) {
      trackPromise(
        fetch(`${baseURL}/merchant/token`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            refreshToken: refreshToken,
          }),
        })
          .then((res) => {
            res.json().then((data) => {
              if (data.success !== false) {
                setToken(data.token);

                fetch(`${baseURL}/product/merchantProduct`, {
                  method: "GET",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${data.token}`,
                  },
                })
                  .then((res) => {
                    res.json().then((data2) => {
                      if (data2.success !== false) {
                        setProducts(data2.merchantProductList);
                      }
                    });
                  })
                  .catch((error) => console.error(error));
              }
            });
          })
          .catch((error) => console.error(error))
      );
    }

    trackPromise(
      fetch(`${baseURL}/product/merchantProduct`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${merchantToken}`,
        },
      })
        .then((res) => {
          res.json().then((data) => {
            if (data.success !== false) {
              setProducts(data.merchantProductList);
            }
          });
        })
        .catch((error) => console.error(error))
    );
  }, [baseURL, setProducts, token, setToken, refreshToken]);

  return (
    <>
      <div
        className={
          products?.length < 2
            ? "h-screen w-full"
            : products?.length < 3
            ? "h-full sm:h-screen w-full"
            : products?.length < 7
            ? "h-full md:h-screen w-full"
            : products?.length >= 7
            ? "h-full w-full"
            : "h-screen w-full"
        }
      >
        <div className="flex flex-row justify-between">
          <div className="font-excon text-3xl">Products</div>
          <div className="flex flex-col sm:mx-10 gap-2">
            <div className="flex flex-row sm:gap-8 gap-2">
              <Link passHref href="/products/addproduct">
                <div>
                  <Button
                    text={"Add"}
                    icon={<BsPlusSquareDotted />}
                    mode={"normal"}
                  />
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div className="md:grid md:grid-cols-3 lg:grid-cols-4 flex flex-col gap-8 m-2 items-center">
          {products?.length > 0 ? (
            products.map((p) => (
              // <div key={p.id}>
              <ProductCard
                key={p.id}
                product={p}
                products={products}
                setProducts={setProducts}
                baseURL={baseURL}
              />
              // </div>
            ))
          ) : (
            <div className="place-self-center col-span-4 text-3xl top-60 font-pally relative">
              No Products Available
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Products;
