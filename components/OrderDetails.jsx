import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { trackPromise } from "react-promise-tracker";
import Button from "./Button";
import { BsCheckCircle } from "react-icons/bs";

const OrderDetails = ({ ...pageProps }) => {
  const router = useRouter();
  const { orders, setOrders, baseURL, token, setToken } = pageProps;
  const [orderId, setOrderId] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [productImage, setProductImage] = useState("");
  const [order, setOrder] = useState([]);

  useEffect(() => {
    setOrderId(JSON.parse(localStorage.getItem("param")));

    setRefreshToken(JSON.parse(localStorage.getItem("pwmerchantToken")));

    const merchantToken = token;

    if (!token) {
      trackPromise(
        fetch(`${baseURL}/merchant/token`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refreshToken: refreshToken }),
        }).then((res) =>
          res.json().then((data) => {
            if (!data.success) {
              setToken(data.token);

              fetch(`${baseURL}/merchantOrder`, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${merchantToken}`,
                },
              })
                .then((res4) => {
                  res4.json().then((data4) => {
                    if (data4.success !== false) {
                      setOrders(data4.orderList);

                      const orderr = data4.orderList.filter((o) => {
                        return o.orderItem?.id === orderId;
                      });

                      if (orderr.length > 0) {
                        setOrder(orderr[0]);
                        trackPromise(
                          fetch(
                            `${baseURL}/product/${orderr[0].orderItem?.product.id}`,
                            {
                              method: "GET",
                              headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${merchantToken}`,
                              },
                            }
                          )
                            .then((res) =>
                              res.json().then((data) => {
                                if (data.product) {
                                  setProductImage(data.product.image);
                                }
                              })
                            )
                            .catch((error) => console.error(error))
                        );
                      }
                    }
                  });
                })
                .catch((error) => console.error(error));
            } else {
              router.push("/signin");
            }
          })
        )
      );
    }

    trackPromise(
      fetch(`${baseURL}/merchantOrder`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${merchantToken}`,
        },
      })
        .then((res4) => {
          res4.json().then((data4) => {
            if (data4?.success !== false) {
              setOrders(data4.orderList);

              const orderr = data4.orderList.filter((o) => {
                return o.orderItem?.id === orderId;
              });

              if (orderr.length > 0) {
                setOrder(orderr[0]);
                trackPromise(
                  fetch(
                    `${baseURL}/product/${orderr[0].orderItem?.product.id}`,
                    {
                      method: "GET",
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${merchantToken}`,
                      },
                    }
                  )
                    .then((res) =>
                      res.json().then((data) => {
                        if (data.product) {
                          setProductImage(data.product.image);
                        }
                      })
                    )
                    .catch((error) => console.error(error))
                );
              }
            } else {
              router.push("/signin");
            }
          });
        })
        .catch((error) => console.error(error))
    );
  }, [
    baseURL,
    router,
    setOrders,
    orderId,
    token,
    setToken,
    refreshToken,
    setOrder,
  ]);

  return (
    <div className="h-full lg:h-screen flex flex-col items-center">
      <div className="sm:w-[500px] w-full">
        <div className="font-excon text-3xl">Order Details</div>

        <div className="rounded-lg overflow-hidden bg-pwgray-100/50 my-4">
          {productImage === "" ? (
            ""
          ) : (
            <div className="flex justify-center">
              <Image
                alt="product Image"
                width={300}
                height={300}
                src={productImage}
              />
            </div>
          )}
        </div>

        <div className="flex flex-col gap-10">
          <table className="w-full border-collapse border-spacing-x-10">
            <tbody>
              <tr>
                <td>
                  <p className="text-lg font-pally">ID:</p>
                </td>
                <td>
                  <p className="text-lg font-pally">{order?.orderItem?.id}</p>
                </td>
              </tr>
              <tr>
                <td>
                  <p className="text-lg font-pally">Product:</p>
                </td>
                <td>
                  <p className="text-2xl font-pally">
                    {order?.orderItem?.product.name}
                  </p>
                </td>
              </tr>
              <tr>
                <td>
                  <p className="text-lg font-pally">Color:</p>
                </td>
                <td>
                  <div
                    className="rounded-md"
                    style={{
                      background: order?.orderItem?.color,
                      width: "40px",
                      height: "20px",
                    }}
                  ></div>
                </td>
              </tr>
              <tr>
                <td>
                  <p className="text-lg font-pally">Size:</p>
                </td>
                <td>
                  <p className="text-2xl font-pally">
                    {order?.orderItem?.size}
                  </p>
                </td>
              </tr>
              <tr>
                <td>
                  <p className="text-lg font-pally">Unit Price:</p>
                </td>
                <td>
                  <p className="text-2xl font-pally">
                    {order?.orderItem?.product.price}
                  </p>
                </td>
              </tr>
              <tr>
                <td>
                  <p className="text-lg font-pally">Quantity Ordered:</p>
                </td>
                <td>
                  <p className="text-2xl font-pally">
                    {order?.orderItem?.quantity}
                  </p>
                </td>
              </tr>
              <tr>
                <td>
                  <p className="text-lg font-pally">Total Price:</p>
                </td>
                <td>
                  <p className="text-2xl font-pally">
                    {parseInt(order?.orderItem?.product.price) *
                      order?.orderItem?.quantity}
                  </p>
                </td>
              </tr>
              <tr>
                <td>
                  <p className="text-lg font-pally">Date:</p>
                </td>
                <td>
                  <p className="text-2xl font-pally">
                    {new Date(order?.orderItem?.dateCreated).toLocaleString()}
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
          <div
            className="p-1 lg:p-3 text-center flex justify-center"
            onClick={(e) => {
              let tempOrders = [...orders];

              tempOrders.map((o) => {
                if (
                  o.orderItem?.id === order.orderItem?.id &&
                  order.orderItem?.status === "In Progress"
                ) {
                  const merchantToken = token;

                  trackPromise(
                    fetch(`${baseURL}/order`, {
                      method: "PATCH",
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${merchantToken}`,
                      },
                      body: JSON.stringify({
                        orderItemId: order.orderItem?.id,
                        status: "Complete",
                      }),
                    })
                      .then((res) =>
                        res.json().then((data) => {
                          if (!(data.success && data.success === false)) {
                            tempOrders[tempOrders.indexOf(o)].orderItem.status =
                              "Complete";
                            setOrders(tempOrders);
                            setOrder(o);
                          }
                        })
                      )
                      .catch((error) => console.error(error))
                  );
                }
              });
            }}
          >
            {order?.orderItem?.status == "In Progress" ? (
              <Button
                text={"Complete"}
                icon={<BsCheckCircle size={24} />}
                mode="normal"
                size={"lg"}
              />
            ) : order?.orderItem?.status == "Complete" ? (
              <span className="font-pally text-pwgray-600 uppercase flex flex-row items-center justify-center gap-3">
                <BsCheckCircle />
                <div>Order Completed</div>
              </span>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
