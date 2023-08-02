import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Spinner from "@/components/Spinner";
import { ReactSortable } from "react-sortablejs";

const ProductForm = ({
  _id,
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
  images: existingImages,
  category: assingedCategory,
}: any) => {
  const [title, setTitle] = useState(existingTitle || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [price, setPrice] = useState(existingPrice || "");
  const [categories, setCategories] = useState([]);
  const [gotoProducts, setGotoProducts] = useState(false);
  const [images, setImages] = useState(existingImages || []);
  const [category, setCategory] = useState(assingedCategory || "");
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    axios.get("/api/categories").then((result: any) => {
      setCategories(result.data);
    });
  }, []);

  const saveProduct = async (ev: any) => {
    ev.preventDefault();
    const data = { title, description, price, images, category };
    if (_id) {
      await axios.put("/api/products", { ...data, _id });
    } else {
      await axios.post("/api/products", data);
    }
    setGotoProducts(true);
  };

  if (gotoProducts) {
    router.push("/products");
  }

  const uploadImages = async (ev: any) => {
    const files = ev.target?.files;
    if (files.length > 0) {
      setIsUploading(true);
      const data = new FormData();
      for (const file of files) {
        data.append("file", file);
      }
      const res = await axios.post("/api/upload", data);
      setImages((oldImages: any) => {
        return [...oldImages, ...res.data.links];
      });
      setIsUploading(false);
    }
  };

  const sortImagesOrder = (images: any) => {
    setImages(images);
  };

  return (
    <form onSubmit={saveProduct}>
      <label>Product</label>
      <input
        type="text"
        placeholder="Please enter product"
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
      />
      <label>Category</label>
      <select value={category} onChange={(ev) => setCategory(ev.target.value)}>
        <option value="">Uncategorized</option>
        {categories.length > 0 &&
          categories.map((c: any) => (
            <option value={c._id} key={c._id}>
              {c?.categoryName}
            </option>
          ))}
      </select>
      <label>Photos</label>
      <div className="mb-2 flex flex-wrap gap-1">
        <ReactSortable
          className="flex flex-wrap gap-1"
          list={images}
          setList={sortImagesOrder}
        >
          {!!images.length &&
            images.map((link: any) => (
              <div className="h-24" key={link}>
                <img src={link} alt="" className="rounded-lg" />
              </div>
            ))}
        </ReactSortable>
        {isUploading && (
          <div className="h-24 rounded-lg flex items-center">
            <Spinner />
          </div>
        )}
        <label className="w-24 h-24 text-center flex flex-col cursor-pointer items-center justify-center text-sm gap-1 text-gray-500 rounded-lg bg-gray-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m0-3l-3-3m0 0l-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-.75"
            />
          </svg>
          <div>Upload</div>
          <input type="file" onChange={uploadImages} className="hidden" />
        </label>
      </div>
      <label>Description</label>
      <textarea
        placeholder="Description"
        value={description}
        onChange={(ev) => setDescription(ev.target.value)}
      />
      <label>Price</label>
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(ev) => setPrice(ev.target.value)}
      />
      <button type="submit" className="btn-primary">
        Save
      </button>
    </form>
  );
};

export default ProductForm;
