import { Box, Button } from "@mui/material";
import { GiftCard } from "store/gifts";
import { useBoolean } from "react-use";
import { useCallback } from "react";
import UnwrapConfirmation from "components/UnwrapConfirmation";

type MyGiftCardProps = {
  giftCard: GiftCard;
};

export default function MyGiftCard({ giftCard }: MyGiftCardProps) {
  const [open, toggle] = useBoolean(false);
  const onOpen = useCallback(() => toggle(true), [toggle]);
  const onClose = useCallback(() => toggle(false), [toggle]);

  return (
    <>
      <Box sx={{ width: 300, height: 400, mb: 2, position: "relative" }}>
        <Box
          component="img"
          src={giftCard.imageDataUrl}
          alt={giftCard.signedBy}
          sx={{ width: 300, height: 400 }}
        />

        {!giftCard.isUnwrapped && (
          <Button
            variant="contained"
            color="inherit"
            sx={{ position: "absolute", right: 8, top: 8 }}
            onClick={onOpen}
          >
            Unwrap Gift
          </Button>
        )}

        {giftCard.isUnwrapped && (
          <Button
            variant="contained"
            color="inherit"
            sx={{ position: "absolute", right: 8, top: 8 }}
            disabled
          >
            Unwrapped
          </Button>
        )}
      </Box>

      <UnwrapConfirmation giftCard={giftCard} open={open} onClose={onClose} />
    </>
  );
}
