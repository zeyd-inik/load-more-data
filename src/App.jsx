import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [loading, setLoading] = useState(false);
  const [amountClick, setAmountClick] = useState(0);
  const [myProducts, setMyProducts] = useState([]);
  const [buttonDisable, setButtonDisable] = useState(false);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://dummyjson.com/products?limit=20&skip=${
          amountClick === 0 ? 0 : amountClick * 20
        }`
      );
      const data = await res.json();

      const { products } = data;
      if (products && products.length) {
        setMyProducts((prevValue) => {
          return [...prevValue, ...products];
        });
        setLoading(false);
        console.log(products);
      }
    } catch (error) {
      console.log(error);
      setError(true);
      setLoading(false);
    }
  };
  useEffect(() => {
    if (myProducts && myProducts.length === 100) setButtonDisable(true);
  }, [myProducts]);

  useEffect(() => {
    fetchData();
  }, [amountClick]);
  if (loading) {
    return <div className="loading">Loading...</div>;
  }
  if (error) {
    return <div className="error">Occurred an error!</div>;
  }
  return (
    <>
      <div className="wrapper">
        {myProducts && myProducts.length
          ? myProducts.map((product) => {
              return (
                <div
                  key={product.id}
                  className="product-box"
                >
                  <img
                    className="image"
                    src={product.thumbnail}
                    alt={product.description}
                  />
                  <span className="desc">{product.title}</span>
                </div>
              );
            })
          : null}
      </div>
      <button
        disabled={buttonDisable}
        onClick={() => {
          setAmountClick(amountClick + 1);
        }}
        className="btn"
      >
        Load More Date
      </button>
    </>
  );
}

export default App;
