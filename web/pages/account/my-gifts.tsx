import { Container, Grid, Typography } from "@mui/material";
import { NextSeo } from "next-seo";
import Navigation from "components/Navigation";
import { useMyGifts } from "store/gifts";
import MyGiftCard from "components/MyGiftCard";

export default function MyGifts() {
  const { data: gifts } = useMyGifts();

  return (
    <>
      <NextSeo title="My Gifts" />
      <Navigation />
      <Typography variant="h5" textAlign="center" sx={{ mt: 4 }}>
        My Gifts
      </Typography>

      <Container maxWidth="lg" sx={{ mt: 8, mb: 4 }}>
        <Grid container spacing={4}>
          {(gifts ?? []).map((it) => (
            <Grid item key={it.tokenId._hex}>
              <MyGiftCard giftCard={it} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
