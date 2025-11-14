import React, { useState } from 'react';
import {
    Drawer,
    IconButton,
    Badge,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Typography,
    Button,
    Box
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCart } from './CartContext';
import {useNavigate} from "react-router-dom";

const CartDrawer = () => {
    const [open, setOpen] = useState(false);
    const { cart, addToCart, decreaseQuantity, removeFromCart, clearCart } = useCart();
    const navigate = useNavigate();
    const toggleDrawer = () => setOpen(!open);

    // Regrouper les produits par nom
    const groupedCart = cart.reduce((acc, item) => {
        const key = item.name;
        if (!acc[key]) {
            acc[key] = { ...item, quantity: 1 };
        } else {
            acc[key].quantity += 1;
        }
        return acc;
    }, {});

    const cartItems = Object.values(groupedCart);
    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <>
            <IconButton onClick={toggleDrawer} color="secondary">
                <Badge badgeContent={cart.length} color="error">
                    <ShoppingCartIcon />
                </Badge>
            </IconButton>
            <Drawer anchor="right" open={open} onClose={toggleDrawer}>
                <Box sx={{ width: 350, p: 2 }}>
                    <Typography variant="h6" gutterBottom>Mon Panier</Typography>
                    {cartItems.length === 0 ? (
                        <Typography>Aucun produit dans le panier.</Typography>
                    ) : (
                        <>
                            <List>
                                {cartItems.map((item, index) => (
                                    <ListItem key={index} alignItems="flex-start">
                                        <ListItemAvatar>
                                            <Avatar
                                                variant="square"
                                                src={item.imageUrl.startsWith('http')
                                                ? item.imageUrl
                                                : process.env.PUBLIC_URL + '/' + item.imageUrl}
                                                alt={item.name}
                                                sx={{ width: 60, height: 60, mr: 1 }}
                                            />
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={item.name}
                                            secondary={
                                                <>
                                                    <Typography component="span" variant="body2" color="text.primary">
                                                        {item.price.toFixed(2)} € x {item.quantity}
                                                    </Typography>
                                                    <br />
                                                    Total : {(item.price * item.quantity).toFixed(2)} €
                                                </>
                                            }
                                        />
                                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', ml: 1 }}>
                                            <IconButton onClick={() => addToCart(item)} size="small"><AddIcon /></IconButton>
                                            <IconButton onClick={() => decreaseQuantity(item)} size="small"><RemoveIcon /></IconButton>
                                            <IconButton onClick={() => removeFromCart(item)} size="small"><DeleteIcon /></IconButton>
                                        </Box>
                                    </ListItem>
                                ))}
                            </List>
                            <Typography variant="h6" sx={{ mt: 2 }}>
                                Total : {total.toFixed(2)} €
                            </Typography>
                            <Button
                                fullWidth
                                variant="contained"
                                color="success"
                                sx={{ mt: 2 }}
                                onClick={() => {
                                    // Tu peux naviguer vers /panier ici si tu veux
                                    navigate(`/panier`);
                                    setOpen(false);
                                }}
                            >
                                Voir le panier complet

                            </Button>
                        </>
                    )}
                </Box>
            </Drawer>
        </>
    );
};

export default CartDrawer;
