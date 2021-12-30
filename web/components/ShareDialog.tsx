import { Box, Dialog, DialogContent, DialogTitle, Stack } from "@mui/material";
import { GiftCard } from "store/gifts";

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
      </DialogContent>
    </Dialog>
  );
}
