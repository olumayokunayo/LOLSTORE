import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Home, Contact, Login, Register, Reset, Admin } from "./pages/";
import { Header, Footer } from "./component";
import AdminRouteOnly from "./component/adminOnlyRoute/AdminRouteOnly";
import ProductDetails from "./component/product/productDetails/ProductDetails";
function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<Reset />} />
          <Route
            path="/admin/*"
            element={
              <AdminRouteOnly>
                <Admin />
              </AdminRouteOnly>
            }
          />
          <Route path="/product-details/:id" element={<ProductDetails />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
