import { Typography } from "@mui/material";
import { useSentGifts } from "store/gifts";

export default function SentGifts() {
  const data = useSentGifts();

  return (
    <>
      <Typography>Sent Gifts</Typography>
      {JSON.stringify(data)}
    </>
  );
}
