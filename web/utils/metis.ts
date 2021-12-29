/**
 * Calculates the amount in Wei based on the current unit that is selected.
 * The unit is either Wei or Gwei or Metis.
 */
export function calculateWei(amount: string, unit: 0 | 9 | 18): number {
  const multiplier = 10 ** unit;
  return Math.floor(Number(amount) * multiplier);
}

/**
 * Format the amount to legible unit.
 */
export function formatAmount(amount: string, unit: 0 | 9 | 18) {
  if (!amount) {
    return "";
  }

  const inWei = calculateWei(amount, unit);

  // If the amount is greater than 0.0001 Metis, show in Metis.
  const inMetis = inWei / 10 ** 18;
  if (inMetis > 0.0001) {
    return `$METIS ${inMetis}`;
  }

  // If the amount is greater than 0.0001 Gwei, show in Gwei.
  const inGwei = inWei / 10 ** 9;
  if (inGwei > 0.0001) {
    return `$GWEI ${inGwei}`;
  }

  return `$WEI ${inWei}`;
}
