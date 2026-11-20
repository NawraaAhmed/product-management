import { useState, useEffect } from "react";
import { Link } from "react-router";
import { getAllProducts } from "../services/productService";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  async function loadProducts() {
    try {
      const response = await getAllProducts();
      setProducts(response);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>All Products</h1>

      {products.map((oneProduct) => (
        <div key={oneProduct._id}>
          <p>Title: {oneProduct.title}</p>
          <Link to={`/products/${oneProduct._id}`}>See Details</Link>
        </div>
      ))}

      <p>{error}</p>
    </div>
  );
}

export default ProductList;
