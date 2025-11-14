// src/seedFirestore.js
import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc, Timestamp, serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { auth, db, app,storage } from "./config/firebaseConfig.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import fs from "fs";
import path from "path";

import { fileURLToPath } from 'url';



// Au lieu d'importer les images, utilisez des URLs ou des chemins relatifs
//const attiekePic = "images/attiéké.jpg"; // URL à utiliser dans Firestore
const gariPic = "images/gari.jpg";
const dambouePic = "images/dambou.jpg";
const moringaPic = "images/moringa.jpg";
const tapiocaPic = "images/tapioca.jpg";
const souchetPic = "images/souchet.jpg";
const karitePic = "images/karite.jpg";
const bouclePic = "images/boucles-oreille.jpg";
const savonPic = "images/savonnoir.jpg";
const kinkelibaPic = "images/kinkeliba.jpg";
const taleauAgPic = "images/tableaucroixAgdez.jpg";

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
                name: "Gari/Farine de manioc - 500g",
                price: 5,
                quantity: 50,
                imageUrl: gariPic,
                description: "Farine de manioc couramment consommée en Afrique de l'Ouest. Il s’apparente au couac de Guyane et à la cassave. Parfait pour vos plats africains.",
                categoryId: "alimentaire"
            },
            {
                name: "Dambou/Semoule de riz - 500g",
                price: 10,
                quantity: 20,
                imageUrl: dambouePic,
                description: "La semoule de riz  aide à réguler le transit intestinale. Elle permet de lutter également contre les maladies cardiovasculaires. ",
                categoryId: "alimentaire"
            },
            {
                name: "Hanti/Aya/Souchet - 100g",
                price: 5,
                quantity: 20,
                imageUrl: souchetPic,
                description: "Le souchet est  une bonne source d'énergie. En tant que fibres elle régule le transit, elle permet également de jouer un rôle d'aphrodisiaque.\n",
                categoryId: "alimentaire"
            },            {
                name: "Piment rouge - 150g",
                price: 5,
                quantity: 20,
                imageUrl: pimentPic,
                description: "Piment africain, fort, pour relever vos plats.",
                categoryId: "alimentaire"
            },
            {
                name: "Moringa/Kopto - 250g",
                price: 5,
                quantity: 20,
                imageUrl: moringaPic,
                description: "Le moringa est riche en vitamines et en minéraux, ce qui lui accorde de nombreux bienfaits pour la santé. Le moringa a des vertus anti-oxydantes, anti-inflammatoires et anti-bactériennes particulièrement puissantes.",
                categoryId: "alimentaire"
            },
            {
                name: "Tapioca - 400g",
                price: 5,
                quantity: 20,
                imageUrl: tapiocaPic,
                description: "Le tapioca est un fécule issue des racines de manioc. Il favorise la santé digestive en stimulant le transit intestinal et en prévenant la constipation. De plus, il est peu calorique, ce qui en fait un excellent choix pour ceux qui cherchent à maintenir un poids équilibré.",
                categoryId: "alimentaire"
            },            {
                name: "Bissap rouge / Hibiscus - 200g",
                price: 5,
                quantity: 20,
                imageUrl: bissapPic,
                description: "En jus ou tisane, le bissap est un aliment aux nombreux bienfaits, une boisson traditionnelle à base de fleurs d'hibiscus, rafraîchissante et naturelle.",
                categoryId: "boissons"
            },
            {
                name: "Kinkeliba - 250g",
                price: 5,
                quantity: 50,
                imageUrl: kinkelibaPic,
                description: "Le Kinkeliba (nom scientifique : Combretum micrathum) est une plante originaire d'Afrique de l'Ouest. En stimulant la fonction hépatique et biliaire et la contraction des muscles intestinaux, le kinkéliba renforce le processus de digestion, et stimule l'appétit.",
                categoryId: "boissons"
            },
            {
                name: "Savon noir",
                price: 5,
                quantity: 20,
                imageUrl: savonPic,
                description: "Savon naturel idéal pour les soins de la peau et les cheveux.",
                categoryId: "beaute"
            },{
                name: "Beurre de karité - 200g",
                price: 10,
                quantity: 20,
                imageUrl: karitePic,
                description: "Le beurre de Karité naturel est idéal pour les soins de la peau et les cheveux. Il peut être recommandé aux peaux à tendance atopique, par exemple en soin apaisant et protecteur. Sa forte teneur en acides gras et esters de cire en fait un précieux émollient.",
                categoryId: "beaute"
            },{
                name: "Tableau décoratif africain",
                price: 10,
                quantity: 5,
                imageUrl: taleauAgPic,
                description: "Des tableau décoratif aux motifs africains pour embellir votre intérieur.",
                categoryId: "maison"
            },{
                name: "Boucle d'oreille Africain",
                price: 10,
                quantity: 5,
                imageUrl: bouclePic,
                description: "Boucle d'oreille Africain.",
                categoryId: "divers"
            }

        ];

        // Utilisation d'une boucle for pour assurer que tout est exécuté séquentiellement
