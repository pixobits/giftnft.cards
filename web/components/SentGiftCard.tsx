import { Box, Paper } from "@mui/material";
import { GiftCard } from "store/gifts";
import { useBoolean } from "react-use";
import { useCallback } from "react";
import ShareDialog from "components/ShareDialog";

type SentGiftCardProps = {
  giftCard: GiftCard;
};

/**
 * A gift card that is sent by the user themselves.
 */
export default function SentGiftCard({ giftCard }: SentGiftCardProps) {
  const [open, toggle] = useBoolean(false);
  const onOpen = useCallback(() => toggle(true), [toggle]);
  const onClose = useCallback(() => toggle(false), [toggle]);

  return (
    <>
      <Paper
        sx={{ width: 300 / 1.5, height: 400 / 1.5, mb: 2, cursor: "pointer" }}
        onClick={onOpen}
      >
        <Box
          component="img"
          src={giftCard.imageDataUrl}
          alt={giftCard.signedBy}
          sx={{ width: 300 / 1.5, height: 400 / 1.5 }}
        />
      </Paper>

      <ShareDialog open={open} onClose={onClose} giftCard={giftCard} />
    </>
  );
}
