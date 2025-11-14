// pages/CartPage.js
import React, { useState } from 'react';
import {
    Container, Typography, Grid, Card, CardMedia, CardContent, TextField,
    Button, Divider, Box, Alert
} from '@mui/material';
import { useCart } from '../components/CartContext';
import {addDoc, collection} from "firebase/firestore";
import {db} from "../config/firebaseConfig";
//import { loadStripe } from '@stripe/stripe-js';

// const stripePromise = loadStripe('pk_test_XXXXXXXXXXXXXXXXXXXXXXXX'); // Remplace avec ta clé publique Stripe

const CartPage = () => {
    const { cart, clearCart } = useCart();

    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
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


    const handleCheckout = async () => {
     //   const stripe = await stripePromise;

        const response = await fetch('http://localhost:4242/create-checkout-session', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                cartItems: groupedCart,
                form
            }),
        });



        const session = await response.json();
      //  await stripe.redirectToCheckout({ sessionId: session.id });


    };

    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');




    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const messageWithCart = form.message
                + '\n\nPanier: '
                + JSON.stringify(groupedCart)
                + '\nTotal: '
                + total.toFixed(2) + ' €';

            await addDoc(collection(db, 'ordersMessages'), {
                ...form,
                message: messageWithCart,
                createdAt: new Date()
            });
            setSubmitted(true);
            // Optionnel: clearCart();
        } catch (err) {
            setError("Erreur lors de l'envoi du message");
        }
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    //Gestion envoie mail avec le panier au client et à l'admin à faire




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
                                        image={item.imageUrl.startsWith('http')
                                            ? item.imageUrl
                                            : process.env.PUBLIC_URL + '/' + item.imageUrl}
                                        alt={item.name}
                                        onError={e => { e.target.onerror = null; e.target.src = process.env.PUBLIC_URL + '/images/banner.png'  ; }}
                                    />
                                    <CardContent sx={{ flex: 1 }}>
                                        <Typography variant="h6">{item.name} {item.image}</Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {item.quantity} x {item.price.toFixed(2)} € = {(item.quantity * item.price).toFixed(2)} €
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>

                    <Divider sx={{ my: 4 }} />
                    <Typography variant="h6" gutterBottom>Envoyez nous votre commande, nous vous le confirmons en moins de 24h</Typography>

                    <Typography variant="h4" gutterBottom>Contactez-nous</Typography>
                    <Typography variant="body1" gutterBottom>
                        Remplissez le formulaire ci-dessous et nous vous répondrons rapidement.
                    </Typography>
                    {submitted ? (
                        <Alert severity="success" sx={{ mt: 2 }}>Message envoyé avec succès !</Alert>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Prénom"
                                name="name"
                                fullWidth
                                margin="normal"
                                value={form.name}
                                onChange={handleChange}
                            />
                            <TextField
                                label="Nom complet pour la livraison"
                                name="fullName"
                                fullWidth
                                margin="normal"
                                value={form.fullName}
                                onChange={handleChange}
                                required
                            />
                            <TextField
                                label="Numéro de téléphone"
                                name="phone"
                                fullWidth
                                required
                                value={form.phone}
                                onChange={handleChange}
                            />
                            <TextField
                                label="Email"
                                name="email"
                                type="email"
                                fullWidth
                                margin="normal"
                                value={form.email}
                                onChange={handleChange}
                                required
                            />

                            <TextField
                                label="Adresse"
                                name="address"
                                fullWidth
                                margin="normal"
                                value={form.address}
                                onChange={handleChange}
                                required
                            />
                            <TextField
                                label="Ville"
                                name="city"
                                fullWidth
                                margin="normal"
                                value={form.city}
                                onChange={handleChange}
                                required
                            />
                            <TextField
                                label="Code postal"
                                name="postalCode"
                                fullWidth
                                margin="normal"
                                value={form.postalCode}
                                onChange={handleChange}
                                required
                            />
                            <TextField
                                label="Message"
                                name="message"
                                fullWidth
                                multiline
                                rows={4}
                                margin="normal"
                                value={form.message}
                                onChange={handleChange}

                            />
                            {error && <Alert severity="error">{error}</Alert>}
                            <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                                Envoyer la commande
                            </Button>
                        </form>

                    )}

                    <Divider sx={{ my: 4 }} />
                    <Typography variant="h6">Total à payer : {total.toFixed(2)} €</Typography>

                    <Box mt={3}>
                        {/*<Button*/}
                        {/*    variant="contained"*/}
                        {/*    color="success"*/}
                        {/*    fullWidth*/}
                        {/*    onClick={handleCheckout}*/}
                        {/*>*/}
                        {/*    Procéder au paiement*/}
                        {/*</Button>*/}
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
