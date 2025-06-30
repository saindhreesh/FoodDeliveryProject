import axios from "axios";
import { createContext, useState, useEffect } from "react";
// import { food_list } from "../assets/frontend_assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const [showLogin , setShowLogin] = useState(false)

    const [cartItems, setCartItems] = useState({});
    const [food_list, setFoodList] = useState([]);
    const [token, setToken] = useState('');
    const [menu_list, setMenuList] = useState([]);
    const url = 'http://localhost:5000';


    const fetchMenu = async () => {
        const response = await axios.get(url + "/api/menu/list")
        setMenuList(response.data.data)
        console.log(menu_list)
    }

    const fetchFoodList = async () => {
        const response = await axios.get(url + "/api/food/list")
        setFoodList(response.data.data)
    }

    const addToCart = async (itemId) => {

        if (token) {
            try {
                if (!cartItems[itemId]) {
                    setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
                }
                else {
                    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
                }
                await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } })
            } catch (err) {
                console.error('Error syncing cart with backend:', err);
            }
        }
        else{
            alert("If You use this Feature Please Login ot Your Account")
            setShowLogin(true)
        }
    }
    
    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
        if (token) {
            try {
                await axios.post(url + '/api/cart/remove', { itemId }, { headers: { token } })
            } catch (err) {
                console.error('Error syncing cart removal with backend:', err);
            }
        }
    }




    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item]) {
                let iteminfo = food_list.find((product) => product._id === item);
                totalAmount += iteminfo.price * cartItems[item]
            }
        }
        return totalAmount;
    }

    const loadCartData = async (token) => {
        const response = await axios.post(url + '/api/cart/get', {}, { headers: { token } });
        setCartItems(response.data.cartData);
    }

    // Inside StoreContext.jsx
    useEffect(() => {
        async function loadData() {
            await fetchFoodList();
            await fetchMenu();
            const savedToken = localStorage.getItem('token');
            if (savedToken) {
                setToken(savedToken);
                await loadCartData(localStorage.getItem('token'))
            }
        }
        loadData()
        loadCartData()

    }, []);
    const contextValue = {
        food_list,
        menu_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        setToken,
        token,
        setShowLogin,
        showLogin
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;
