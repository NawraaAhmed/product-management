import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { updateProduct, getProductById } from "../services/productService";

function EditProduct() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "other",
    price: "",
    quantity: "",
  });
  const [error, setError] = useState(null);
  const { productId } = useParams();

  async function loadProduct() {
    try {
      const response = await getProductById(productId);
      setFormData({ ...formData, ...response });
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  }

  useEffect(() => {
    loadProduct();
  }, [productId]);

  const navigate = useNavigate();

  function handleChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await updateProduct(productId, formData);
      navigate(`/products/${productId}`);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  }

  return (
    <div>
      <h1>Edit Product</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          name="title"
          id="title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <label htmlFor="description">Description:</label>
        <textarea
          name="description"
          id="description"
          value={formData.description}
          onChange={handleChange}
          maxLength={500}
        />

        <label htmlFor="category">Category:</label>
        <select
          name="category"
          id="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="electronics">Electronics</option>
          <option value="food">Food</option>
          <option value="clothing">Clothing</option>
          <option value="furniture">Furniture</option>
          <option value="other">Other</option>
        </select>

        <label htmlFor="price">Price:</label>
        <input
          type="number"
          step="0.01"
          min="0.1"
          name="price"
          id="price"
          value={formData.price}
          onChange={handleChange}
          required
        />

        <label htmlFor="quantity">Quantity:</label>
        <input
          type="number"
          min="0"
          name="quantity"
          id="quantity"
          value={formData.quantity}
          onChange={handleChange}
          required
        />

        <button>Save Changes</button>
      </form>

      <p className="error">{error}</p>
    </div>
  );
}

export default EditProduct;
