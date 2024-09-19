import Homepage from "../../../components/Homepage";
import EditProduct from "../../../components/EditProduct";

const editproduct = ({ ...pageProps }) => {
  return (
    <Homepage>
      <EditProduct {...pageProps} />
    </Homepage>
  );
};

export default editproduct;
