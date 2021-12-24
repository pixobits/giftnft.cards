import {
  Box,
  Button,
  colors,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { NextSeo } from "next-seo";
import { MdArrowBack, MdArrowForward } from "react-icons/md";
import Navigation from "components/Navigation";
// @ts-ignore
import { useScreenshot } from "use-react-screenshot";
import { useCallback, useRef } from "react";
import { useForm } from "react-hook-form";
import { materialRegister } from "utils/materialForm";

export default function MintGiftCard() {
  const giftCardRef = useRef();
  const [, takeScreenshot] = useScreenshot();

  const { register } = useForm({
    defaultValues: {
      message: "",
      name: "",
      amount: "",
      recipient: "",
    },
  });

  const onMintGiftCard = useCallback(async () => {
    const img = await takeScreenshot(giftCardRef.current);
    console.log(img);
  }, [takeScreenshot]);

  return (
    <>
      <NextSeo title="Mint a Gift Card" />
      <Navigation />
      <Typography variant="h5" textAlign="center" sx={{ mt: 4 }}>
        Mint a Gift Card
      </Typography>

      <Grid container spacing={8} sx={{ mt: 2 }}>
        <Grid item md={6}>
          <Stack
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            spacing={2}
          >
            <IconButton>
              <MdArrowBack />
            </IconButton>
            <Box
              ref={giftCardRef}
              sx={{
                width: 400,
                height: 550,
                boxShadow: 6,
                borderRadius: 2,
                background: `linear-gradient(60deg, ${colors.red["600"]} 0%, ${colors.pink["400"]} 20%, ${colors.purple["600"]} 100%)`,
              }}
            />
            <IconButton>
              <MdArrowForward />
            </IconButton>
          </Stack>
        </Grid>

        <Grid item md={6}>
          <Stack alignItems="flex-start">
            <Stack spacing={2} sx={{ width: 400 }}>
              <TextField
                {...materialRegister(register, "message")}
                placeholder="Best wishes"
                multiline
                minRows={2}
                fullWidth
              />
              <TextField
                {...materialRegister(register, "name")}
                placeholder="Your name"
                fullWidth
              />
              <TextField
                {...materialRegister(register, "amount")}
                placeholder="Amount"
                fullWidth
              />
              <TextField
                {...materialRegister(register, "recipient")}
                placeholder="Recipient"
                fullWidth
              />
              <Button variant="contained" onClick={onMintGiftCard}>
                Mint your Gift
              </Button>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}
