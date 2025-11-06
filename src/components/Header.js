// components/Header.js
import React, { useState, useEffect } from 'react';
import {
    AppBar, Toolbar, Typography, IconButton, Badge, Tabs, Tab,
    Box, Container, Drawer, List, ListItem, ListItemText, Button
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import { Leaf, Package, PillBottle, SprayCanIcon, Home, User } from "lucide-react";
//import BannerImage from '/images/banner.png';
import { getAllCategories } from "../utils/retriveData";

// Tableau de catégories par défaut (fallback)
const defaultCategories = [
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            { id: "alimentaire", name: "Produits Alimentaires", iconName: "Leaf" },
    { id: "boissons", name: "Boissons Africaines", iconName: "PillBottle" },
    { id: "divers", name: "Produits Non-Alimentaires", iconName: "Package" },
    { id: "beaute", name: "Beauté & Soins", iconName: "SprayCanIcon" },
    { id: "maison", name: "Maison & Décoration", iconName: "Home" },
    { id: "Connexion", name: "Se connecter", iconName: "User" }
];

// Mapping des noms d'icônes aux composants
const iconMap = {
    Leaf: Leaf,
    Package: Package,
    PillBottle: PillBottle,
    SprayCanIcon: SprayCanIcon,
    Home: Home,
    User: User
};

const Header = () => {
    const { cart } = useCart();
    const navigate = useNavigate();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [categories, setCategories] = useState(defaultCategories);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const fetchedCategories = await getAllCategories();

                // Vérifiez si les données sont un tableau
                if (Array.isArray(fetchedCategories)) {
                    const formattedCategories = fetchedCategories.map(cat => ({
                        id: cat.categoryId || cat.id,
                        name: cat.name,
                        iconName: cat.iconName
                    }));
                    setCategories(formattedCategories);
                } else {
                    console.error("Les catégories récupérées ne sont pas un tableau:", fetchedCategories);
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des catégories:", error);
            }
        };

        fetchCategories();
    }, []);

    const toggleDrawer = () => setDrawerOpen(!drawerOpen);

    const handleNavigation = (categoryId) => {
        navigate(`/${categoryId}`);
    };

    const total = cart.reduce((acc, item) => acc + item.price, 0);

    const getIconComponent = (iconName) => {
        const IconComponent = iconMap[iconName];
        return IconComponent ? <IconComponent /> : <Package />;
    };

    return (
        <>
            <AppBar position="static" color="primary" sx={{ mb: 4 }}>
                <Toolbar>
                    <Typography onClick={() => navigate("/")} variant="h6" sx={{ flexGrow: 1 }}>
                        KemetMarket
                    </Typography>
                    <Tabs value={false} aria-label="categories">
                        {categories.map((cat) => (
                            <Tab
                                key={cat.id}
                                label={
                                    <Box display="flex" alignItems="center" gap={1}>
                                        {getIconComponent(cat.iconName)}
                                        {cat.name}
                                    </Box>
                                }
                                onClick={() => handleNavigation(cat.id)}
                                sx={{ color: "white" }}
                            />
                        ))}
                    </Tabs>
                    <IconButton onClick={toggleDrawer} color="inherit">
                        <Badge badgeContent={cart.length} color="error">
                            <ShoppingCartIcon />
                        </Badge>
                    </IconButton>
                </Toolbar>
            </AppBar>

            {/* Le reste du code reste inchangé */}
        </>
    );
};

export default Header;
