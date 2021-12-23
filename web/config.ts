const config = {
  CONTRACT_ADDRESS: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!,
  CONTRACT_ABI: process.env.NEXT_PUBLIC_CONTRACT_ABI!,
};

if (!config.CONTRACT_ADDRESS || !config.CONTRACT_ABI) {
  throw new Error("environment is not configured");
}

export default config;
