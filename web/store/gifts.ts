import { useEthers } from "store/metamask";
import { useQuery } from "react-query";
import { ethers } from "ethers";
import config from "config";
import { useAccount } from "store/account";

/**
 * Fetch all the gift cards owned by the current selected account.
 */
export function useMyGifts() {
  const eth = useEthers();

  return useQuery("use-my-gifts", async () => {
    const contract = new ethers.Contract(
      config.CONTRACT_ADDRESS,
      config.CONTRACT_ABI,
      eth
    );

    const accountId = useAccount.getState().accountId;
    if (!accountId) {
      return;
    }

    const giftsCount = await contract.balanceOf(accountId);
    return await Promise.all(
      Array(giftsCount)
        .fill(0)
        .map(async (_, index) => contract.getGiftCardByIndex(index))
    );
  });
}
