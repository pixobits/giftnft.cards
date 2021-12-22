import create from "zustand";
import { useCallback, useEffect } from "react";
import detectEthereumProvider from "@metamask/detect-provider";

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
