import React, { useState, useEffect } from 'react';
import './Add.css';
import { assets } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const Add = ({ url }) => {
  const [image, setImage] = useState(false);
  const [menuImage, setMenuImage] = useState(false);
  const [category, setCategory] = useState([]);

  const [data, setData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
  });

  const [menu, setMenu] = useState({
    menu_name: '',
  });

  // Fetch dynamic categories from server
  const fetchCategory = async () => {
    try {
      const response = await axios.get(`${url}/api/menu/list`);
      if (response.data.success) {
        setCategory(response.data.data || []);
        setData((prev) => ({
          ...prev,
          category: response.data.data[0]?.menu_name || '',
        }));
      }
    } catch (error) {
      toast.error("Failed to load menu categories");
    }
  };


  useEffect(() => {

    fetchCategory();
  }, [url]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleMenuChange = (event) => {
    const { name, value } = event.target;
    setMenu((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleMenuSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('menu_name', menu.menu_name);
      formData.append('menu_image', menuImage);

      const response = await axios.post(`${url}/api/menu/add`, formData);

      if (response.data.success) {
        setMenu({ menu_name: '' });
        setMenuImage(false);
        toast.success('Menu has been Added');
        await fetchCategory();
      } else {
        toast.error('Could not add the Menu Item');
      }
    } catch (error) {
      toast.error('Error adding menu item');
    }
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('description', data.description);
      formData.append('price', Number(data.price));
      formData.append('category', data.category);
      formData.append('image', image);

      const response = await axios.post(`${url}/api/food/add`, formData);

      if (response.data.success) {
        setData({
          name: '',
          description: '',
          price: '',
          category: category[0]?.menu_name || '',
        });
        setImage(false);
        toast.success('The Product has been Added');
      } else {
        toast.error('The Product could not be added');
      }
    } catch (error) {
      toast.error('Error adding product');
    }
  };

  return (
    <div className="add">
      {/* Product Form */}
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <h1>Add a Product</h1>
        <div className="add-image-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="product_image">
            <img
              src={
                image && typeof image === 'object'
                  ? URL.createObjectURL(image)
                  : assets.upload_area
              }
              alt="Product Preview"
            />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="product_image"
            hidden
            required
          />
        </div>
        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input
            onChange={handleChange}
            value={data.name}
            type="text"
            name="name"
            placeholder="Type here..."
            required
          />
        </div>
        <div className="add-product-description flex-col">
          <p>Product Description</p>
          <textarea
            onChange={handleChange}
            value={data.description}
            name="description"
            rows="6"
            placeholder="Write content here ..."
            required
          />
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Category</p>
            <select
              name="category"
              value={data.category}
              onChange={handleChange}
              required
            >
              {category.map((item, index) => (
                <option value={item.menu_name} key={index}>
                  {item.menu_name}
                </option>
              ))}
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product Price</p>
            <input
              onChange={handleChange}
              value={data.price}
              type="number"
              name="price"
              placeholder="$29"
              required
            />
          </div>
        </div>
        <button type="submit" className="add-btn">
          Add Product
        </button>
      </form>

      {/* Divider */}
      <div className="line"></div>

      {/* Menu Form */}
      <form className="flex-col" onSubmit={handleMenuSubmit}>
        <h1>Add a Menu</h1>
        <div className="add-image-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="menu_image">
            <img
              src={
                menuImage && typeof menuImage === 'object'
                  ? URL.createObjectURL(menuImage)
                  : assets.upload_area
              }
              alt="Menu Preview"
            />
          </label>
          <input
            onChange={(e) => setMenuImage(e.target.files[0])}
            type="file"
            id="menu_image"
            hidden
            required
          />
        </div>
        <div className="add-product-name flex-col">
          <p>Menu Category Name</p>
          <input
            onChange={handleMenuChange}
            value={menu.menu_name}
            type="text"
            name="menu_name"
            placeholder="Type here..."
            required
          />
        </div>
        <button type="submit" className="add-btn">
          Add Menu
        </button>
      </form>
    </div>
  );
};

export default Add;
