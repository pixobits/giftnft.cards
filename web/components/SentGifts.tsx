import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import { useSentGifts } from "store/gifts";

export default function SentGifts() {
  const { data: gifts } = useSentGifts();

  return (
    <Container maxWidth="lg" sx={{ mt: 8, mb: 4 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Gifts you sent
      </Typography>
      <Grid container spacing={4}>
        {(gifts ?? []).map((it) => (
          <Grid item key={it.tokenId._hex}>
            <Paper sx={{ width: 400 / 2, height: 550 / 2, mb: 2 }}>
              <Box
                component="img"
                src={it.imageDataUrl}
                alt={it.signedBy}
                sx={{ width: 400 / 2, height: 550 / 2 }}
              />
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
