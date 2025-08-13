import {createContext, useEffect, useState} from "react";
import {fetchCategories} from "../Service/CategoryService.js";
import {fetchItems} from "../Service/ItemService.js";

// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext(null);

export const AppContextProvider = (props) => {

    const [categories, setCategories] = useState([]);
    const [itemsData, setItemsData] = useState([]);
    const [auth, setAuth] = useState({token: null, role: null});
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (item) => {
        const existingItem = cartItems.find(cartItem => cartItem.name === item.name);
        if (existingItem) {
            setCartItems(cartItems.map(cartItem => cartItem.name === item.name ? {...cartItem, quantity: cartItem.quantity + 1} : cartItem));
        } else {
            setCartItems([...cartItems, {...item, quantity: 1}]);
        }
    }

    const removeFromCart = (itemId) => {
        setCartItems(cartItems.filter(item => item.itemId !== itemId));
    }

    const updateQuantity = (itemId, newQuantity) => {
        setCartItems(cartItems.map(item => item.itemId === itemId ? {...item, quantity: newQuantity} : item));
    }

    useEffect(() => {
    async function loadData() {
        try {
            if (localStorage.getItem("token") && localStorage.getItem("role")) {
                setAuthData(
                    localStorage.getItem("token"),
                    localStorage.getItem("role")
                );
            }

            const response = await fetchCategories();
            const itemResponse = await fetchItems();
            console.log('item response', itemResponse);
            setCategories(response.data);
            setItemsData(itemResponse.data);

            console.log('item response', itemResponse);
            setCategories(response.data);
            setItemsData(itemResponse.data);
        } catch (error) {
            console.error("Error loading data:", error);
            // Optionally set error state or show a message to the user
        }
    }
    loadData();
}, []);


    const setAuthData = (token, role) => {
        setAuth({token, role});
    }

    const clearCart = () => {
        setCartItems([]);
    }

    const contextValue = {
        categories,
        setCategories,
        auth,
        setAuthData,
        itemsData,
        setItemsData,
        addToCart,
        cartItems,
        removeFromCart,
        updateQuantity,
        clearCart
    }

    return <AppContext.Provider value={contextValue}>
        {props.children}
    </AppContext.Provider>
}