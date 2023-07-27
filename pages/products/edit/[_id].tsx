import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";

const EditProductPage = () => {
  const router = useRouter();
  const { _id } = router.query;
  console.log(_id);
  return <Layout>edit</Layout>;
};

export default EditProductPage;
