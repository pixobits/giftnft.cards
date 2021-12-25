import { useQuery, useQueryClient } from "react-query";
import { useAccount } from "store/account";
import { useCallback } from "react";
import { getContract } from "utils/metamask";

/**
 * Fetch all the gift cards owned by the current selected account.
 */
export function useMyGifts() {
  return useQuery(
    "use-my-gifts",
    useCallback(async () => {
      const contract = await getContract();
      if (!contract) {
        return;
      }

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
    }, [])
  );
}

/**
 * Fetch all the gifts sent by the selected account.
 */
export function useSentGifts() {
  return useQuery(
    "use-sent-gifts",
    useCallback(async () => {
      const contract = await getContract();
      if (!contract) {
        return;
      }

      const giftsCount = await contract.lengthOfSentGiftCards();
      return await Promise.all(
        Array(giftsCount.toNumber())
          .fill(0)
          .map(async (_, index) => contract.getSentGiftCardByIndex(index))
      );
    }, [])
  );
}

type NewGiftCard = {
  recipient: string;
  amount: string;
  imageDataUrl: string;
  message: string;
  signedBy: string;
};

/**
 * Mint a new gift card.
 */
export function useMintGiftCard() {
  const client = useQueryClient();

  return useCallback(
    async (arg: NewGiftCard) => {
      const contract = await getContract();
      if (!contract) {
        return;
      }
      await contract.safeMint(
        arg.recipient,
        arg.imageDataUrl,
        arg.message,
        arg.signedBy,
        // Send the following amount to be wrapped in the gift card.
        { value: arg.amount }
      );

      // Refetch the gifts.
      await Promise.all([
        client.invalidateQueries("use-my-gifts"),
        client.invalidateQueries("use-sent-gifts"),
      ]);
    },
    [client]
  );
}