// Téléversement des images sur le storage et récupération de leur URL



        for (let i = 0; i < mockProducts.length; i++) {
            const product = mockProducts[i];
            // Lecture du fichier image local (nécessite Node.js, pas possible côté navigateur)
            const __filename = fileURLToPath(import.meta.url);
            const __dirname = path.dirname(__filename);

// ... ensuite ton code ...
            const imagePath = path.join(__dirname, '..', 'public', 'images', path.basename(product.imageUrl));
            console.log("Lecture de l'image :", imagePath); // pour debug
            const imageBuffer = fs.readFileSync(imagePath);


            const storageRef = ref(storage, `products/${path.basename(product.imageUrl)}`);
            await uploadBytes(storageRef, imageBuffer);
            const downloadURL = await getDownloadURL(storageRef);

            const productRef = doc(collection(db, "products"), `productId${i + 1}`);
            await setDoc(productRef, {
                productId: `productId${i + 1}`,
                name: product.name,
                description: product.description,
                price: product.price,
                stock: product.quantity,
                imageUrl: downloadURL,
                categoryId: product.categoryId,
                available: product.quantity > 0,
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

// 1️⃣ promo avec code et date
        const promotionsRef1 = doc(collection(db, "promotions"), "promoId1");
        await setDoc(promotionsRef1, {
            code: "KEMET10",
            description: "Réduction de 10% sur votre première commande.",
            montant_remise: 10,
            date_expiration: new Date(new Date().setMonth(new Date().getMonth() + 3)),
            nombre_utilisations_max: 1000,
            nombre_utilisations_actuelles: 0
        });

// 2️⃣ promos sans code ni date
        const promotionsRef2 = doc(collection(db, "promotions"), "promoId2");
        await setDoc(promotionsRef2, {
            code: "",
            description: "Livraison gratuite pour toute commande supérieure à 39€ sur Toulouse et alentours : Blagnac, Colomiers, Aucamville, Balma, L'union, Saint-Orens, Labège.",
            montant_remise: 0,
            date_expiration: new Date("2999-12-31T23:59:59Z"), // ✅ corrigé
            nombre_utilisations_max: 1000,
            nombre_utilisations_actuelles: 0
        });

        const promotionsRef3 = doc(collection(db, "promotions"), "promoId3");
        await setDoc(promotionsRef3, {
            code: "",
            description: "Livraison gratuite pour toute commande supérieure à 69€ en France métropolitaine.",
            montant_remise: 0,
            date_expiration: new Date("2026-06-31T23:59:59Z"), // ✅ corrigé
            nombre_utilisations_max: 1000,
            nombre_utilisations_actuelles: 0
        });

        const promotionsRef4 = doc(collection(db, "promotions"), "promoId4");
        await setDoc(promotionsRef4, {
            code: "",
            description: "Livraison gratuite pour toute commande à partir de 99€ en Europe.",
            montant_remise: 0,
            date_expiration: new Date("2026-06-31T23:59:59Z"), // ✅ corrigé
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
