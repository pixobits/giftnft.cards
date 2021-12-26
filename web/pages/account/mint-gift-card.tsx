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
import { useCallback, useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { materialRegister } from "utils/materialForm";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMintGiftCard } from "store/gifts";
import { useSnackbar } from "notistack";
import html2canvas from "html2canvas";
import SentGifts from "components/SentGifts";
import RecipientTextField from "components/RecipientTextField";
import GiftAmountField from "components/GiftAmountField";
import { ethers } from "ethers";

const schema = z.object({
  message: z.string().min(1, "Required"),
  name: z.string().min(1, "Required"),
  amount: z
    .string()
    .regex(/^[0-9]+$/, "Not a valid amount")
    .refine((v) => parseInt(v, 10) > 0, "A gift card needs to have some coins"),
  amountTenPowerMultiplier: z.number(),
  recipient: z.string().regex(/^0x[a-fA-F0-9]{40}$/, "Invalid wallet address"),
});

type SchemaType = z.infer<typeof schema>;

export default function MintGiftCard() {
  const giftCardRef = useRef();

  const form = useForm({
    defaultValues: {
      message: "",
      name: "",
      amount: "1",
      amountTenPowerMultiplier: 1,
      recipient: "",
    },
    resolver: zodResolver(schema),
  });
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = form;

  const { enqueueSnackbar } = useSnackbar();

  const mintGiftCard = useMintGiftCard();
  const onMintGiftCard = useCallback(
    async (state: SchemaType) => {
      const canvas = await html2canvas(giftCardRef.current!, {
        width: 400,
        height: 550,
      });
      const imageDataUrl = canvas.toDataURL("image/webp");

      await mintGiftCard({
        signedBy: state.name,
        message: state.message,
        // Convert the amount to Wei.
        amount: ethers.BigNumber.from(state.amount)
          .mul(ethers.BigNumber.from(10).pow(state.amountTenPowerMultiplier))
          .toString(),
        recipient: state.recipient,
        imageDataUrl,
      });
      reset();
      enqueueSnackbar("Minting a new gift card...", {
        variant: "success",
      });
    },
    [enqueueSnackbar, mintGiftCard, reset]
  );

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
            <FormProvider {...form}>
              <Stack
                component="form"
                spacing={2}
                sx={{ width: 400 }}
                onSubmit={handleSubmit(onMintGiftCard)}
              >
                <RecipientTextField />
                <GiftAmountField />
                <TextField
                  {...materialRegister(register, "message")}
                  label="Message"
                  multiline
                  minRows={2}
                  fullWidth
                  helperText={errors.message?.message}
                  error={!!errors.message}
                />
                <TextField
                  {...materialRegister(register, "name")}
                  label="Your name"
                  fullWidth
                  helperText={errors.name?.message}
                  error={!!errors.name}
                />
                <Button variant="contained" type="submit">
                  Mint your Gift
                </Button>
              </Stack>
            </FormProvider>
          </Stack>
        </Grid>
      </Grid>

      <SentGifts />
    </>
  );
}
