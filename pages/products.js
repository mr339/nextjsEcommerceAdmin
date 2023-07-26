import React from "react";
import Layout from "@/components/Layout";
import Link from "next/link";

const Products = () => {
  return <Layout>
    <Link className="bg-green-900 text-white px-1 py-1 rounded-md" href={'/products/new'}>Add new product</Link>
  </Layout>;
};

export default Products;
