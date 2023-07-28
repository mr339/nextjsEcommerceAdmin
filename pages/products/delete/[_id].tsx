import Layout from "@/components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

// Define the type for the product object
type ProductInfo = {
  _id: string;
  title: string;
  description: string;
  price: number;
};

const DeleteProductPage = () => {
  const router = useRouter();
  const [productInfo, setProductInfo] = useState<ProductInfo | null>(null); // Use the defined type
  const { _id } = router.query;
  useEffect(() => {
    if (!_id) {
      return;
    }
    axios.get("/api/products?id=" + _id).then((response) => {
      setProductInfo(response.data);
    });
  }, [_id]);

  function goBack() {
    router.push("/products");
  }

  async function deleteProduct() {
    await axios.delete("/api/products?id=" + _id);
    goBack();
  }

  return (
    <Layout>
      <h1 className="text-center">
        {" "}
        Do you realy want to delete "{productInfo?.title}" ?
      </h1>
      <div className="flex gap-2 justify-center">
        <button className="btn-red" onClick={deleteProduct}>
          Yes
        </button>
        <button className="btn-default" onClick={goBack}>
          No
        </button>
      </div>
    </Layout>
  );
};

export default DeleteProductPage;
