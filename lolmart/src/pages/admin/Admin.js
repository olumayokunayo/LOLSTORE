import React from 'react'
import styles from './Admin.module.scss'
import Navbar from '../../component/admin/navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from '../../component/admin/home/Home'
import AddProduct from '../../component/admin/addProduct/AddProduct'
import Orders from '../../component/admin/orders/Orders'
import ViewProducts from '../../component/admin/allProducts/viewProducts'
const Admin = () => {
  return (
    <div className={styles.admin}>
        <div className={styles.navbar}>
            <Navbar />
        </div>
        <div className={styles.content}>
            <Routes>
                <Route path='home' element={<Home />} />
                <Route path='add-product/:id' element={<AddProduct />} />
                <Route path='all-products' element={<ViewProducts />} />
                <Route path='orders' element={<Orders />} />
            </Routes>
        </div>
    </div>
  )
}

export default Admin