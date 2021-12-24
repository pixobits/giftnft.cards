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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  message: z.string().min(1, "Required"),
  name: z.string().min(1, "Required"),
  amount: z
    .string()
    .transform((val) => parseInt(val, 10))
    .refine((v) => v > 0, "A gift card needs to have some coins"),
  recipient: z.string().regex(/^0x[a-fA-F0-9]{40}$/, "Invalid wallet address"),
});

type SchemaType = z.infer<typeof schema>;

export default function MintGiftCard() {
  const giftCardRef = useRef();
  const [, takeScreenshot] = useScreenshot();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      message: "",
      name: "",
      amount: 1,
      recipient: "",
    },
    resolver: zodResolver(schema),
  });

  const onMintGiftCard = useCallback(
    async (state: SchemaType) => {
      console.log(state);
      // const img = await takeScreenshot(giftCardRef.current);
      // console.log(img);
    },
    [takeScreenshot]
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
            <Stack
              component="form"
              spacing={2}
              sx={{ width: 400 }}
              onSubmit={handleSubmit(onMintGiftCard)}
            >
              <TextField
                {...materialRegister(register, "message")}
                placeholder="Best wishes"
                multiline
                minRows={2}
                fullWidth
                helperText={errors.message?.message}
                error={!!errors.message}
              />
              <TextField
                {...materialRegister(register, "name")}
                placeholder="Your name"
                fullWidth
                helperText={errors.name?.message}
                error={!!errors.name}
              />
              <TextField
                type="number"
                {...materialRegister(register, "amount")}
                placeholder="Amount"
                fullWidth
                helperText={errors.amount?.message}
                error={!!errors.amount}
              />
              <TextField
                {...materialRegister(register, "recipient")}
                placeholder="Recipient"
                fullWidth
                helperText={errors.recipient?.message}
                error={!!errors.recipient}
              />
              <Button variant="contained" type="submit">
                Mint your Gift
              </Button>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}
