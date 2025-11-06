import React, { useEffect, useState } from 'react';
import {
    Container,
    Grid,
    Card,
    CardMedia,
    CardContent,
    Typography,
    Button,
    CircularProgress,
    Box
} from '@mui/material';
import { useCart } from '../components/CartContext';
import { getDocumentsByField } from '../utils/retriveData';

const AlimentairePage = () => {
    const { addToCart } = useCart();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Récupérer les produits de la catégorie "alimentaire"
                const fetchedProducts = await getDocumentsByField('products', 'categoryId', 'alimentaire');

                // Vérifier si les données sont un tableau
                if (Array.isArray(fetchedProducts)) {
                    setProducts(fetchedProducts);
                } else {
                    console.error("Les produits récupérés ne sont pas un tableau:", fetchedProducts);
                    setProducts([]);
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des produits:", error);
                setError("Impossible de charger les produits. Veuillez réessayer plus tard.");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return (
            <Container sx={{ py: 6, textAlign: 'center' }}>
                <CircularProgress color="primary" />
                <Typography variant="h6" sx={{ mt: 2 }}>
                    Chargement des produits alimentaires...
                </Typography>
            </Container>
        );
    }

    if (error) {
        return (
            <Container sx={{ py: 6, textAlign: 'center' }}>
                <Typography variant="h6" color="error">
                    {error}
                </Typography>
                <Button
                    variant="contained"
                    sx={{ mt: 2 }}
                    onClick={() => window.location.reload()}
                >
                    Réessayer
                </Button>
            </Container>
        );
    }

    return (
        <>
            <Container sx={{ py: 6 }}>
                <Typography variant="h4" gutterBottom>
                    Produits Alimentaires
                </Typography>

                {products.length === 0 ? (
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                        <Typography variant="h6">
                            Aucun produit alimentaire disponible pour le moment.
                        </Typography>
                    </Box>
                ) : (
                    <Grid container spacing={3}>
                        {products.map((product) => (
                            <Grid item xs={12} sm={6} md={4} key={product.id}>
                                <Card
                                    sx={{
                                        borderRadius: 4,
                                        boxShadow: 6,
                                        ':hover': { boxShadow: 12 },
                                    }}
                                >
                                    <CardMedia
                                        component="img"
                                        height="200"
                                        image={`/${product.imageUrl}`}
                                        alt={product.name}
                                        sx={{ objectFit: "cover" }}
                                    />
                                    <CardContent>
                                        <Typography variant="h6">{product.name}</Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {product.description} {"./"+product.imageUrl}
                                        </Typography>
                                        <Typography color="orange" sx={{ mt: 1 }}>
                                            {product.price.toFixed(2)} €
                                        </Typography>
                                        <Button
                                            variant="contained"
                                            fullWidth
                                            sx={{
                                                mt: 1,
                                                bgcolor: 'orange.500',
                                                '&:hover': { bgcolor: 'orange.600' },
                                            }}
                                            onClick={() => addToCart(product)}
                                        >
                                            Ajouter au panier
                                        </Button>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Container>
        </>
    );
};

export default AlimentairePage;
