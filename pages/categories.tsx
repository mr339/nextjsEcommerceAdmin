import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import axios from "axios";
import { withSwal } from "react-sweetalert2";
import { platform } from "os";

const Categories = ({ swal }: any) => {
  const [editedCategory, setEditedCategory] = useState<any>(null);
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState([]);
  const [parentCategory, setParentCategory] = useState("");
  const [properties, setproperties] = useState<any>([]);

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
    const data: any = {
      categoryName,
      parentCategory,
      properties: properties.map((p: any) => ({
        name: p.name,
        values: p.values.split(","),
      })),
    };
    if (editedCategory) {
      data._id = editedCategory._id;
      await axios.put("/api/categories", data);
      setEditedCategory(null);
    } else {
      await axios.post("/api/categories", data);
    }
    setCategoryName("");
    setParentCategory("");
    setproperties([]);
    fetchCategory();
  };

  const editCategory = (category: any) => {
    console.log(category);
    setEditedCategory(category);
    setCategoryName(category.categoryName);
    setParentCategory(category.parent?._id);
    setproperties(
      category.properties.map(({ name, values }: any) => ({
        name,
        values: values.join(","),
      }))
    );
  };

  const addProperty = () => {
    setproperties((prev: any) => {
      return [...prev, { name: "", values: "" }];
    });
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

  const handlePropertyNameChange = (
    index: any,
    property: any,
    newName: any
  ) => {
    setproperties((prev: any) => {
      const properties = [...prev];
      properties[index].name = newName;
      return properties;
    });
  };

  const handlePropertyValueChange = (
    index: any,
    property: any,
    newValues: any
  ) => {
    setproperties((prev: any) => {
      const properties = [...prev];
      properties[index].values = newValues;
      return properties;
    });
  };

  const removeProperty = (indexToRemove: any) => {
    setproperties((prev: any) => {
      return [...prev].filter((p, pIndex) => {
        return pIndex !== indexToRemove;
      });
    });
  };

  return (
    <Layout>
      <h1>Categories</h1>
      <label>
        {editedCategory ? "Edit category name" : "Create New Category"}
      </label>
      <form onSubmit={saveCategory}>
        <div className="flex gap-1">
          <input
            type="text"
            placeholder="Category name"
            value={categoryName}
            onChange={(ev) => setCategoryName(ev.target.value)}
          />
          <select
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
        </div>
        <div className="mb-2">
          <label className="block">Properties</label>
          <button
            type="button"
            onClick={addProperty}
            className="btn-default text-sm mb-2"
          >
            Add new property
          </button>
          {properties.length > 0 &&
            properties.map((property: any, index: any) => (
              <div key={index} className="flex gap-1 mb-2">
                <input
                  value={property.name}
                  className="mb-0"
                  onChange={(ev) =>
                    handlePropertyNameChange(index, property, ev.target.value)
                  }
                  type="text"
                  placeholder="Property name (example: color)"
                />
                <input
                  value={property.values}
                  className="mb-0"
                  type="text"
                  onChange={(ev) =>
                    handlePropertyValueChange(index, property, ev.target.value)
                  }
                  placeholder="values, comma separated"
                />
                <button
                  className="btn-default"
                  type="button"
                  onClick={() => removeProperty(index)}
                >
                  Remove
                </button>
              </div>
            ))}
        </div>
        <div className="flex gap-1">
          {editedCategory && (
            <button
              type="button"
              onClick={() => {
                setEditedCategory(null),
                  setCategoryName(""),
                  setParentCategory(""),
                  setproperties([]);
              }}
              className="btn-default"
            >
              Cancle
            </button>
          )}
          <button type="submit" className="btn-primary py-1">
            Save
          </button>
        </div>
      </form>
      {!editedCategory && (
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
      )}
    </Layout>
  );
};

export default withSwal(({ swal }: any, ref: any) => (
  <Categories swal={swal} />
));
