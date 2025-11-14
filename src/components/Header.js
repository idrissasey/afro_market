import React, { useState, useEffect } from 'react';
import {
    AppBar, Toolbar, Typography, Tabs, Tab, Box, IconButton, ListItemButton
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Leaf, Package, PillBottle, SprayCanIcon, Home, User } from "lucide-react";
import CartDrawer from './CartDrawer';
import { getAllCategories } from "../utils/retriveData";
import PromoBanner from './PromoBanner';

import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import {getActivePromotions} from "../utils/retriveData";



// Tableau de catégories par défaut (fallback)
const defaultCategories = [
    { id: "alimentaire", name: "Produits Alimentaires", iconName: "Leaf" },
    { id: "boissons", name: "Boissons Africaines", iconName: "PillBottle" },
    { id: "divers", name: "Produits Non-Alimentaires", iconName: "Package" },
    { id: "beaute", name: "Beauté & Soins", iconName: "SprayCanIcon" },
    { id: "maison", name: "Maison & Décoration", iconName: "Home" },
    { id: "connexion", name: "Se connecter", iconName: "User" }
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
    const navigate = useNavigate();
    const [categories, setCategories] = useState(defaultCategories);

    // Responsive: détecte si on est sur mobile
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [drawerOpen, setDrawerOpen] = useState(false);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const fetchedCategories = await getAllCategories();
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

    const handleNavigation = (categoryId) => {
        navigate(`/${categoryId}`);
        setDrawerOpen(false); // ferme le drawer sur mobile
    };

    const getIconComponent = (iconName) => {
        const IconComponent = iconMap[iconName];
        return IconComponent ? <IconComponent size={18} /> : <Package size={18} />;
    };

    //promotions gestions
    const [promotions, setPromotions] = useState([]);

    useEffect(() => {
        const fetchPromotions = async () => {
            try {
                const promos = await getActivePromotions();
                setPromotions(promos);
            } catch (error) {
                console.error("Erreur lors de la récupération des promotions :", error);
            }
        };
        fetchPromotions();
    }, []);

    return (
        <>
            {/* AppBar en haut */}
            <AppBar position="static" color="primary" sx={{ mb: 0 }}>
                <Toolbar sx={{ flexWrap: 'nowrap', overflow: 'hidden', gap: 1, minHeight: 56 }}>
                    <Typography
                        onClick={() => navigate("/")}
                        variant="h6"
                        sx={{
                            flexShrink: 0,
                            fontSize: { xs: '1.1rem', md: '1.3rem' },
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1
                        }}
                    >
                        <img
                            src={process.env.PUBLIC_URL + '/images/logo.jpg'}
                            alt="Logo"
                            style={{ width: 150, height: 50, objectFit: 'contain' }}
                        />
                    </Typography>

                    {isMobile ? (
                        <>
                            <IconButton
                                edge="end"
                                color="white"
                                aria-label="ouvrir le menu"
                                onClick={() => setDrawerOpen(true)}
                                sx={{ ml: 'auto' }}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Drawer
                                anchor="left"
                                open={drawerOpen}
                                onClose={() => setDrawerOpen(false)}
                                PaperProps={{ sx: { width: '80vw', maxWidth: 340 } }}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2, py: 1 }}>
                                    <Typography variant="subtitle1" fontWeight="bold">Menu</Typography>
                                    <IconButton aria-label="fermer" onClick={() => setDrawerOpen(false)}>
                                        <MenuIcon />
                                    </IconButton>
                                </Box>
                                <List role="menu" sx={{ py: 0 }}>
                                    {categories
                                        .filter(cat => !(process.env.NODE_ENV === 'production' && cat.id === 'connexion'))
                                        .map(cat => (
                                            <ListItem disablePadding key={cat.id}>
                                                <ListItemButton
                                                    onClick={() => handleNavigation(cat.id)}
                                                    sx={{ py: 1.2 }}
                                                >
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                        {getIconComponent(cat.iconName)}
                                                        <ListItemText
                                                            primaryTypographyProps={{ fontSize: '0.95rem' }}
                                                            primary={cat.name}
                                                        />
                                                    </Box>
                                                </ListItemButton>
                                            </ListItem>
                                        ))}
                                </List>
                            </Drawer>
                        </>
                    ) : (
                        <Tabs
                            value={false}
                            variant="scrollable"
                            scrollButtons="auto"
                            allowScrollButtonsMobile
                            aria-label="categories"
                            sx={{
                                flexGrow: 1,
                                minHeight: 44,
                                '& .MuiTabs-flexContainer': { flexWrap: 'nowrap' },
                                '& .MuiTab-root': { minHeight: 44, paddingX: 1.5 }
                            }}
                            textColor="white"
                            indicatorColor="secondary"
                        >
                            {categories.map(cat => (
                                <Tab
                                    key={cat.id}
                                    label={
                                        <Box display="flex" alignItems="center" gap={1}>
                                            {getIconComponent(cat.iconName)}
                                            <span style={{ fontSize: '0.95rem', whiteSpace: 'nowrap' }}>{cat.name}</span>
                                        </Box>
                                    }
                                    onClick={() => handleNavigation(cat.id)}
                                    sx={{ color: 'white' }}
                                />
                            ))}
                        </Tabs>
                    )}
                    <Box sx={{ flexShrink: 0 }}>
                        <CartDrawer />
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Bannière en-dessous */}
            <Box
                sx={{
                    width: '100%',
                    color: 'white',
                    textAlign: 'center',
                    py: 1,
                    fontWeight: 'bold',
                    fontSize: { xs: '1rem', md: '1.2rem' },
                    letterSpacing: 1,
                }}
            >
                {categories && categories.length > 0 && promotions && promotions.length > 0 && (
                    <PromoBanner promotions={promotions} />
                )}
                <img
                    src={process.env.PUBLIC_URL + '/images/banner.png'}
                    alt="Bannière"
                    style={{
                        width: '100%',
                        maxHeight: 200,
                        objectFit: 'cover',
                        marginTop: 4
                    }}
                    onError={e => {
                        e.target.onerror = null;
                        e.target.src = process.env.PUBLIC_URL + '/images/banner.png';
                    }}
                />
            </Box>
        </>
    );
};


export default Header;
