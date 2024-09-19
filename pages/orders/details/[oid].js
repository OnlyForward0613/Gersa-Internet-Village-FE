import Homepage from "../../../components/Homepage";
import OrderDetails from "../../../components/OrderDetails";

const orderdetails = ({ ...pageProps }) => {
  return (
    <Homepage>
      <OrderDetails {...pageProps} />
    </Homepage>
  );
};

export default orderdetails;
