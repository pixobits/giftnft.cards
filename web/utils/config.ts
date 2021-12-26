const config = {
  CHAIN_ID: parseInt(process.env.NEXT_PUBLIC_CHAIN_ID!),
  CONTRACT_ADDRESS: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!,
  CONTRACT_ABI: process.env.NEXT_PUBLIC_CONTRACT_ABI!,
};

if (!config.CONTRACT_ADDRESS || !config.CONTRACT_ABI || !config.CHAIN_ID) {
  throw new Error("environment is not configured");
}

export default config;
