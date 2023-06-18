import React, { useEffect, useState } from "react";
import styles from "./ViewProducts.module.scss";
import Loader from "../../loader/Loader";
import { toast } from "react-toastify";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { query, orderBy } from "firebase/firestore";
import { db, storage } from "../../../firebase/config";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { deleteDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import Notiflix from "notiflix";
import { useDispatch, useSelector } from "react-redux";
import { STORE_PRODUCTS, selectProducts } from "../../../redux/slice/productSlice";
import { Link } from "react-router-dom";
import useFetchCollection from "../../../customHooks/useFetchCollection";

const ViewProducts = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts)

  const {data, isLoading} = useFetchCollection("products");

  useEffect(()=> {
           dispatch(
          STORE_PRODUCTS({
            products: data,
          })
        );
  },[dispatch, data])

  // custom hook takeover

  // const [products, setProducts] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   getProducts();
  // }, []);

  // const getProducts = () => {
  //   setIsLoading(true);
  //   try {
  //     const productsRef = collection(db, "products");
  //     const q = query(productsRef, orderBy("createdAt", "desc"));

  //     onSnapshot(q, (snapshot) => {
  //       const allProducts = snapshot.docs.map((doc) => ({
  //         id: doc.id,
  //         ...doc.data(),
  //       }));
  //       setProducts(allProducts);
  //       setIsLoading(false);

  //       dispatch(
  //         STORE_PRODUCTS({
  //           products: allProducts,
  //         })
  //       );
  //     });
  //   } catch (error) {
  //     setIsLoading(false);
  //     toast.error(error.message);
  //   }
  // };

  const confirmDelete = (id, imageURL) => {
    Notiflix.Confirm.show(
      "Delete Product",
      "You are about to delete this product?",
      "Delete",
      "Cancel",
      function okCb() {
        deleteProductHandler(id, imageURL);
      },
      function cancelCb() {
        console.log("Action cancelled.");
      },
      {
        width: "320px",
        borderRadius: "3px",
        titleColor: "orangered",
        okButtonBackground: "orangered",
        cssAnimationStyle: "zoom",
      }
    );
  };
  const deleteProductHandler = async (id, imageURL) => {
    try {
      await deleteDoc(doc(db, "products", id));
      const storageRef = ref(storage, imageURL);
      await deleteObject(storageRef)
        .then(() => {
          toast.success("Product deleted successfully.");
        })
        .catch((error) => {
          toast.error(error.message);
        });
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <>
      {isLoading && <Loader />}
      <div className={styles.table}>
        <h2>All products</h2>
        {products.length === 0 ? (
          <p>No products found</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>s/n</th>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            {products.map((product, index) => {
              const { name, imageURL, price, id, category } = product;
              return (
                <tbody>
                  <tr key={id}>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        src={imageURL}
                        alt={name}
                        style={{ width: "100px" }}
                      />
                    </td>
                    <td>{name}</td>
                    <td>{category}</td>
                    <td>{price}</td>
                    <td>
                      <Link to={`/admin/add-product/${id}`}>
                        <FaRegEdit size={18} color="green" />
                      </Link>
                      <MdDelete
                        size={20}
                        color="red"
                        onClick={() => confirmDelete(id, imageURL)}
                      />
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        )}
      </div>
    </>
  );
};

export default ViewProducts;
