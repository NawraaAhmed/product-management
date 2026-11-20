import { useState, useEffect } from "react";
import { Link } from "react-router";
import { getStatistics, getLowStockProducts } from "../services/productService";

function Statistics() {
  const [stats, setStats] = useState(null);
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function loadData() {
    try {
      const statsData = await getStatistics();
      const lowStockData = await getLowStockProducts();
      setStats(statsData);
      setLowStockProducts(lowStockData);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div>
      <h1>Inventory Statistics</h1>

      <div>
        <p>Total Products: {stats.totalProducts}</p>
        <p>Total Value: BHD{stats.totalValue.toFixed(2)}</p>
        <p>Low Stock Items: {stats.lowStockItems}</p>
      </div>

      <h2>Low Stock Products (quantity below 3)</h2>

      {lowStockProducts.length === 0 ? (
        <p>No products are low on stock</p>
      ) : (
        lowStockProducts.map((product) => (
          <div key={product._id}>
            <p>
              {product.title}: {product.quantity} left
            </p>
            <Link to={`/products/${product._id}`}>See Details</Link>
          </div>
        ))
      )}
    </div>
  );
}

export default Statistics;
