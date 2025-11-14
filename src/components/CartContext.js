import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    // Ajouter un produit (ajoute un exemplaire à chaque clic)
    const addToCart = (product) => {
        setCart((prev) => [...prev, product]);
        const notif = document.createElement('div');
        notif.textContent = 'Produit ajouté au panier !';
        notif.style.position = 'fixed';
        notif.style.top = '20px';
        notif.style.right = '20px';
        notif.style.background = '#4BB543';
        notif.style.color = 'white';
        notif.style.padding = '10px 20px';
        notif.style.borderRadius = '5px';
        notif.style.zIndex = 1000;
        document.body.appendChild(notif);
        setTimeout(() => {
            document.body.removeChild(notif);
        }, 2000);
    };

    // Supprimer complètement un produit (peu importe la quantité)
    const removeFromCart = (product) => {
        setCart((prev) => prev.filter((item) => item.name !== product.name));
    };

    // Diminuer la quantité d’un produit (retirer une instance)
    const decreaseQuantity = (product) => {
        const index = cart.findIndex((item) => item.name === product.name);
        if (index !== -1) {
            const updatedCart = [...cart];
            updatedCart.splice(index, 1); // retire un seul exemplaire
            setCart(updatedCart);
        }
    };

    // Vider tout le panier
    const clearCart = () => setCart([]);

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                decreaseQuantity,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
