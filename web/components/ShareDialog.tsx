import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import { GiftCard } from "store/gifts";
import {
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

type ShareDialogProps = {
  open: boolean;
  onClose: () => void;
  giftCard: GiftCard;
};

/**
 * Allows sharing the minted NFT gift card on social channels.
 */
export default function ShareDialog({
  open,
  onClose,
  giftCard,
}: ShareDialogProps) {
  const url = "https://giftnft.cards/";
  const message =
    "I have sent a Gift Card NFT to your account. To access and unwrap your gift, visit Gift NFT Cards.";

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Share</DialogTitle>
      <DialogContent>
        <Stack alignItems="center">
          <Box
            component="img"
            src={giftCard.imageDataUrl}
            alt={giftCard.signedBy}
            sx={{ width: 300, height: 400 }}
          />
        </Stack>

        <Typography variant="subtitle2" textAlign="center" sx={{ mt: 2 }}>
          Share to the person that you have sent a Gift Card NFT
          <br /> to their account.
        </Typography>
        <Stack
          direction="row"
          justifyContent="center"
          spacing={2}
          sx={{ mt: 1 }}
        >
          <TwitterShareButton url={url} title={message}>
            <TwitterIcon size={32} round />
          </TwitterShareButton>

          <WhatsappShareButton url={url} title={message}>
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>

          <TelegramShareButton url={url} title={message}>
            <TelegramIcon size={32} round />
          </TelegramShareButton>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
