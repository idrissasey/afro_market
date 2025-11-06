import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Accueil from './pages/Accueil';
import Alimentaire from './pages/Alimentaire';
import Boissons from './pages/Boissons';
import NonAlimentaire from './pages/NonAlimentaire';
import Beaute from './pages/Beaute';
import Maison from './pages/Maison';
import { CartProvider } from './components/CartContext';
import Header from './components/Header';
//import StripeWrapper from './components/paiements/StripeWrapper';
import CartPage from "./components/CartPage";
import AuthForm from './pages/AuthForm';
import Footer from './components/Footer'; // 👈 Ajouté

// Nouvelles pages
import Contact from './pages/Contact';
import CGU from './pages/CGU';
import Confidentialite from './pages/Confidentialite';

function App() {
    return (
        <CartProvider>


                <Router>
                    <Header />
                    <Routes>
                        <Route path="/" element={<Accueil />} />
                        <Route path="/alimentaire" element={<Alimentaire />} />
                        <Route path="/boissons" element={<Boissons />} />
                        <Route path="/non-alimentaire" element={<NonAlimentaire />} />
                        <Route path="/beaute" element={<Beaute />} />
                        <Route path="/connexion" element={<AuthForm />} />
                        <Route path="/maison" element={<Maison />} />
                        <Route path="/panier" element={<CartPage />} />

                        {/* 👇 Nouvelles routes */}
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/cgu" element={<CGU />} />
                        <Route path="/confidentialite" element={<Confidentialite />} />
                    </Routes>
                    <Footer /> {/* 👈 Ajouté ici pour apparaître sur toutes les pages */}
                </Router>

        </CartProvider>
    );
}

export default App;
