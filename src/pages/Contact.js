import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Alert } from '@mui/material';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../config/firebaseConfig'; // Assurez-vous que le chemin est correct

export default function Contact() {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, 'contactMessages'), {
                ...form,
                createdAt: new Date(),
            });
            setSubmitted(true);
        } catch (err) {
            setError('Erreur lors de l\'envoi du message');
        }
    };

    return (
        <Box maxWidth={600} mx="auto" mt={5}>
            <Typography variant="h4" gutterBottom>Contactez-nous</Typography>
            <Typography variant="body1" gutterBottom>
                Remplissez le formulaire ci-dessous et nous vous répondrons rapidement.
            </Typography>
            {submitted ? (
                <Alert severity="success" sx={{ mt: 2 }}>Message envoyé avec succès !</Alert>
            ) : (
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Nom"
                        name="name"
                        fullWidth
                        margin="normal"
                        value={form.name}
                        onChange={handleChange}
                        required
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
                        label="Message"
                        name="message"
                        fullWidth
                        multiline
                        rows={4}
                        margin="normal"
                        value={form.message}
                        onChange={handleChange}
                        required
                    />
                    {error && <Alert severity="error">{error}</Alert>}
                    <Button type="submit" variant="contained" sx={{ mt: 2 }}>Envoyer</Button>
                </form>
            )}
        </Box>
    );
}
