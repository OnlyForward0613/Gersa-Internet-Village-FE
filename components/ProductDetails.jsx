import React, { useEffect, useState, useMemo } from "react";
import { useTable } from "react-table";
import { useRouter } from "next/router";
import Image from "next/image";
import { trackPromise } from "react-promise-tracker";
import { BsCheckCircleFill, BsSlashCircle } from "react-icons/bs";
import Button from "./Button";
import colorDict from "css-color-names";

const colorList = [];
const colorNameLookup = {};
colorList.push({ name: "No Color", hex: "" });
Object.keys(colorDict).forEach((colorName) => {
  colorList.push({ name: colorName, hex: colorDict[colorName] });
  colorNameLookup[colorDict[colorName]] = colorName;
});

const ProductDetails = ({ ...pageProps }) => {
  const router = useRouter();
  const { baseURL, products, setProducts, token, setToken } = pageProps;
  const [productID, setProductID] = useState("");
  const [data, setData] = useState([]);
  const [product, setProduct] = useState({});
  const [refreshToken, setRefreshToken] = useState("");

  useEffect(() => {
    setRefreshToken(JSON.parse(localStorage.getItem("token")));
    setProductID(JSON.parse(localStorage.getItem("param")));

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
            if (data.success !== false) {
              setToken(data.token);

              fetch(`${baseURL}/product/${productID}`, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
              })
                .then((res4) => {
                  res4.json().then((data4) => {
                    if (data4?.product) {
                      setProduct(data4.product);

                      const tempOptions = [];
                      data4?.product?.options?.map((opt) => {
                        tempOptions.push({
                          id: tempOptions.length,
                          color: {
                            name: colorNameLookup[opt.color],
                            hex: opt.color,
                          },
                          size: opt.sizes[0].size,
                          quantity: opt.sizes[0].quantity,
                        });
                      });
                      setData(tempOptions);
                    }
                  });
                })
                .catch((error) => console.error(error));
            }
          })
        )
      );
    } else {
      fetch(`${baseURL}/product/${productID}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res4) => {
          res4.json().then((data4) => {
            if (data4?.product) {
              setProduct(data4.product);

              const tempOptions = [];
              data4?.product?.options?.map((opt) => {
                tempOptions.push({
                  id: tempOptions.length,
                  color: {
                    name: colorNameLookup[opt.color],
                    hex: opt.color,
                  },
                  size: opt.sizes[0].size,
                  quantity: opt.sizes[0].quantity,
                });
              });
              setData(tempOptions);
            }
          });
        })
        .catch((error) => console.error(error));
    }
  }, [
    baseURL,
    setProduct,
    productID,
    setProductID,
    refreshToken,
    setToken,
    token,
    setRefreshToken,
  ]);

  const columns = useMemo(
    () => [
      {
        Header: "Color",
        accessor: "color",
        Cell: ({ value }) => (
          <div className="flex flex-row gap-5 items-center justify-center">
            <span
              style={{
                width: "20px",
                height: "20px",
                borderRadius: "20px",
                background: value?.hex,
              }}
              className="flex items-center justify-center"
            ></span>
            <span className="font-pally capitalize">
              {value?.name ? value?.name : "No Color"}
            </span>
          </div>
        ),
        id: "color",
      },
      {
        Header: "Size",
        accessor: "size",
        Cell: ({ value }) => <p className="font-pally text-center">{value}</p>,
        id: "size",
      },
      {
        Header: "Quantity",
        accessor: "quantity",
        Cell: ({ value }) => <p className="font-pally text-center">{value}</p>,
        id: "quantity",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <div className="h-full flex flex-col items-center">
      <div className="sm:w-[500px] w-full">
        <div className="flex flex-row justify-between">
          <div className="font-excon text-3xl">Product Details</div>
        </div>

        <div className="rounded-lg overflow-hidden bg-pwgray-100 my-4">
          {!product?.image ? (
            ""
          ) : (
            <div className="flex justify-center">
              <Image
                alt="product Image"
                width={300}
                height={300}
                src={product.image}
              />
            </div>
          )}
        </div>
        <div className="flex flex-row gap-5">
          {!product?.images
            ? ""
            : product?.images?.map((i) => (
                <div
                  key={Math.random()}
                  className="rounded-lg overflow-hidden bg-pwgray-100"
                >
                  <Image alt="other image" width={100} height={100} src={i} />
                </div>
              ))}
        </div>

        <div className="flex flex-col gap-10">
          <table className="w-full border-collapse border-spacing-x-10">
            <tbody>
              <tr>
                <td>
                  <p className="text-lg font-pally">ID:</p>
                </td>
                <td>
                  <p className="text-lg font-pally">{product?.id}</p>
                </td>
              </tr>
              <tr>
                <td>
                  <p className="text-lg font-pally">Name:</p>
                </td>
                <td>
                  <p className="text-2xl font-pally">{product?.name}</p>
                </td>
              </tr>
              <tr>
                <td>
                  <p className="text-lg font-pally">Description:</p>
                </td>
                <td>
                  <p className="text-md font-pally">{product?.description}</p>
                </td>
              </tr>
              <tr>
                <td>
                  <p className="text-lg font-pally">Price:</p>
                </td>
                <td>
                  <p className="text-2xl font-pally">{`₵ ${product?.price}`}</p>
                </td>
              </tr>
              <tr>
                <td>
                  <p className="text-lg font-pally">Category:</p>
                </td>
                <td>
                  <p className="text-2xl font-pally">
                    {product?.category?.name}
                  </p>
                </td>
              </tr>
              <tr>
                <td>
                  <p className="text-lg font-pally">Featured:</p>
                </td>
                <td>
                  <p className="text-2xl font-pally">
                    {product?.isFeatured ? "Yes" : "No"}
                  </p>
                </td>
              </tr>
              <tr>
                <td>
                  <p className="text-lg font-pally">Rating:</p>
                </td>
                <td>
                  <p className="text-2xl font-pally">{product?.rating}</p>
                </td>
              </tr>
              <tr>
                <td>
                  <p className="text-md font-pally">Number of Ratings:</p>
                </td>
                <td>
                  <p className="text-2xl font-pally">{product?.noOfRatings}</p>
                </td>
              </tr>
              <tr>
                <td>
                  <p className="text-lg font-pally">Disabled:</p>
                </td>
                <td>
                  <p className="text-2xl font-pally">
                    {product?.disabled ? "Yes" : "No"}
                  </p>
                </td>
              </tr>
              <tr>
                <td>
                  <p className="text-lg font-pally">Date Updated:</p>
                </td>
                <td>
                  <p className="text-2xl font-pally">
                    {new Date(product?.dateUpdated).toLocaleString()}
                  </p>
                </td>
              </tr>
            </tbody>
          </table>

          <div>
            <div className="text-lg ml-2 uppercase font-pally">
              Stock Options
            </div>

            <table
              {...getTableBodyProps}
              className=" w-full bg-pwprimary-200 border border-2 border-pwprimary-200 rounded-lg overflow-hidden transition-all ease-in-out duration-500"
            >
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup}>
                    {headerGroup.headers.map((column) => (
                      <th key={column} {...column.getHeaderProps()}>
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
                          ? "bg-pwgray-200/50 hover:bg-pwgray-200"
                          : "bg-pwgray-300 hover:bg-pwgray-200"
                      }
                    >
                      {row.cells.map((cell) => {
                        return (
                          <td key={cell} {...cell.getCellProps()}>
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
    </div>
  );
};

export default ProductDetails;
