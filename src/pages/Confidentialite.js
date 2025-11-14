import React from 'react';
import { Box, Typography, Link } from '@mui/material';

export default function Confidentialite() {
    return (
        <Box p={4} sx={{ maxWidth: 900, margin: '0 auto', lineHeight: 1.7 }}>
            <Typography variant="h4" gutterBottom>
                Politique de Confidentialité
            </Typography>

            <Typography variant="body1" paragraph>
                Dernière mise à jour : 13 novembre 2025
            </Typography>

            <Typography variant="body1" paragraph>
                La présente Politique de Confidentialité décrit la manière dont nous collectons, utilisons et protégeons vos données personnelles lorsque vous utilisez notre site ou nos services.
            </Typography>

            <Typography variant="h5" gutterBottom>
                1. Collecte des informations
            </Typography>
            <Typography variant="body1" paragraph>
                Nous collectons uniquement les informations nécessaires à la fourniture et à l’amélioration de nos services. Ces informations peuvent inclure :
            </Typography>
            <ul>
                <li>Votre nom et prénom</li>
                <li>Votre adresse e-mail</li>
                <li>Les données de connexion et d’utilisation du site</li>
                <li>Les informations que vous nous transmettez volontairement via les formulaires de contact</li>
            </ul>

            <Typography variant="h5" gutterBottom>
                2. Utilisation des données
            </Typography>
            <Typography variant="body1" paragraph>
                Vos données personnelles sont utilisées pour :
            </Typography>
            <ul>
                <li>Fournir et gérer nos services</li>
                <li>Améliorer l’expérience utilisateur</li>
                <li>Assurer la sécurité et la maintenance du site</li>
                <li>Communiquer avec vous (support, actualités, offres, etc.)</li>
            </ul>

            <Typography variant="h5" gutterBottom>
                3. Partage des données
            </Typography>
            <Typography variant="body1" paragraph>
                Nous ne vendons ni ne louons vos données personnelles. Vos informations peuvent être partagées uniquement avec :
            </Typography>
            <ul>
                <li>Nos prestataires de services (hébergement, outils d’analyse, etc.)</li>
                <li>Les autorités compétentes, si la loi l’exige</li>
            </ul>

            <Typography variant="h5" gutterBottom>
                4. Sécurité des données
            </Typography>
            <Typography variant="body1" paragraph>
                Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données contre tout accès non autorisé, perte, destruction ou altération.
            </Typography>

            <Typography variant="h5" gutterBottom>
                5. Durée de conservation
            </Typography>
            <Typography variant="body1" paragraph>
                Vos données sont conservées uniquement pendant la durée nécessaire aux finalités pour lesquelles elles ont été collectées, sauf obligation légale contraire.
            </Typography>

            <Typography variant="h5" gutterBottom>
                6. Vos droits
            </Typography>
            <Typography variant="body1" paragraph>
                Conformément au RGPD, vous disposez des droits suivants :
            </Typography>
            <ul>
                <li>Droit d’accès à vos données personnelles</li>
                <li>Droit de rectification ou de suppression</li>
                <li>Droit d’opposition et de limitation du traitement</li>
                <li>Droit à la portabilité des données</li>
            </ul>
            <Typography variant="body1" paragraph>
                Pour exercer ces droits, vous pouvez nous contacter à l’adresse suivante :{" "}
                <Link href="mailto:contact@votresite.com">contact@votresite.com</Link>.
            </Typography>

            <Typography variant="h5" gutterBottom>
                7. Cookies
            </Typography>
            <Typography variant="body1" paragraph>
                Notre site peut utiliser des cookies pour améliorer votre expérience. Vous pouvez paramétrer votre navigateur pour refuser les cookies ou être informé de leur utilisation.
            </Typography>

            <Typography variant="h5" gutterBottom>
                8. Modifications de cette politique
            </Typography>
            <Typography variant="body1" paragraph>
                Nous nous réservons le droit de modifier la présente Politique de Confidentialité à tout moment. Les modifications prendront effet dès leur publication sur cette page.
            </Typography>

            <Typography variant="body1" paragraph>
                Nous vous encourageons à consulter régulièrement cette page pour rester informé(e) de nos pratiques.
            </Typography>

            <Typography variant="body1" mt={4}>
                📧 Pour toute question concernant cette politique, contactez-nous à :{" "}
                <Link href="mailto:contact@votresite.com">contact@votresite.com</Link>.
            </Typography>
        </Box>
    );
}
