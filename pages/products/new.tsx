import React from "react";

import ProductForm from "@/components/ProductForm";
import Layout from "@/components/Layout";

const NewProducts = () => {
  return (
    <Layout>
      <h1>New product</h1>
      <ProductForm />
    </Layout>
  );
};

export default NewProducts;
