import { useEthers } from "store/metamask";
import { useQuery } from "react-query";
import { ethers } from "ethers";
import config from "config";

export function useMyGifts() {
  const eth = useEthers();

  useQuery("use-my-gifts", async () => {
    const contract = new ethers.Contract(
      config.CONTRACT_ADDRESS,
      config.CONTRACT_ABI,
      eth
    );
  });
}
