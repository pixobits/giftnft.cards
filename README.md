# NFT Gift Cards

Gift your loved ones this holiday season NFT Gift cards which wrap in METIS token inside.

This is a part of Metis Hackathon (https://metis-ethereum.devpost.com/). You can try out the service at https://www.giftnft.cards/.

---

### Problem Definition

Sending gift cards to your loved ones is only possible with platforms such as Amazon. And these gift cards are limited to a single platform, expire after a duration and are not custom-made for the recipients.

### How does this solve it?

With NFT Gift Cards, people can send some money within a gift card in the form of an NFT. This works in the following way:
1. User mints an NFT with a custom-made gift card and adds some money (METIS) into it. 
2. This NFT is then transferred to their loved ones.
3. On the receiving end, the user views their NFT in the wallet.
4. Then unwraps the gift card, which withdraws the money (METIS) into their wallet which they can use to buy anything they want.

These minted NFT Gift Cards do not have some of the same limitations of conventional gift cards. They are:
1. Not limited to any merchant/platform where they can be used. The gift card money can be withdrawn to your bank account (via the usual channels) and can buy anything on any platform.
2. Not limited to the amount of money that can be put in the gift card. Put a 1B USD if you can.
3. No expiry date of the gift card. The user may unwrap the gift 10 years from now.
4. The gift card money is crypto and not fiat which will depreciate in value. Even the NFT will hold a special place in your heart which you can always look at.

---

### Scope of Work

The implemented PoC is mostly what I wanted the NFT Gift Cards to be. But a proper NFT Gift Cards service for the general public would look like:
1. People can gift any tokens (BTC, ETH, METIS, MATIC, ATOM, etc) whatever they have in their wallet that they would like to gift.
2. A proper gift card designer (user-friendly of course), which can craft beautiful NFTs for various occasions (Birthdays, Christmas, Diwali, Holi, Eid, etc).
3. Support for various wallets and not just MetaMask.

There are two costs associated with the work: development and operational. The operational costs are going to be fairly minimal as the costs are to be borne by the user of this service. As for development costs, it is going to be the usual costs of working on this for 2 months for a single developer.

---

### Technology

The technologies used for this project:
1. **Smart Contract using Solidity, OpenZeppelin, Hardhat, Ethers**: All the dev tools which were used to write NFT smart contract and deploy it.
2. **NextJS frontend**: to design the frontend with which the user can mint/send their NFT Gift Cards. And the receivers can unwrap/withdraw the amount stored in the gift cards.
3. **MetaMask wallet**: where all the METIS tokens are stored to mint and receive Gift Cards.
4. **Metis Ethereum Blockchain**: the blockchain platform which makes all of this possible.

---

### How to use?

You may use the NFT Gift Cards service by visiting the https://www.giftnft.cards/. If you want to try run it on your own, then you can follow through the READMEs of the individual projects:
1. SmartContract - [README.md](smartcontract/README.md)
2. Web - [README.md](web/README.md)

