import { useAccount } from "store/account";
import { useCallback } from "react";
import ConnectView from "components/ConnectView";
import AccountView from "components/AccountView";

export default function Home() {
  const accountId = useAccount(useCallback((state) => state.accountId, []));
  return accountId ? <AccountView /> : <ConnectView />;
}
