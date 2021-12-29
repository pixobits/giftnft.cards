import {
  Alert,
  Box,
  CircularProgress,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useSentGifts } from "store/gifts";

export default function SentGifts() {
  const { data: gifts, isLoading } = useSentGifts();

  return (
    <Container maxWidth="lg" sx={{ mt: 8, mb: 4 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Gifts you sent
      </Typography>
      {isLoading && (
        <Stack alignItems="center">
          <CircularProgress />
        </Stack>
      )}

      {!isLoading && (gifts ?? []).length > 0 && (
        <Grid container spacing={4}>
          {(gifts ?? []).map((it) => (
            <Grid item key={it.tokenId._hex}>
              <Paper sx={{ width: 300 / 1.5, height: 400 / 1.5, mb: 2 }}>
                <Box
                  component="img"
                  src={it.imageDataUrl}
                  alt={it.signedBy}
                  sx={{ width: 300 / 1.5, height: 400 / 1.5 }}
                />
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}

      {!isLoading && (gifts ?? []).length === 0 && (
        <Alert severity="info">You have not sent any gifts yet.</Alert>
      )}
    </Container>
  );
}
