import AddProduct from "../../components/AddProduct";
import Homepage from "../../components/Homepage";

const addproduct = ({ pageProps }) => {
  return (
    <Homepage>
      <AddProduct {...pageProps} />
    </Homepage>
  );
};

export default addproduct;
