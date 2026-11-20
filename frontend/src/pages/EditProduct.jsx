import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { updateProduct, getProductById } from "../services/productService";

function EditProduct() {
  const [formData, setFormData] = useState({
    name: "",
    age: 0,
    breed: "",
  });
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
    const updatedProduct = await updateProduct(productId, formData);
    navigate("/products");
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
    </div>
  );
}

export default EditProduct;
