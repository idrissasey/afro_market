// ./pages/AuthForm.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

export default function AuthForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isLogin) {
                await signInWithEmailAndPassword(auth, email, password);
                alert("Connexion réussie !");
            } else {
                await createUserWithEmailAndPassword(auth, email, password);
                alert("Compte créé !");
            }
            navigate("/"); // Redirection vers l'accueil après succès
        } catch (err) {
            alert("Erreur : " + err.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{isLogin ? "Connexion" : "Créer un compte"}</h2>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mot de passe"
                required
            />
            <button type="submit">{isLogin ? "Se connecter" : "S'inscrire"}</button>
            <p
                onClick={() => setIsLogin(!isLogin)}
                style={{ cursor: "pointer", color: "blue" }}
            >
                {isLogin ? "Créer un compte" : "Déjà un compte ? Se connecter"}
            </p>
        </form>
    );
}
