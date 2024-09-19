import React, { useEffect, useState, useMemo } from "react";
import { useTable } from "react-table";
import Button from "./Button";
import { BsCheckCircle } from "react-icons/bs";
import { trackPromise } from "react-promise-tracker";
import { useRouter } from "next/router";

const Orders = ({ ...pageProps }) => {
  const router = useRouter();
  const { baseURL, orders, setOrders, merchant, token, setToken } = pageProps;
  const [refreshToken, setRefreshToken] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    setRefreshToken(JSON.parse(localStorage.getItem("pwmerchantToken")));

    if (!token) {
      if (refreshToken) {
        trackPromise(
          fetch(`${baseURL}/merchant/token`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ refreshToken: refreshToken }),
          }).then((res) =>
            res.json().then((data3) => {
              if (data3.success !== false) {
                setToken(data3.token);

                fetch(`${baseURL}/merchantOrder`, {
                  method: "GET",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${data3.token}`,
                  },
                })
                  .then((res4) => {
                    res4.json().then((data4) => {
                      if (data4.success !== false) {
                        setOrders(data4?.orderList);
                        if (data4?.orderList?.length > 0) {
                          setData([...data4.orderList]);
                        }
                      } else {
                        router.push("/signin");
                      }
                    });
                  })
                  .catch((error) => console.error(error));
              }
            })
          )
        );
      }
    }
    trackPromise(
      fetch(`${baseURL}/merchantOrder`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res4) => {
          res4.json().then((data4) => {
            if (data4.success !== false) {
              setOrders(data4.orderList);
              if (data4?.orderList?.length > 0) {
                setData([...data4.orderList]);
              }
            } else {
              router.push("/signin");
            }
          });
        })
        .catch((error) => console.error(error))
    );
  }, [baseURL, router, setOrders, data.success, token, setToken, refreshToken]);

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "orderItem",
        Cell: ({ value }) => (
          <div
            className="p-1 lg:p-3 text-center"
            onClick={() => {
              router.push(`/orders/details/${value.id}`);
              localStorage.setItem("param", JSON.stringify(value.id));
            }}
          >
            {value.id.substring(value.id.length - 5, value.id.length)}
          </div>
        ),
        id: "id",
      },
      {
        Header: "Product",
        accessor: "orderItem",
        Cell: ({ value }) => (
          <div
            className="p-1 lg:p-3 text-center"
            onClick={() => {
              router.push(`/orders/details/${value.id}`);
              localStorage.setItem("param", JSON.stringify(value.id));
            }}
          >
            {value.product.name}
          </div>
        ),
        id: "productName",
      },
      {
        Header: "Color",
        accessor: "orderItem",
        Cell: ({ value }) => (
          <div
            onClick={() => {
              router.push(`/orders/details/${value.id}`);
              localStorage.setItem("param", JSON.stringify(value.id));
            }}
            className="p-1 lg:p-3 rounded-lg mx-auto"
            style={{ background: value.color, width: "40px", height: "40px" }}
          ></div>
        ),
        id: "color",
      },
      {
        Header: "Size",
        accessor: "orderItem",
        Cell: ({ value }) => (
          <div
            className="p-1 lg:p-3 text-center"
            onClick={() => {
              router.push(`/orders/details/${value.id}`);
              localStorage.setItem("param", JSON.stringify(value.id));
            }}
          >
            {value.size}
          </div>
        ),
        id: "size",
      },
      {
        Header: "Unit Price",
        accessor: "orderItem",
        Cell: ({ value }) => (
          <div
            className="p-1 lg:p-3 text-center"
            onClick={() => {
              router.push(`/orders/details/${value.id}`);
              localStorage.setItem("param", JSON.stringify(value.id));
            }}
          >
            {value.product.price}
          </div>
        ),
        id: "unitPrice",
      },
      {
        Header: "Quantity Ordered",
        accessor: "orderItem",
        Cell: ({ value }) => (
          <div
            className="p-1 lg:p-3 text-center"
            onClick={() => {
              router.push(`/orders/details/${value.id}`);
              localStorage.setItem("param", JSON.stringify(value.id));
            }}
          >
            {value.quantity}
          </div>
        ),
        id: "quantity",
      },
      {
        Header: "Total Price",
        accessor: "orderItem",
        Cell: ({ value }) => (
          <div
            className="p-1 lg:p-3 text-center"
            onClick={() => {
              router.push(`/orders/details/${value.id}`);
              localStorage.setItem("param", JSON.stringify(value.id));
            }}
          >
            {value.quantity * value.product.price}
          </div>
        ),
        id: "totalPrice",
      },
      {
        Header: "Date",
        accessor: "orderItem",
        Cell: ({ value }) => (
          <div
            className="p-1 lg:p-3 text-center"
            onClick={() => {
              router.push(`/orders/details/${value.id}`);
              localStorage.setItem("param", JSON.stringify(value.id));
            }}
          >
            {new Date(value.dateCreated).toLocaleString()}
          </div>
        ),
        id: "date",
      },
      {
        Header: "",
        accessor: "orderItem",
        Cell: ({ value }) => (
          <div
            className="p-1 lg:p-3 text-center flex justify-center"
            onClick={() => {
              let tempOrders = [...orders];

              tempOrders.map((o) => {
                if (
                  o.orderItem.id === value.id &&
                  value.status === "In Progress"
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
                        orderItemId: value.id,
                        status: "Complete",
                      }),
                    })
                      .then((res) =>
                        res.json().then((data) => {
                          if (!(data.success && data.success === false)) {
                            tempOrders[tempOrders.indexOf(o)].orderItem.status =
                              "Complete";
                            setOrders(tempOrders);
                          }
                        })
                      )
                      .catch((error) => console.error(error))
                  );
                }
              });
            }}
          >
            {value.status == "In Progress" ? (
              <Button
                text={"Complete"}
                icon={<BsCheckCircle />}
                mode="normal"
              />
            ) : value.status == "Complete" ? (
              <BsCheckCircle />
            ) : (
              ""
            )}
          </div>
        ),
        id: "action",
      },
    ],
    [baseURL, orders, router, setOrders, token]
  );

  // const data = useMemo(() => [...orders]);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <>
      <div>
        <div className="font-excon text-3xl">Orders</div>
        <div className="flex justify-around my-5 h-screen">
          <div className="h-content w-full">
            <table
              {...getTableBodyProps}
              className="w-full bg-pwprimary-200 border border-2 border-pwprimary-200 rounded-lg overflow-hidden"
            >
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup}>
                    {headerGroup.headers.map((column) => (
                      <th
                        key={column}
                        {...column.getHeaderProps()}
                        className={
                          column.Header === "" ||
                          column.Header === "Color" ||
                          column.Header === "Size" ||
                          column.Header === "Unit Price" ||
                          column.Header === "Quantity" ||
                          column.Header === "Total Price"
                            ? "hidden sm:table-cell p-1 lg:p-3"
                            : "table-cell p-1 lg:p-3"
                        }
                      >
                        {column.render("Header")}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {rows.map((row, i) => {
                  prepareRow(row);
                  return (
                    <tr
                      key={row}
                      {...row.getRowProps()}
                      className={
                        i % 2 == 0
                          ? "bg-pwgray-200/50 hover:bg-pwgray-200 hover:cursor-pointer"
                          : "bg-pwgray-300 hover:bg-pwgray-200 hover:cursor-pointer"
                      }
                    >
                      {row.cells.map((cell) => {
                        return (
                          <td
                            key={cell}
                            {...cell.getCellProps()}
                            className={
                              cell.column.Header === "" ||
                              cell.column.Header === "Color" ||
                              cell.column.Header === "Size" ||
                              cell.column.Header === "Unit Price" ||
                              cell.column.Header === "Quantity" ||
                              cell.column.Header === "Total Price"
                                ? "hidden sm:table-cell"
                                : "table-cell"
                            }
                          >
                            {cell.render("Cell")}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Orders;
