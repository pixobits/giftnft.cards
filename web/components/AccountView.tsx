import MintGiftCard from "components/MintGiftCards";
import Navigation from "components/Navigation";
import { Button, ButtonGroup } from "@mui/material";
import { useCallback, useState } from "react";
import MyGifts from "components/MyGifts";

export default function AccountView() {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <>
      <Navigation>
        <ButtonGroup>
          <Button
            variant={tabIndex === 0 ? "contained" : "outlined"}
            onClick={useCallback(() => setTabIndex(0), [])}
          >
            Mint a Gift Card
          </Button>
          <Button
            variant={tabIndex === 1 ? "contained" : "outlined"}
            onClick={useCallback(() => setTabIndex(1), [])}
          >
            My Gift Cards
          </Button>
        </ButtonGroup>
      </Navigation>

      {tabIndex === 0 ? <MintGiftCard /> : <MyGifts />}
    </>
  );
}
