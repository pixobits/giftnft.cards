import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import { GiftCard, useUnwrapGift } from "store/gifts";
import { useAsyncFn } from "react-use";
import { LoadingButton } from "@mui/lab";

type UnwrapConfirmationProps = {
  giftCard: GiftCard;
  open: boolean;
  onClose: () => void;
};

export default function UnwrapConfirmation({
  giftCard,
  open,
  onClose,
}: UnwrapConfirmationProps) {
  const unwrapGift = useUnwrapGift();
  const [{ loading }, onUnwrap] = useAsyncFn(async () => {
    await unwrapGift(giftCard.tokenId.toString());
    onClose();
  }, [giftCard.tokenId, unwrapGift]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Unwrap your Gift Card</DialogTitle>
      <DialogContent>
        <Typography>
          Unwrapping will withdraw the amount stored in the gift card into your
          account.
        </Typography>
        <Stack alignItems="center">
          <Box
            component="img"
            src={giftCard.imageDataUrl}
            alt={giftCard.signedBy}
            sx={{ width: 300, height: 400, mt: 4 }}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <LoadingButton variant="contained" onClick={onUnwrap} loading={loading}>
          Unwrap
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
