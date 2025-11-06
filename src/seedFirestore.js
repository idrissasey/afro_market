// src/seedFirestore.js
import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc, Timestamp, serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { auth, db, app } from "./config/firebaseConfig.js";

// Au lieu d'importer les images, utilisez des URLs ou des chemins relatifs
const attiekePic = "images/attiéké.jpg"; // URL à utiliser dans Firestore
const pimentPic = "images/piment.jpg";
const bissapPic = "images/bissap.jpg";

async function seedFirestore() {
    try {
        // 1️⃣ Ajouter un utilisateur
        const userRef = doc(collection(db, "users"), "userId123");
        await setDoc(userRef, {
            userId: "user1",
            name: "Jean Dupont",
            date_birth: new Date(),
            email: "jean.dupont@email.com",
            phone: "+33612345678",
            createdAt: serverTimestamp(),
        });

        // 2️⃣ Ajouter les catégories
        const cateRef = doc(collection(db, "categories"), "categories1");
        await setDoc(cateRef, {
            categoryId: "alimentaire",
            name: "Produits Alimentaires",
            iconName: "Leaf",
            createdAt: serverTimestamp(),
        });

        const cateRef2 = doc(collection(db, "categories"), "categories2");
        await setDoc(cateRef2, {
            categoryId: "divers",
            name: "Produits Divers",
            iconName: "Package",
            createdAt: serverTimestamp(),
        });

        const cateRef3 = doc(collection(db, "categories"), "categories3");
        await setDoc(cateRef3, {
            categoryId: "beaute",
            name: "Beauté & Soins",
            iconName: "Spray",  // Corrigé pour utiliser le nom correct
            createdAt: serverTimestamp(),
        });

        const cateRef4 = doc(collection(db, "categories"), "categories4");
        await setDoc(cateRef4, {
            categoryId: "maison",
            name: "Maison & Décoration",
            iconName: "Home",  // Corrigé pour utiliser le nom correct
            createdAt: serverTimestamp(),
        });

        const cateRef5 = doc(collection(db, "categories"), "categories5");
        await setDoc(cateRef5, {
            categoryId: "boissons",
            name: "Boissons Africaines",
            iconName: "PillBottle",
            createdAt: serverTimestamp(),
        });

        const cateRef6 = doc(collection(db, "categories"), "categories6");
        await setDoc(cateRef6, {
            categoryId: "Connexion",
            name: "Client",
            iconName: "User",  // Corrigé pour utiliser le nom correct
            createdAt: serverTimestamp(),
        });

        // 3️⃣ Ajouter des produits
        const mockProducts = [
            {
                name: "Attiéké",
                price: 5,
                imageUrl: attiekePic,
                description: "Semoule de manioc fermentée, parfaite pour accompagner vos plats africains.",
                categoryId: "alimentaire"
            },
            {
                name: "Savon noir",
                price: 3,
                imageUrl: attiekePic,
                description: "Savon naturel idéal pour les soins de la peau et les cheveux.",
                categoryId: "beaute"
            },
            {
                name: "Bissap rouge",
                price: 2,
                imageUrl: bissapPic,
                description: "Boisson traditionnelle à base de fleurs d'hibiscus, rafraîchissante et naturelle.",
                categoryId: "boissons"
            },
            {
                name: "Piment rouge",
                price: 2,
                imageUrl: pimentPic,
                description: "Piment africain très fort pour relever vos plats.",
                categoryId: "alimentaire"
            },
        ];

        // Utilisation d'une boucle for pour assurer que tout est exécuté séquentiellement
        for (let i = 0; i < mockProducts.length; i++) {
            const product = mockProducts[i];
            const productRef = doc(collection(db, "products"), `productId${i + 1}`);
            await setDoc(productRef, {
                productId: `productId${i + 1}`,
                name: product.name,
                description: product.description,
                price: product.price,
                stock: 100,
                imageUrl: product.imageUrl,
                categoryId: product.categoryId,
                available: true,
                createdAt: serverTimestamp(),
            });
        }

        // 4️⃣ Ajouter une commande
        const ordersRef = doc(collection(db, "orders"), "ordersId789");
        await setDoc(ordersRef, {
            orderId: "orders111",
            userId: "user_001",
            status: "pending",
            total: 11.98,
            createdAt: serverTimestamp(),
            items: [
                { productId: "prod_001", quantity: 2, price: 5.99 },
            ],
        });

        // 5️⃣ Ajouter un élément de panier
        const cartItemsRef = doc(collection(db, "cartItems"), "cartItem122");
        await setDoc(cartItemsRef, {
            cartItemId: "cartItems12",
            userId: "user_001",
            productId: "prod_001",
            quantity: 2,
        });

        // 6️⃣ Ajouter un avis
        const reviewsRef = doc(collection(db, "reviews"), "reviewsId001");
        await setDoc(reviewsRef, {
            userId: "user_001",
            productId: "prod_001",
            rating: 5,
            comment: "Excellent produit !",
            createdAt: serverTimestamp(),
        });

        // 7️⃣ Ajouter une adresse
        const addressesRef = doc(collection(db, "addresses"), "addressId123");
        await setDoc(addressesRef, {
            userId: "user_001",
            line1: "45 rue du marché",
            city: "Dakar",
            country: "Sénégal",
            postalCode: "10000",
        });

        // 8️⃣ Ajouter un paiement
        const paymentRef = doc(collection(db, "payments"), "paymentId456");
        await setDoc(paymentRef, {
            orderId: "order_001",
            amount: 11.98,
            method: "Mobile Money",
            status: "paid",
            paidAt: serverTimestamp(),
        });

        // 9️⃣ Ajouter une évaluation
        const ratingRef = doc(collection(db, "ratings"), "ratingId456");
        await setDoc(ratingRef, {
            userId: "userId123",
            productId: "productId1",
            note: 5,
            commentaire: "Excellent produit, livraison rapide !",
            date_avis: serverTimestamp(),
        });

        // 🔟 Ajouter un ticket de support
        const supportTicketsRef = doc(collection(db, "support_tickets"), "ticketId456");
        await setDoc(supportTicketsRef, {
            utilisateur_id: "userId123",
            sujet: "Problème avec la commande",
            description: "Le produit reçu ne correspond pas à la description.",
            statut: "en cours",
            date_creation: serverTimestamp(),
        });

        // 1️⃣1️⃣ Ajouter une promotion
        const promotionsRef = doc(collection(db, "promotions"), "promoId456");
        await setDoc(promotionsRef, {
            code: "AFRO10",
            description: "Réduction de 10% sur votre commande.",
            montant_remise: 10,
            date_expiration: new Date(new Date().setMonth(new Date().getMonth() + 3)),
            nombre_utilisations_max: 1000,
            nombre_utilisations_actuelles: 0
        });

        console.log("✅ Firestore rempli avec succès !");
    } catch (error) {
        console.error("❌ Erreur lors de l'ajout des données :", error);
    }
}

// Exécuter la fonction
seedFirestore();
