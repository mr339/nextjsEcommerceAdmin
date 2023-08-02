import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import axios from "axios";
import { withSwal } from "react-sweetalert2";

const Categories = ({ swal }: any) => {
  const [editedCategory, setEditedCategory] = useState<any>(null);
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState([]);
  const [parentCategory, setParentCategory] = useState("");

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
    const data: any = { categoryName, parentCategory };
    if (editedCategory) {
      data._id = editedCategory._id;
      await axios.put("/api/categories", data);
      setEditedCategory(null);
    } else {
      await axios.post("/api/categories", data);
    }
    setCategoryName("");
    fetchCategory();
  };

  const editCategory = (category: any) => {
    setEditedCategory(category);
    setCategoryName(category.categoryName);
    setParentCategory(category.parent?._id);
  };

  const deleteCategory = (category: any) => {
    swal
      .fire({
        title: "Are you sure?",
        text: `Do you want to delete ${category.categoryName}?`,
        showCancelButton: true,
        cancelButtontext: "Cancel",
        confirmButtonText: "Yes, Delete!",
        confirmButtonColor: "#d55",
        reverseButtons: true,
      })
      .then(async (result: any) => {
        if (result.isConfirmed) {
          const { _id } = category;
          await axios.delete("/api/categories?_id=" + _id);
          fetchCategory();
        }
      });
  };

  return (
    <Layout>
      <h1>Categories</h1>
      <label>
        {editedCategory ? "Edit category name" : "Create New Category"}
      </label>
      <form onSubmit={saveCategory} className="flex gap-1">
        <input
          className="mb-0"
          type="text"
          placeholder="Category name"
          value={categoryName}
          onChange={(ev) => setCategoryName(ev.target.value)}
        />
        <select
          className="mb-0"
          value={parentCategory}
          onChange={(ev) => setParentCategory(ev.target.value)}
        >
          <option value="">No parent category</option>
          {categories.length > 0 &&
            categories.map((category: any) => (
              <option key={category._id} value={category._id}>
                {category.categoryName}
              </option>
            ))}
        </select>
        <button type="submit" className="btn-primary py-1">
          Save
        </button>
      </form>
      <table className="basic mt-4">
        <thead>
          <tr>
            <td>Category Name</td>
            <td>Parent Category</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 &&
            categories.map((category: any) => (
              <tr key={category._id}>
                <td>{category.categoryName}</td>
                <td>{category?.parent?.categoryName}</td>
                <td>
                  <button
                    className="btn-primary mr-1"
                    onClick={() => editCategory(category)}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteCategory(category)}
                    className="btn-primary"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default withSwal(({ swal }: any, ref: any) => (
  <Categories swal={swal} />
));
