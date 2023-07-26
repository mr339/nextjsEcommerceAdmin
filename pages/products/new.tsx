import React, { useState } from "react";
import Layout from "@/components/Layout";
import Link from "next/link";
import axios from 'axios';

const NewProducts = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');

    const createProduct = async () =>{
     const data = {title, description, price}
    await axios.post('/api/products',data)
    };

  return <Layout>
    <form onSubmit={createProduct}>
    <h1>New product</h1>
    <label>Product</label>
    <input type="text" placeholder="Please enter product" value={title} onChange={ev=> setTitle(ev.target.value)}/>
    <label>Description</label>
    <textarea placeholder="Description" value={description} onChange={ev=> setDescription(ev.target.value)}/>
    <label>Price</label>
    <input type="number" placeholder="Price" value={price} onChange={ev=> setPrice(ev.target.value)}/>
    <button type="submit" className="btn-primary">Save</button>

    </form>
  </Layout>;
};

export default NewProducts;
