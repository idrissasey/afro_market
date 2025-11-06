// src/components/Footer.jsx
import React from 'react';
import { Box, Typography, Link, IconButton, Grid } from '@mui/material';
import { Facebook, Twitter, Instagram, Email } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

export default function Footer() {
    const theme = useTheme();

    return (
        <Box
            component="footer"
            sx={{
                mt: 8,
                py: 6,
                px: 4,
                backgroundColor: theme.palette.grey[100],
                borderTop: '1px solid',
                borderColor: theme.palette.divider,
            }}
        >
            <Grid container spacing={4} justifyContent="center">
                {/* Section Infos */}
                <Grid item xs={12} sm={6} md={3}>
                    <Typography variant="h6" gutterBottom>
                        AfriMarket
                    </Typography>
                    <Typography variant="body2">
                        Votre marketplace de confiance pour l'Afrique.
                    </Typography>
                </Grid>

                {/* Section Liens */}
                <Grid item xs={12} sm={6} md={3}>
                    <Typography variant="h6" gutterBottom>
                        Liens utiles
                    </Typography>
                    <Box display="flex" flexDirection="column" gap={1}>
                        <Link href="/cgu" underline="hover">Conditions générales</Link>
                        <Link href="/confidentialite" underline="hover">Politique de confidentialité</Link>
                        <Link href="/contact" underline="hover">Contact</Link>
                        <Link href="/faq" underline="hover">FAQ</Link>
                    </Box>
                </Grid>

                {/* Section Réseaux */}
                <Grid item xs={12} sm={6} md={3}>
                    <Typography variant="h6" gutterBottom>
                        Suivez-nous
                    </Typography>
                    <Box display="flex" gap={1}>
                        <IconButton href="#" aria-label="Facebook"><Facebook /></IconButton>
                        <IconButton href="#" aria-label="Twitter"><Twitter /></IconButton>
                        <IconButton href="#" aria-label="Instagram"><Instagram /></IconButton>
                    </Box>
                </Grid>

                {/* Section Paiements */}
                <Grid item xs={12} sm={6} md={3}>
                    <Typography variant="h6" gutterBottom>
                        Paiements sécurisés
                    </Typography>
                    <Typography variant="body2">Visa, MasterCard, PayPal, Mobile Money</Typography>
                </Grid>
            </Grid>

            <Box mt={4} textAlign="center">
                <Typography variant="body2" color="text.secondary">
                    &copy; {new Date().getFullYear()} AfriMarket – Tous droits réservés.
                </Typography>
            </Box>
        </Box>
    );
}
