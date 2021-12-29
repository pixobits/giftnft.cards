import { ethers } from "ethers";

export function formatAmount(amount: string, unit: 0 | 9 | 18) {
  if (!amount) {
    return "";
  }

  const inWei = ethers.BigNumber.from(amount).mul(
    ethers.BigNumber.from(10).pow(unit)
  );

  // If the amount is greater than 0.0001 Metis, show in metis.
  const inMetis = inWei.div(ethers.BigNumber.from(10).pow(18));
  if (inMetis.gt(0)) {
    return `$METIS ${inMetis}`;
  }

  const inGwei = inWei.div(ethers.BigNumber.from(10).pow(9));
  if (inGwei.gt(0)) {
    return `$GWEI ${inGwei}`;
  }

  return `$WEI ${inWei}`;
}
