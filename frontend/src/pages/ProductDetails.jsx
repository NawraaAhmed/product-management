import { useParams, Link, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { getProductById, deleteProduct } from "../services/productService";

function ProductDetails() {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { productId } = useParams();

  async function loadProduct() {
    try {
      const response = await getProductById(productId);
      setProduct(response);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  }

  const navigate = useNavigate();

  async function handleDeleteProduct() {
    await deleteProduct(productId);
    navigate("/products");
  }

  useEffect(() => {
    loadProduct();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Product Details</h1>

      {product ? (
        <>
          <p>Title: {product.title}</p>
          <p>Description: {product.description}</p>
          <p>Category: {product.category}</p>
          <p>Price: BHD{product.price}</p>
          <p>Quantity: {product.quantity}</p>

          <Link to={`/products/${product._id}/edit`}>Edit Product</Link>
          <button onClick={handleDeleteProduct}>Delete Product</button>
        </>
      ) : null}
      <p className="error">{error}</p>
    </div>
  );
}

export default ProductDetails;
