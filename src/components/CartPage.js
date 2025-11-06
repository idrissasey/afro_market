// pages/CartPage.js
import React, { useState } from 'react';
import {
    Container, Typography, Grid, Card, CardMedia, CardContent, TextField,
    Button, Divider, Box
} from '@mui/material';
import { useCart } from '../components/CartContext';
//import { loadStripe } from '@stripe/stripe-js';

// const stripePromise = loadStripe('pk_test_XXXXXXXXXXXXXXXXXXXXXXXX'); // Remplace avec ta clé publique Stripe

const CartPage = () => {
    const { cart, clearCart } = useCart();
    const [shipping, setShipping] = useState({
        fullName: '',
        address: '',
        city: '',
        postalCode: ''
    });

    const groupedCart = cart.reduce((acc, item) => {
        const existing = acc.find(p => p.name === item.name);
        if (existing) {
            existing.quantity += 1;
        } else {
            acc.push({ ...item, quantity: 1 });
        }
        return acc;
    }, []);

    const total = groupedCart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleInputChange = (e) => {
        setShipping({ ...shipping, [e.target.name]: e.target.value });
    };

    const handleCheckout = async () => {
     //   const stripe = await stripePromise;

        const response = await fetch('http://localhost:4242/create-checkout-session', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                cartItems: groupedCart,
                shipping
            }),
        });

        const session = await response.json();
      //  await stripe.redirectToCheckout({ sessionId: session.id });
    };

    return (
        <Container maxWidth="md" sx={{ py: 6 }}>
            <Typography variant="h4" gutterBottom>Votre Panier</Typography>

            {groupedCart.length === 0 ? (
                <Typography>Votre panier est vide.</Typography>
            ) : (
                <>
                    <Grid container spacing={3}>
                        {groupedCart.map((item, i) => (
                            <Grid item xs={12} key={i}>
                                <Card sx={{ display: 'flex', alignItems: 'center', p: 1 }}>
                                    <CardMedia
                                        component="img"
                                        sx={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 2 }}
                                        image={item.image}
                                        alt={item.name}
                                    />
                                    <CardContent sx={{ flex: 1 }}>
                                        <Typography variant="h6">{item.name}</Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {item.quantity} x {item.price.toFixed(2)} € = {(item.quantity * item.price).toFixed(2)} €
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>

                    <Divider sx={{ my: 4 }} />

                    <Typography variant="h6" gutterBottom>Adresse de livraison</Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Nom complet"
                                name="fullName"
                                fullWidth
                                required
                                value={shipping.fullName}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Adresse"
                                name="address"
                                fullWidth
                                required
                                value={shipping.address}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Ville"
                                name="city"
                                fullWidth
                                required
                                value={shipping.city}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Code postal"
                                name="postalCode"
                                fullWidth
                                required
                                value={shipping.postalCode}
                                onChange={handleInputChange}
                            />
                        </Grid>
                    </Grid>

                    <Divider sx={{ my: 4 }} />
                    <Typography variant="h6">Total à payer : {total.toFixed(2)} €</Typography>

                    <Box mt={3}>
                        <Button
                            variant="contained"
                            color="success"
                            fullWidth
                            onClick={handleCheckout}
                        >
                            Procéder au paiement
                        </Button>
                        <Button
                            variant="outlined"
                            color="error"
                            fullWidth
                            sx={{ mt: 1 }}
                            onClick={clearCart}
                        >
                            Vider le panier
                        </Button>
                    </Box>
                </>
            )}
        </Container>
    );
};

export default CartPage;
