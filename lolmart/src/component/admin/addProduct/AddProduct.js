import React, { useState } from "react";
import styles from "./AddProduct.module.scss";
import Card from "../../card/Card";
import { storage } from "../../../firebase/config";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { toast } from "react-toastify";
import { collection, addDoc, Timestamp, doc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Loader from "../../loader/Loader";
import { useSelector } from "react-redux";
import { selectProducts } from "../../../redux/slice/productSlice";

const initialState = {
  name: "",
  imageURL: "",
  price: 0,
  category: "",
  brand: "",
  desc: "",
};

const categories = [
  { id: 1, name: "Laptop" },
  { id: 2, name: "Electronics" },
  { id: 3, name: "Fashion" },
  { id: 4, name: "Phones" },
];

const detectForm = (id, f1, f2) => {
  if (id === "ADD") {
    return f1;
  }
  return f2;
};

const AddProduct = () => {
  const { id } = useParams();
  const products = useSelector(selectProducts);
  const navigate = useNavigate();

  const productEdit = products.find((item) => item.id === id);
  console.log(productEdit);
  const defaultProduct = { ...initialState };

  const [product, setProduct] = useState(() => {
    const newState = detectForm(
      id,
      defaultProduct,
      productEdit || defaultProduct
    );
    return newState;
  });

  const [uploadProgress, setUploadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const storageRef = ref(storage, `lolmart/${Date.now()} ${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.floor(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setUploadProgress(progress);
      },
      (error) => {
        toast.error(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setProduct({ ...product, imageURL: downloadURL });
          toast.success("Image uploaded successfully.");
        });
      }
    );
  };

  const addProductHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const docRef = await addDoc(collection(db, "products"), {
        name: product.name,
        imageURL: product.imageURL,
        price: Number(product.price),
        category: product.category,
        brand: product.brand,
        desc: product.desc,
        createdAt: Timestamp.now().toDate(),
      });
      toast.success("Product uploaded successfully.");
      setIsLoading(false);
      setProduct({ ...initialState });
      navigate("/admin/all-products");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const editProductHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (product.imageURL !== productEdit.imageURL) {
      const storageRef = ref(storage, productEdit.imageURL);
      await deleteObject(storageRef);
    }
    try {
      await setDoc(doc(db, "products", id), {
        name: product.name,
        imageURL: product.imageURL,
        price: Number(product.price),
        category: product.category,
        brand: product.brand,
        desc: product.desc,
        createdAt: productEdit.createdAt,
        editedAt: Timestamp.now().toDate(),
      });
      setIsLoading(false);
      toast.success("Product Edited Successfully.");
      navigate("/admin/all-products");
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className={styles.product}>
        <h2>{detectForm(id, "Add product", "Edit product")}</h2>
        <Card className={styles.card}>
          <form
            onSubmit={detectForm(id, addProductHandler, editProductHandler)}
          >
            <label>Product name:</label>
            <input
              type="text"
              placeholder="Product name"
              required
              name="name"
              value={product.name}
              onChange={(e) => handleInputChange(e)}
            />
            <label>Product image:</label>
            <Card className={styles.group}>
              {uploadProgress === 0 ? null : (
                <div className={styles.progress}>
                  <div
                    className={styles["progress-bar"]}
                    style={{ width: `${uploadProgress}%` }}
                  >
                    {uploadProgress < 100
                      ? `Uploading ${uploadProgress}`
                      : `Upload Complete ${uploadProgress}%`}
                  </div>
                </div>
              )}

              <input
                type="file"
                accept="image/*"
                placeholder="Product Image"
                name="imageURL"
                onChange={(e) => handleImageChange(e)}
              />
              {product.imageURL === "" ? null : (
                <input
                  type="text"
                  name="imageURL"
                  value={product.imageURL}
                  placeholder="Image URL"
                  disabled
                />
              )}
            </Card>
            <label>Product price:</label>
            <input
              type="number"
              placeholder="Product Price"
              required
              name="price"
              value={product.price}
              onChange={(e) => handleInputChange(e)}
            />
            <label>Product category:</label>
            <select
              name="category"
              value={product.category}
              required
              onChange={(e) => handleInputChange(e)}
            >
              <option value="" disabled>
                -- Choose Product Category --
              </option>
              {categories.map((cat) => {
                return (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                );
              })}
            </select>
            <label>Product company/ brand:</label>
            <input
              type="text"
              placeholder="Product Brand"
              name="brand"
              value={product.brand}
              required
              onChange={(e) => handleInputChange(e)}
            />
            <label>Product description:</label>
            <textarea
              rows={10}
              cols={30}
              placeholder="Product Category"
              name="desc"
              value={product.desc}
              required
              onChange={(e) => handleInputChange(e)}
            />
            <button className="--btn --btn-primary">
              {detectForm(id, "Save Product", "Edit Product")}
            </button>
          </form>
        </Card>
      </div>
    </>
  );
};

export default AddProduct;
