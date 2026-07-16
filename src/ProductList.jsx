import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import './ProductList.css';

const plantsData = [
  {
    category: 'Air Purifying Plants',
    plants: [
      { name: 'Snake Plant', image: 'https://cdn.pixabay.com/photo/2017/09/12/16/12/plant-2740214_1280.jpg', cost: '$15' },
      { name: 'Spider Plant', image: 'https://cdn.pixabay.com/photo/2018/09/12/12/32/spider-plant-3672121_1280.jpg', cost: '$12' },
      { name: 'Peace Lily', image: 'https://cdn.pixabay.com/photo/2020/03/03/22/23/peace-lily-4899284_1280.jpg', cost: '$18' },
      { name: 'Boston Fern', image: 'https://cdn.pixabay.com/photo/2016/11/21/16/05/fern-1845132_1280.jpg', cost: '$14' },
      { name: 'Rubber Plant', image: 'https://cdn.pixabay.com/photo/2019/07/09/15/45/rubber-plant-4326407_1280.jpg', cost: '$20' },
      { name: 'Areca Palm', image: 'https://cdn.pixabay.com/photo/2017/03/27/13/54/palm-2178119_1280.jpg', cost: '$22' },
    ],
  },
  {
    category: 'Succulents',
    plants: [
      { name: 'Aloe Vera', image: 'https://cdn.pixabay.com/photo/2016/11/21/16/54/aloe-vera-1845150_1280.jpg', cost: '$10' },
      { name: 'Echeveria', image: 'https://cdn.pixabay.com/photo/2017/07/16/10/13/echeveria-2508842_1280.jpg', cost: '$9' },
      { name: 'Jade Plant', image: 'https://cdn.pixabay.com/photo/2018/05/17/15/07/jade-plant-3408836_1280.jpg', cost: '$11' },
      { name: 'Haworthia', image: 'https://cdn.pixabay.com/photo/2019/06/11/13/57/haworthia-4266331_1280.jpg', cost: '$8' },
      { name: 'Sedum', image: 'https://cdn.pixabay.com/photo/2017/08/01/09/44/sedum-2564650_1280.jpg', cost: '$9' },
      { name: 'Zebra Plant', image: 'https://cdn.pixabay.com/photo/2018/07/16/19/28/haworthia-3542988_1280.jpg', cost: '$10' },
    ],
  },
  {
    category: 'Flowering Plants',
    plants: [
      { name: 'Orchid', image: 'https://cdn.pixabay.com/photo/2016/08/24/12/38/orchid-1616020_1280.jpg', cost: '$25' },
      { name: 'African Violet', image: 'https://cdn.pixabay.com/photo/2017/03/22/17/39/violet-2166976_1280.jpg', cost: '$13' },
      { name: 'Anthurium', image: 'https://cdn.pixabay.com/photo/2020/06/18/20/40/anthurium-5315605_1280.jpg', cost: '$19' },
      { name: 'Begonia', image: 'https://cdn.pixabay.com/photo/2018/07/25/09/59/begonia-3560503_1280.jpg', cost: '$14' },
      { name: 'Hibiscus', image: 'https://cdn.pixabay.com/photo/2016/11/29/05/45/hibiscus-1867072_1280.jpg', cost: '$17' },
      { name: 'Geranium', image: 'https://cdn.pixabay.com/photo/2017/06/06/19/25/geranium-2377934_1280.jpg', cost: '$12' },
    ],
  },
];

function ProductList() {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const [addedItems, setAddedItems] = useState({});
  const [showCart, setShowCart] = useState(false);

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedItems(prev => ({ ...prev, [plant.name]: true }));
  };

  return (
    <div className="product-list-container">
      <nav className="navbar">
        <div className="nav-logo">Paradise Nursery</div>
        <div className="nav-links">
          <a href="/">Home</a>
          <a href="#plants">Plants</a>
          <a href="#cart" onClick={() => setShowCart(true)}>
            Cart ({totalQuantity})
          </a>
        </div>
      </nav>

      <div className="products-section" id="plants">
        {plantsData.map((categoryItem) => (
          <div key={categoryItem.category} className="category-section">
            <h2>{categoryItem.category}</h2>
            <div className="plants-grid">
              {categoryItem.plants.map((plant) => (
                <div key={plant.name} className="plant-card">
                  <img src={plant.image} alt={plant.name} className="plant-thumbnail" />
                  <h3>{plant.name}</h3>
                  <p>{plant.cost}</p>
                  <button
                    className="add-to-cart-btn"
                    disabled={addedItems[plant.name]}
                    onClick={() => handleAddToCart(plant)}
                  >
                    {addedItems[plant.name] ? 'Added' : 'Add to Cart'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
