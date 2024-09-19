import React, { useEffect, useState, useMemo } from "react";
import { useTable } from "react-table";
import Button from "./Button";
import {
  BsDash,
  BsPlus,
  BsPlusSquareDotted,
  BsQuestionCircleFill,
  BsTrash,
} from "react-icons/bs";
import FormInput from "./FormInput";
import SmallImage from "./SmallImage";
import Checkbox from "./Checkbox";
import { trackPromise } from "react-promise-tracker";
import { useRouter } from "next/router";
import { Tooltip } from "react-tooltip";
import AsyncSelect from "react-select/async";
import Collapsible from "react-collapsible";
import colorDict from "css-color-names";
import RadioInput from "./RadioInput";
import SegmentedControl from "./SegmentedControl";

const colorList = [];
const colorNameLookup = {};
colorList.push({ name: "No Color", hex: "" });
Object.keys(colorDict).forEach((colorName) => {
  colorList.push({ name: colorName, hex: colorDict[colorName] });
  colorNameLookup[colorDict[colorName]] = colorName;
});

const EditProduct = ({ ...pageProps }) => {
  const router = useRouter();
  const {
    products,
    setProducts,
    baseURL,
    categories,
    setCategories,
    token,
    setToken,
  } = pageProps;
  const [productId, setProductId] = useState("");
  const [product, setProduct] = useState();
  // products.filter((p) => p.id == productId)
  const [otherImages, setOtherImages] = useState([]);
  const [mainImage, setMainImage] = useState([]);
  const [productName, setProductName] = useState();
  const [description, setDescription] = useState();
  const [color, setColor] = useState([]);
  const [customizable, setCustomizable] = useState([]);
  const [size, setSize] = useState([]);
  const [sizeType, setSizeType] = useState(["Letters", "Numbers"]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [price, setPrice] = useState();
  const [quantity, setQuantity] = useState();
  const [status, setStatus] = useState({
    label: "Available",
    value: "Available",
  });
  const [reqErr, setReqErr] = useState(false);
  const [fillError, setFillError] = useState(false);
  const [refreshToken, setRefreshToken] = useState("");
  const [options, setOptions] = useState([]);
  const [stockOptionsOpen, setStockOptionsOpen] = useState(false);
  const [imageLimit, setImageLimit] = useState(false);

  useEffect(() => {
    setProductId(JSON.parse(localStorage.getItem("param")));

    const temp = products.filter((p) => p.id == productId);
    setProduct(temp);

    const merchantToken = token;
    setRefreshToken(JSON.parse(localStorage.getItem("pwmerchantToken")));

    if (!token) {
      trackPromise(
        fetch(`${baseURL}/merchant/token`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: refreshToken,
        }).then((res) =>
          res.json().then((data) => {
            if (!data.success) {
              setToken(data.token);

              if (productId) {
                trackPromise(
                  fetch(`${baseURL}/product/${productId}`, {
                    method: "GET",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${data.token}`,
                    },
                  })
                    .then((res) => {
                      res.json().then((data2) => {
                        if (!data2.success) {
                          setProduct([data2?.product]);
                          setOtherImages([...data2?.product?.images]);
                          setMainImage([data2?.product?.image]);
                          setProductName(data2?.product?.name);
                          setDescription(data2?.product?.description);
                          setCustomizable(
                            data2?.product?.customizable ? ["Custom"] : []
                          );
                          setSelectedCategories([
                            {
                              label: data2?.product?.category.name,
                              value: data2?.product?.category.id,
                            },
                          ]);
                          setPrice(data2?.product?.price);
                          setStatus(
                            data2?.product?.isAvailable
                              ? { label: "Available", value: "Available" }
                              : { label: "Unavailable", value: "Unavailable" }
                          );

                          const tempOptions = [];
                          data2?.product?.options?.map((opt) => {
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
                          setOptions(tempOptions);
                        }
                      });
                    })
                    .catch((error) => console.error(error))
                );
              }
            }
          })
        )
      );
    }

    if (productId) {
      trackPromise(
        fetch(`${baseURL}/product/${productId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${merchantToken}`,
          },
        })
          .then((res) => {
            res.json().then((data2) => {
              if (!data2.success) {
                setProduct([data2?.product]);
                setOtherImages([...data2?.product?.images]);
                setMainImage([data2?.product?.image]);
                setProductName(data2?.product?.name);
                setDescription(data2?.product?.description);
                setCustomizable(data2?.product?.customizable ? ["Custom"] : []);
                setSelectedCategories([
                  {
                    label: data2?.product?.category.name,
                    value: data2?.product?.category.id,
                  },
                ]);
                setPrice(data2?.product?.price);
                setStatus(
                  data2?.product?.isAvailable
                    ? { label: "Available", value: "Available" }
                    : { label: "Unavailable", value: "Unavailable" }
                );
                const tempOptions = [];
                data2?.product?.options?.map((opt) => {
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
                setOptions(tempOptions);
              }
            });
          })
          .catch((error) => console.error(error))
      );
    }
  }, [baseURL, productId, products, token, setToken, refreshToken]);

  const columns = useMemo(
    () => [
      {
        Header: () => null,
        Cell: ({ row }) => (
          <div
            className="p-2"
            onClick={() => {
              const remainder = options.filter((d) => {
                return d.id !== row.original.id;
              });
              setOptions(remainder);
            }}
          >
            <BsTrash size={20} className="cursor-pointer" />
          </div>
        ),
        id: "deleteFromStock",
      },
      {
        Header: () => {
          return <div className="flex justify-start">Color</div>;
        },
        accessor: "color",
        Cell: ({ value }) => (
          <div className="flex flex-row gap-5 items-center justify-start">
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
    [options, setOptions]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: options });

  return (
    <>
      <div className="h-full flex flex-col items-center">
        <div className="sm:w-[500px] w-full">
          <div className="flex flex-row justify-between">
            <div className="font-excon text-3xl">Edit Product</div>
            <div onClick={() => router.back()}>
              <Button text={"Discard"} icon={<BsTrash />} mode={"red"} />
            </div>
          </div>
          <div className="grid grid-flow-row grid-cols-3 sm:flex sm:flex-row sm:flex-wrap m-2 h-fit">
            <div>
              <FormInput
                name={"Main Image *"}
                type={"file"}
                accept={"image/png, image/jpeg, image/jpg"}
                images={mainImage}
                setImages={setMainImage}
              />
            </div>
            {Array.from(mainImage).map((image) => (
              <SmallImage
                key={image}
                isNew={false}
                image={image}
                images={mainImage}
                setImages={setMainImage}
              />
            ))}
          </div>
          <div className="grid grid-flow-row grid-cols-3 sm:flex sm:flex-row sm:flex-wrap m-2 h-fit">
            <div>
              <FormInput
                name={"Images"}
                type={"file"}
                accept={"image/png, image/jpeg, image/jpg"}
                images={otherImages}
                setImages={setOtherImages}
              />
            </div>
            {Array.from(otherImages).map((image) => (
              <SmallImage
                key={Math.floor(Math.random() * 1000)}
                isNew={false}
                image={image}
                images={otherImages}
                setImages={setOtherImages}
              />
            ))}
            <div
              className={
                otherImages.length > 5
                  ? "flex items-center text-xl text-pwdanger-300 font-pally"
                  : "flex items-center text-xl font-pally"
              }
            >{`${otherImages.length}/5`}</div>
          </div>
          <div className="sm:w-[500px]">
            <FormInput
              name="Product Name *"
              type={"text"}
              value={productName}
              setProductName={setProductName}
            />
            <FormInput
              name="Description"
              type={"textarea"}
              value={description}
              setDescription={setDescription}
            />
            <FormInput
              name="Categories *"
              type={"tags"}
              baseURL={baseURL}
              setSelected={[setSelectedCategories, setCategories]}
              selected={selectedCategories}
              whitelist={categories}
              token={token}
            />
            <FormInput
              name="Price (GH₵) *"
              type={"number"}
              value={price}
              min={0}
              setPrice={setPrice}
            />

            <FormInput
              name="Status"
              type={"select"}
              status={status}
              setStatus={setStatus}
              options={[
                { value: "Available", label: "Available" },
                { value: "Unavailable", label: "Unavailable" },
              ]}
            />
            <div className="-ml-2">
              <Checkbox
                label={
                  <span className="ml-1 font-pally flex flex-row z-0 transition-all ease-in-out duration-500 cursor-pointer">
                    Customizable
                    <a data-tooltip-id="customizable">
                      <BsQuestionCircleFill
                        style={{ margin: "0 10" }}
                        color="#999"
                        size={15}
                      />
                    </a>
                    <Tooltip
                      id="customizable"
                      className="w-1/2"
                      style={{ zIndex: 99 }}
                    >
                      <p className="break-words w-[250px]">
                        Select this option if you want to accept customer
                        measurements for this product
                      </p>
                    </Tooltip>
                  </span>
                }
                value={"Custom"}
                sizes={customizable}
                setSizes={setCustomizable}
                isChecked={false}
                setData={setOptions}
              />
            </div>

            <br />

            <div className="flex flex-row font-pally z-0 transition-all ease-in-out duration-500 ">
              <span className="text-lg ml-2 uppercase">Stock Options</span>
              <a data-tooltip-id="stockoptions">
                <BsQuestionCircleFill
                  style={{ margin: "0 10" }}
                  color="#999"
                  size={15}
                />
              </a>
              <Tooltip
                id="stockoptions"
                className="w-1/2"
                style={{ zIndex: 99 }}
              >
                <p className="break-words w-[250px] cursor-pointer">
                  Add stock options below if this product is not customisable
                </p>
              </Tooltip>
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

            <div
              className={
                stockOptionsOpen
                  ? "transition-all ease-in-out duration-500 my-5 px-5 mb-10 border border-1 border-pwprimary-200 rounded-lg"
                  : "transition-all ease-in-out duration-500 my-5 px-5 mb-10"
              }
            >
              <Collapsible
                triggerDisabled={customizable.length > 0}
                transitionTime={300}
                onOpen={() => setStockOptionsOpen(true)}
                onClose={() => setStockOptionsOpen(false)}
                trigger={
                  <div
                    className={
                      customizable.length > 0
                        ? "text-xl flex items-center gap-3 flex-row text-pwgray-500 font-pally"
                        : "text-xl flex items-center gap-3 flex-row text-pwaccent-600 font-pally"
                    }
                  >
                    {stockOptionsOpen ? (
                      <BsDash size={25} />
                    ) : (
                      <BsPlus size={25} />
                    )}
                    <p>Add Stock Option</p>
                  </div>
                }
              >
                <div className="my-5">
                  <label className="uppercase text-lg z-0 font-pally">
                    color
                  </label>
                  <div className="relative z-30 transition-all ease-in-out duration-500 bg-pwgray-200 border border-pwgray-400 border-1 w-full rounded-lg drop-shadow-lg form-control outline-none focus:outline focus:outline-[3px] focus:outline-offset-0 focus:outline-pwaccent-400 hover:outline hover:outline-2 hover:outline-offset-0 hover:outline-pwgray-400">
                    <AsyncSelect
                      styles={{
                        menuList: (baseStyles, state) => ({
                          ...baseStyles,
                          maxHeight: "200px",
                          overflowY: "scroll",
                        }),
                        control: (baseStyles) => ({
                          ...baseStyles,
                          height: "45px",
                        }),
                      }}
                      onChange={(c) => setColor(c)}
                      defaultOptions={true}
                      placeholder={"Type in a color to search"}
                      loadOptions={(inputValue, callback) => {
                        callback(() => {
                          const temp = colorList.map((namedColor) => {
                            return {
                              label: (
                                <div className="flex flex-row gap-5 items-center">
                                  <span
                                    style={{
                                      width: "20px",
                                      height: "20px",
                                      borderRadius: "20px",
                                      background: namedColor?.hex,
                                    }}
                                    className="flex items-center justify-center"
                                  ></span>
                                  <span className="font-pally capitalize">
                                    {namedColor?.name}
                                  </span>
                                </div>
                              ),
                              value: namedColor,
                            };
                          });

                          return temp.filter((tempColor) => {
                            return tempColor?.value?.name
                              .toLocaleLowerCase()
                              .includes(inputValue.toLocaleLowerCase());
                          });
                        });
                      }}
                    />
                  </div>
                </div>

                <div className="my-5">
                  <label htmlFor={"sizes"} className="uppercase text-lg">
                    Product Size *
                  </label>
                  <div className="-mt-6 mb-4">
                    <SegmentedControl
                      options={["Letters", "Numbers"]}
                      setChoice={setSizeType}
                    />
                  </div>
                  <div>
                    {sizeType == "Numbers" ? (
                      <FormInput
                        name={"Size *"}
                        type={"number"}
                        min={1}
                        setSize={setSize}
                      />
                    ) : (
                      <div
                        className="flex flex-row flex-wrap z-1 font-pally gap-5"
                        id="sizes"
                      >
                        <RadioInput
                          name={"sizes"}
                          value={"XXS"}
                          reason={size}
                          setReason={setSize}
                        />
                        <RadioInput
                          name={"sizes"}
                          value={"XS"}
                          reason={size}
                          setReason={setSize}
                        />
                        <RadioInput
                          name={"sizes"}
                          value={"S"}
                          reason={size}
                          setReason={setSize}
                        />
                        <RadioInput
                          name={"sizes"}
                          value={"M"}
                          reason={size}
                          setReason={setSize}
                        />
                        <RadioInput
                          name={"sizes"}
                          value={"L"}
                          reason={size}
                          setReason={setSize}
                        />
                        <RadioInput
                          name={"sizes"}
                          value={"XL"}
                          reason={size}
                          setReason={setSize}
                        />
                        <RadioInput
                          name={"sizes"}
                          value={"XXL"}
                          reason={size}
                          setReason={setSize}
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div
                  className="z-0 mb-5"
                  style={{ zIndex: 20, position: "relative" }}
                >
                  <FormInput
                    name="Quantity *"
                    type={"number"}
                    min={1}
                    setQuantity={setQuantity}
                  />
                </div>
                <div className=" mb-5 justify-end flex">
                  <span
                    onClick={() => {
                      if (customizable.length <= 0) {
                        setFillError(false);
                        if (quantity && size) {
                          setOptions([
                            ...options,
                            {
                              id: options.length,
                              color: color?.value,
                              size,
                              quantity,
                            },
                          ]);
                        } else {
                          setFillError(true);
                        }
                      }
                    }}
                  >
                    <Button
                      mode={"normal"}
                      text={"Add"}
                      icon={<BsPlusSquareDotted size={20} />}
                    />
                  </span>
                </div>
              </Collapsible>
            </div>
          </div>
          <div
            className={
              reqErr
                ? "flex font-pally text-lg text-pwdanger-300 opacity-100 transition ease-in-out duration-500"
                : "opacity-0 flex font-pally text-lg text-pwdanger-300 transition ease-in-out duration-500"
            }
          >
            An error occured. Please try again later.
          </div>
          <div
            className={
              fillError
                ? "flex font-pally text-lg text-pwdanger-300 opacity-100 transition ease-in-out duration-500"
                : "opacity-0 flex font-pally text-lg text-pwdanger-300 transition ease-in-out duration-500"
            }
          >
            Please fill in all the required fields marked with *.
          </div>
          <div
            className={
              imageLimit
                ? "flex font-pally text-lg text-pwdanger-300 block transition ease-in-out duration-500"
                : "hidden flex font-pally text-lg text-pwdanger-300 transition ease-in-out duration-500"
            }
          >
            You can only add 5 other images.
          </div>
          <span
            className="mx-auto flex w-fit h-14 my-8"
            onClick={() => {
              if (otherImages.length > 5) {
                setImageLimit(true);
              } else {
                setImageLimit(false);

                if (
                  mainImage[0] !== undefined &&
                  mainImage !== [] &&
                  productName !== "" &&
                  selectedCategories[0] !== undefined &&
                  price > 0 &&
                  ((customizable.length > 0 && options.length <= 0) ||
                    (customizable.length <= 0 && options.length > 0))
                ) {
                  setFillError(false);
                  const newProduct = {
                    image: mainImage[0],
                    images: otherImages,
                    name: productName,
                    price,
                    category: selectedCategories[0].value,
                    description,
                    customizable: customizable.length > 0 ? true : false,
                    isAvailable: status.value === "Available" ? true : false,
                  };

                  const formData = new FormData();

                  for (const [key, value] of Object.entries(newProduct)) {
                    if (key == "images") {
                      for (let i = 0; i < newProduct.images.length; i++) {
                        formData.append("images", newProduct.images[i]);
                      }
                    } else {
                      formData.append(key, value);
                    }
                  }

                  const merchantToken = token;

                  trackPromise(
                    fetch(`${baseURL}/product/${productId}`, {
                      method: "PATCH",
                      headers: {
                        Authorization: `Bearer ${merchantToken}`,
                      },
                      body: formData,
                    })
                      .then((res) => {
                        res.json().then((data) => {
                          if (data.success == false) {
                            setReqErr(true);
                          } else {
                            const tempOptions = [];

                            options.map((d) => {
                              tempOptions.push({
                                color: d.color?.hex,
                                sizes: [
                                  {
                                    size: d.size,
                                    quantity: parseInt(d.quantity),
                                  },
                                ],
                              });
                            });

                            fetch(`${baseURL}/product/stock/${productId}`, {
                              method: "POST",
                              headers: {
                                Authorization: `Bearer ${merchantToken}`,
                                "Content-Type": "application/json",
                              },
                              body: JSON.stringify({
                                options: tempOptions,
                              }),
                            })
                              .then((res) =>
                                res.json().then((data3) => {
                                  const options = data3.options;

                                  const temp = products;
                                  temp.push({
                                    image: data3?.product?.image,
                                    otherImages: data3?.product?.images,
                                    productName: data3?.product?.name,
                                    price: data3?.product?.price,
                                    category: {
                                      label: selectedCategories[0].label,
                                      value: selectedCategories[0].value,
                                    },
                                    description: data3?.product?.description,
                                    isAvailable: data3?.product?.isAvailable,
                                    customizable: data3?.product?.customizable,
                                    options,
                                  });
                                  setProducts(temp);
                                  router.push("/products");
                                })
                              )
                              .catch((error) => console.error(error));
                          }
                        });
                      })
                      .catch((error) => console.error(error))
                  );
                } else {
                  setFillError(true);
                }
              }
            }}
          >
            <Button mode={"normal"} text={"Submit"} size={"lg"} />
          </span>
        </div>
      </div>
    </>
  );
};

export default EditProduct;
