import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { updateProduct, getProductById } from "../services/productService";

function EditProduct() {
  const [formData, setFormData] = useState({
    name: "",
    age: 0,
    breed: "",
  });
  const [error, setError] = useState(null);
  const { productId } = useParams();

  async function loadProduct() {
    const response = await getProductById(productId);
    setFormData(response);
  }

  useEffect(() => {
    loadProduct();
  }, []);

  const navigate = useNavigate();

  function handleChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await updateProduct(productId, formData);
      navigate("/products");
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
        />

        <button>Create Product</button>
      </form>

      <p className="error">{error}</p>
    </div>
  );
}

export default EditProduct;
