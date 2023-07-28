import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import ProductForm from "@/components/ProductForm";

const EditProductPage = () => {
  const router = useRouter();
  const { _id } = router.query;
  const [productInfo, setProductInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!_id) {
      return;
    }
    axios.get("/api/products?id=" + _id).then((response) => {
      setProductInfo(response.data);
      setIsLoading(false); // Data has been fetched, so set isLoading to false
    });
  }, [_id]);

  return (
    <Layout>
      {isLoading ? (
        <div>Loading...</div> // Show a loading indicator while data is fetched
      ) : (
        <>{productInfo && <ProductForm {...productInfo} />}</>
      )}
    </Layout>
  );
};

export default EditProductPage;
