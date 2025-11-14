// Composant pour l'affichage défilant des promotions
import React from "react";
import {
    Box,
} from '@mui/material';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
const PromoBanner = ({ promotions }) => {
    const [currentPromo, setCurrentPromo] = React.useState(0);

    React.useEffect(() => {
        if (promotions.length <= 1) return;
        const timer = setTimeout(() => {
            setCurrentPromo((prev) => (prev + 1) % promotions.length);
        }, 4000);
        return () => clearTimeout(timer);
    }, [currentPromo, promotions.length]);

    const promo = promotions[currentPromo];
    return (


    <Box
        key={promo.code}
        sx={{
            bgcolor: currentPromo % 2 === 0 ? 'green' : 'blue',
            color: 'white',
            textAlign: 'center',
            py: 1,
            fontWeight: 'bold',
            fontSize: { xs: '1rem', md: '1.1rem' },
            letterSpacing: 1,
            mb: 1,
            transition: 'background 0.5s',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 1,
        }}
    >
        {/* Description */}
        <span>{promo.description}</span>

        {/* Code promo */}
        {promo.code && promo.code !== '0' && (
            <span
                style={{
                    background: '#fff',
                    color: '#000',
                    padding: '2px 8px',
                    borderRadius: 4,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                }}
            >
      <LocalOfferIcon sx={{ fontSize: 18 }} />
      Code : {promo.code}
    </span>
        )}

        {/* Date d’expiration */}
        {promo.date_expiration && promo.date_expiration !== 'null' ? (
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
      <AccessTimeIcon sx={{ fontSize: 18 }} />
      Expire le :{' '}
                {new Date(
                    promo.date_expiration.seconds
                        ? promo.date_expiration.seconds * 1000
                        : promo.date_expiration
                ).toLocaleDateString()}
    </span>
        ) : (
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
      <AllInclusiveIcon sx={{ fontSize: 18 }} />
      Sans limite de durée
    </span>
        )}
    </Box>


    );
};
export default PromoBanner;

