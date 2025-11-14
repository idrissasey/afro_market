import React, {useEffect, useState} from "react";
import {
    Card,
    CardContent,
    CardMedia,
    Button,
    Tab,
    Tabs,
    Box,
    Container,
    Typography,
    Grid,
    Link
} from "@mui/material";
import {House, Leaf, Package, PillBottle} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../components/CartContext";


import { getAllCategories , getAllProducts } from "../utils/retriveData";

// Catégories par défaut
const defaultCategories = [
    { id: "alimentaire", name: "Produits Alimentaires" },
    { id: "boissons", name: "Boissons Africaines" },
    { id: "non-alimentaire", name: "Produits Non-Alimentaires" },
    { id: "beaute", name: "Beauté & Soins" },
    { id: "maison", name: "Maison & Décoration" }
];

const Accueil = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const fetchedProducts = await getAllProducts();
                setProducts(fetchedProducts);
                console.log(fetchedProducts);
            } catch (error) {
                console.error("Erreur lors de la récupération des produits :", error);
            }
        };

        fetchProducts();
    }, []);

    //const dbproducts = products;
    // State pour les catégories
    const [categories, setCategories] = useState(defaultCategories);
    // State pour gérer l'onglet sélectionné
    const [selectedTab, setSelectedTab] = useState(null);
    const navigate = useNavigate();
    const { addToCart } = useCart();

    // Effet pour récupérer les catégories au chargement du composant
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const fetchedCategories = await getAllCategories();

                // Vérifier si les données sont un tableau
                if (Array.isArray(fetchedCategories)) {
                    const formattedCategories = fetchedCategories
                        // Exclure la catégorie "Connexion" qui est destinée à la connexion utilisateur
                        .filter(cat => (cat.categoryId || cat.id) !== "Connexion")
                        .map(cat => ({
                            id: cat.categoryId || cat.id,
                            name: cat.name
                        }));
                    console.log(formattedCategories);
                    setCategories(formattedCategories);
                } else {
                    console.error("Les catégories récupérées ne sont pas un tableau:", fetchedCategories);
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des catégories:", error);
            }
        };

        fetchCategories();

        setSelectedTab(null); // Afficher toutes les catégories
    }, []);

    // Fonction pour gérer le changement d'onglet
    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    const handleViewAll = (catId) => {
        console.log("Navigating to category: " + catId);
        navigate(`/${catId}`);
    };

    return (
        <>
            <Container maxWidth="lg" sx={{ py: 6 }}>
                {categories.map ((cat) => (


                    <Box key={cat.id} sx={{ mb: 5 }}>
                        <Typography variant="h5" gutterBottom>
                            {cat.name}
                        </Typography>
                        <Grid container spacing={3}>

                            {products
                                .filter((product) => product.categoryId === cat.id)
                                .map((product, index) => (
                                    <Grid item xs={12} sm={6} md={4} key={index}>
                                        <Card
                                            sx={{
                                                borderRadius: 4,
                                                boxShadow: 6,
                                                ':hover': { boxShadow: 12 }
                                            }}
                                        >
                                            <CardMedia
                                                component="img"
                                                height="192"
                                                image={product.imageUrl.startsWith('http')
                                                    ? product.imageUrl
                                                    : process.env.PUBLIC_URL + '/' + product.imageUrl}
                                                alt={product.name}
                                                sx={{ borderTopLeftRadius: 4, borderTopRightRadius: 4 }}
                                                onError={e => { e.target.onerror = null; e.target.src = process.env.PUBLIC_URL + '/images/banner.png'  ; }}
                                            />
                                            <CardContent>
                                                <Typography variant="h6">{product.name}</Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    {product.description}
                                                </Typography>
                                                <Typography color="orange" sx={{ mt: 1 }}>
                                                    {product.price.toFixed(2)} €
                                                </Typography>
                                                <Button
                                                    variant="contained"
                                                    fullWidth
                                                    sx={{
                                                        mt: 1,
                                                        bgcolor: "orange.500",
                                                        '&:hover': { bgcolor: "orange.600" }
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
                        <Box sx={{ mt: 2, textAlign: 'right' }}>
                            <Button
                                color="primary"
                                onClick={() => handleViewAll(cat.id)}
                            >
                                Voir tous les produits {cat.name}
                            </Button>
                        </Box>
                    </Box>
                ))}
            </Container>
        </>
    );
};

export default Accueil;
