import Graph from "./Graph";
import Button from "./Button";
import ProductRow from "./ProductRow";
import ProgressRing from "./ProgressRing";
import { BsPlusSquareDotted, BsWallet, BsBag } from "react-icons/bs";
import StatCard from "./StatCard";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";

const Dashboard = ({ ...pageProps }) => {
  const router = useRouter();
  const { products, token, merchant } = pageProps;
  const [sortedProducts, setSortedProducts] = useState([]);
  const [totalSales, setTotalSales] = useState(0.0);

  const OrdersInProgress = 1;

  useEffect(() => {
    if (!merchant || !token) {
      router.push("/signin");
    }
  });

  useEffect(() => {
    const temp = [];
    products?.map((p) => temp.push(p.quantity || 0));
    temp.sort((a, b) => b - a);

    const sortedTemp = [];
    for (let i = 0; i < temp.length; i++) {
      for (let j = 0; j < products.length; j++) {
        if (
          products[j].quantity === temp[i] &&
          !sortedTemp.includes(products[j])
        ) {
          sortedTemp.push(products[j]);
        }
      }
    }
    setSortedProducts(sortedTemp);

    temp = 0;
    products?.map((p) => (temp += p.price));
    setTotalSales(temp);
  }, [products]);

  //sales per month but weekly

  const data = {
    // Dec: 50,
    // Jan: 50,
    // Feb: 20,
    // Apr: 40,
    // May: 50,
    // Jul: 60,
  };

  return (
    <>
      <div className="overflow-x-hidden">
        <div className="font-excon text-3xl">Dashboard</div>
        <div className="font-pally text-md">
          Orders in progress:{" "}
          <span className="mx-4 px-5 bg-pwinfo-300 text-pwgray-100 rounded-xl">
            {OrdersInProgress?.length || 0}
          </span>
        </div>
        <div className="sm:grid sm:grid-flow-col sm:grid-rows-3 sm:grid-cols-3 gap-8 flex flex-wrap">
          {/*graph to be added later*/}

          <div className="sm:col-span-2 sm:row-span-2 w-full sm:max-w-[80rem] sm:max-h-[30rem] bg-pwgray-200/90 shadow my-2 sm:p-4 p-2 rounded-lg">
            <Graph sales={data} />
          </div>
          <div className="sm:col-span-1 sm:row-span-3 bg-pwgray-200/90 p-4 h-fit rounded-lg shadow m-2 relative">
            <div className="flex sm:w-fit gap-36">
              <span className="font-excon text-2xl mx-2">Top Sellers</span>
              <Link passHref href="/products/addproduct">
                <div>
                  <Button
                    text={"Add"}
                    icon={<BsPlusSquareDotted />}
                    mode="normal"
                  />
                </div>
              </Link>
            </div>
            {sortedProducts.length > 0 ? (
              sortedProducts.slice(0, 3).map((product) => {
                return <ProductRow key={product.id} product={product} />;
              })
            ) : (
              <div className="font-pally text-xl text-center my-2">
                No Products Sold
              </div>
            )}
            <Link passHref href="/products">
              <div className="text-center mt-4 -mx-4 -mb-4 p-4 text-pwinfo-300 cursor-pointer hover:bg-pwgray-300 transition ease-in-out duration-500">
                More
              </div>
            </Link>
          </div>
          <div className="sm:col-span-2 sm:row-span-1 sm:col-start-1 sm:row-start-3 items-center mx-auto sm:mx-0">
            <div className="flex sm:flex-row flex-col justify-between gap-4">
              <StatCard
                title={"total sales"}
                value={`GH₵ ${totalSales}`}
                rise={true}
                percentage={100}
                icon={<BsWallet size={30} color={"#ffffff"} />}
                accent={"bg-pwaccent-400"}
              />
              <StatCard
                title={"total products"}
                value={products ? products.length : 0}
                rise={true}
                percentage={100}
                icon={<BsBag size={30} color={"#ffffff"} />}
                accent={"bg-pwsecondary-300"}
              />
              {/* <div className="bg-pwgray-200/90 p-2 rounded-lg shadow w-36 mx-auto">
                <div className="font-excon text-md capitalize text-center">
                  progress
                </div>
                <div className="w-16 h-16 mx-auto mt-2 bg-pwgray-200/90">
                  <ProgressRing
                    radius={50}
                    stroke={8}
                    progress={faker.datatype.number(100)}
                  />
                </div>
                <div className="text-sm text-center font-pally">
                  Goal: {`GH₵ ${faker.commerce.price(10000, 100000)}`}
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
