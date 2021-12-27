import { useQuery, useQueryClient } from "react-query";
import { useAccount } from "store/account";
import { useCallback, useEffect } from "react";
import { getContract } from "utils/metamask";
import { ethers } from "ethers";

type GiftCard = {
  tokenId: ethers.BigNumber;
  amount: ethers.BigNumber;
  imageDataUrl: string;
  message: string;
  signedBy: string;
  isUnwrapped: boolean;
};

/**
 * Fetch all the gift cards owned by the current selected account.
 */
export function useMyGifts() {
  const accountId = useAccount(useCallback((state) => state.accountId, []));

  const { refetch, ...rest } = useQuery<GiftCard[]>(
    "use-my-gifts",
    useCallback<() => Promise<GiftCard[]>>(async () => {
      if (!accountId) {
        return [];
      }

      const contract = await getContract();
      if (!contract) {
        return [];
      }

      const giftsCount = await contract.balanceOf(accountId);
      return await Promise.all(
        Array(giftsCount.toNumber())
          .fill(0)
          .map(async (_, index) => {
            const [
              tokenId,
              amount,
              imageDataUrl,
              message,
              signedBy,
              isUnwrapped,
            ] = await contract.getGiftCardByIndex(index);
            return {
              tokenId,
              amount,
              imageDataUrl,
              message,
              signedBy,
              isUnwrapped,
            };
          })
      );
    }, [accountId])
  );

  useEffect(() => {
    // Refetch when account id changes.
    if (accountId) {
      refetch();
    }
  }, [refetch, accountId]);

  return { refetch, ...rest };
}

/**
 * Fetch all the gifts sent by the selected account.
 */
export function useSentGifts() {
  return useQuery<GiftCard[]>(
    "use-sent-gifts",
    useCallback<() => Promise<GiftCard[]>>(async () => {
      const contract = await getContract();
      if (!contract) {
        return [];
      }

      const giftsCount = await contract.lengthOfSentGiftCards();
      return await Promise.all(
        Array(giftsCount.toNumber())
          .fill(0)
          .map(async (_, index) => {
            const [
              tokenId,
              amount,
              imageDataUrl,
              message,
              signedBy,
              isUnwrapped,
            ] = await contract.getSentGiftCardByIndex(index);
            return {
              tokenId,
              amount,
              imageDataUrl,
              message,
              signedBy,
              isUnwrapped,
            };
          })
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
