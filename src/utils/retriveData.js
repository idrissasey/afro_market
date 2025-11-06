// src/services/firestoreService.js
import { db } from "../config/firebaseConfig.js";
import {
    collection,
    getDocs,
    doc,
    getDoc,
    query,
    where,
    orderBy,
    limit
} from "firebase/firestore";

/**
 * Récupère tous les documents d'une collection
 * @param {string} collectionName - Nom de la collection
 * @returns {Promise<Array>} - Tableau de documents
 */
export const getCollection = async (collectionName) => {
    try {
        const querySnapshot = await getDocs(collection(db, collectionName));
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error(`Erreur lors de la récupération de la collection ${collectionName}:`, error);
        throw error;
    }
};

/**
 * Récupère un document spécifique par son ID
 * @param {string} collectionName - Nom de la collection
 * @param {string} documentId - ID du document
 * @returns {Promise<Object|null>} - Document ou null
 */
export const getDocument = async (collectionName, documentId) => {
    try {
        const docRef = doc(db, collectionName, documentId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return {
                id: docSnap.id,
                ...docSnap.data()
            };
        } else {
            return null;
        }
    } catch (error) {
        console.error(`Erreur lors de la récupération du document ${documentId}:`, error);
        throw error;
    }
};

/**
 * Récupère des documents filtrés par un champ spécifique
 * @param {string} collectionName - Nom de la collection
 * @param {string} field - Champ pour le filtrage
 * @param {any} value - Valeur à comparer
 * @returns {Promise<Array>} - Tableau de documents filtrés
 */
export const getDocumentsByField = async (collectionName, field, value) => {
    try {
        const q = query(collection(db, collectionName), where(field, "==", value));
        const querySnapshot = await getDocs(q);

        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error(`Erreur lors de la récupération des documents où ${field} = ${value}:`, error);
        throw error;
    }
};

/**
 * Récupère des documents triés et limités
 * @param {string} collectionName - Nom de la collection
 * @param {string} sortField - Champ pour le tri
 * @param {string} sortDirection - Direction du tri ('asc' ou 'desc')
 * @param {number} limitCount - Nombre maximum de documents à récupérer
 * @returns {Promise<Array>} - Tableau de documents
 */
export const getSortedDocuments = async (collectionName, sortField, sortDirection = 'asc', limitCount = 10) => {
    try {
        const q = query(
            collection(db, collectionName),
            orderBy(sortField, sortDirection),
            limit(limitCount)
        );

        const querySnapshot = await getDocs(q);

        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error(`Erreur lors de la récupération des documents triés:`, error);
        throw error;
    }
};

// Fonctions spécifiques pour chaque table

/**
 * Récupère tous les produits
 * @returns {Promise<Array>} - Tableau de produits
 */
export const getAllProducts = async () => {
    return await getCollection('products');
};

/**
 * Récupère tous les produits d'une catégorie
 * @param {string} categoryId - ID de la catégorie
 * @returns {Promise<Array>} - Tableau de produits
 */
export const getProductsByCategory = async (categoryId) => {
    return await getDocumentsByField('products', 'categoryId', categoryId);
};

/**
 * Récupère toutes les catégories
 * @returns {Promise<Array>} - Tableau de catégories
 */
export const getAllCategories = async () => {
    return await getCollection('categories');
};

/**
 * Récupère tous les utilisateurs
 * @returns {Promise<Array>} - Tableau d'utilisateurs
 */
export const getAllUsers = async () => {
    return await getCollection('users');
};

/**
 * Récupère les commandes d'un utilisateur
 * @param {string} userId - ID de l'utilisateur
 * @returns {Promise<Array>} - Tableau de commandes
 */
export const getUserOrders = async (userId) => {
    return await getDocumentsByField('orders', 'userId', userId);
};

/**
 * Récupère les articles du panier d'un utilisateur
 * @param {string} userId - ID de l'utilisateur
 * @returns {Promise<Array>} - Tableau d'articles du panier
 */
export const getUserCartItems = async (userId) => {
    return await getDocumentsByField('cartItems', 'userId', userId);
};

/**
 * Récupère les avis sur un produit
 * @param {string} productId - ID du produit
 * @returns {Promise<Array>} - Tableau d'avis
 */
export const getProductReviews = async (productId) => {
    return await getDocumentsByField('reviews', 'productId', productId);
};

/**
 * Récupère les adresses d'un utilisateur
 * @param {string} userId - ID de l'utilisateur
 * @returns {Promise<Array>} - Tableau d'adresses
 */
export const getUserAddresses = async (userId) => {
    return await getDocumentsByField('addresses', 'userId', userId);
};

/**
 * Récupère les paiements associés à une commande
 * @param {string} orderId - ID de la commande
 * @returns {Promise<Array>} - Tableau de paiements
 */
export const getOrderPayments = async (orderId) => {
    return await getDocumentsByField('payments', 'orderId', orderId);
};

/**
 * Récupère toutes les promotions actives (non expirées)
 * @returns {Promise<Array>} - Tableau de promotions
 */
export const getActivePromotions = async () => {
    try {
        const now = new Date();
        const q = query(
            collection(db, 'promotions'),
            where('date_expiration', '>', now)
        );
        const querySnapshot = await getDocs(q);

        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error("Erreur lors de la récupération des promotions actives:", error);
        throw error;
    }
};
