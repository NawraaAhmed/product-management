import { Route, Routes } from "react-router";
import ProductDetails from "./pages/ProductDetails";
import ProductList from "./pages/ProductList";
import Homepage from "./pages/Homepage";
import CreateProduct from "./pages/CreateProduct";
import EditProduct from "./pages/EditProduct";
import Navbar from "./components/Navbar";
import Statistics from "./pages/Statistics";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:productId" element={<ProductDetails />} />
        <Route path="/products/create" element={<CreateProduct />} />
        <Route path="/products/:productId/edit" element={<EditProduct />} />
        <Route path="/statistics" element={<Statistics />} />
      </Routes>
    </div>
  );
}

export default App;
