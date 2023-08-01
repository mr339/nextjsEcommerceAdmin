import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import axios from "axios";

const Categories = () => {
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategory();
  }, []);

  const fetchCategory = () => {
    axios.get("/api/categories").then((result) => {
      setCategories(result.data);
    });
  };

  const saveCategory = async (ev: any) => {
    ev.preventDefault();
    await axios.post("/api/categories", { categoryName });
    setCategoryName("");
    fetchCategory();
  };

  return (
    <Layout>
      <h1>Categories</h1>
      <label>New category name</label>
      <form onSubmit={saveCategory} className="flex gap-1">
        <input
          className="mb-0"
          type="text"
          placeholder="Category name"
          value={categoryName}
          onChange={(ev) => setCategoryName(ev.target.value)}
        />
        <button type="submit" className="btn-primary py-1">
          Save
        </button>
      </form>
      <table className="basic mt-4">
        <thead>
          <tr>
            <td>Category Name</td>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 &&
            categories.map((category: any) => (
              <tr key={category._id}>
                <td>{category.categoryName}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default Categories;
