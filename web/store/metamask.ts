import create from "zustand";
import { useCallback, useEffect, useMemo } from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import { ethers } from "ethers";

type UseMetamaskStore = {
  ethereum: any;
};

const useMetamaskInner = create<UseMetamaskStore>(() => ({
  ethereum: null,
}));

/**
 * Gets the metamask ethereum JS API that is injected by the extension.
 */
export function useMetamask() {
  return useMetamaskInner(useCallback((state) => state.ethereum, []));
}

/**
 * Gets the ethers client.
 */
export function useEthers() {
  const metamask = useMetamask();
  return useMemo(() => new ethers.providers.Web3Provider(metamask), [metamask]);
}

/**
 * Initializes the metamask for the app.
 */
export function useInitializeMetamask() {
  useEffect(() => {
    detectEthereumProvider().then((ethereum) =>
      useMetamaskInner.setState({
        ethereum,
      })
    );
  }, []);
}
