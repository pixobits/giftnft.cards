// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721EnumerableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";

/// @custom:security-contact pepsighan@sharadchand.com
contract GiftNFTCard is
    Initializable,
    ERC721Upgradeable,
    ERC721EnumerableUpgradeable,
    OwnableUpgradeable
{
    using CountersUpgradeable for CountersUpgradeable.Counter;

    /// GiftCard contains all the metadata stored within an NFT.
    struct GiftCard {
        /// The ID of the NFT token.
        uint256 tokenId;
        /// The amount that is wrapped within this gift card.
        uint256 amount;
        /// The gift card image data URL.
        string imageDataUrl;
        /// Message on the gift card.
        string message;
        /// The one who sent this gift card.
        string signedBy;
        /// Whether the amount in the gift is unwrapped.
        bool isUnwrapped;
        /// Whether this gift card actually exists.
        bool isInitialized;
    }

    CountersUpgradeable.Counter private _tokenIdCounter;
    string private _contractBaseURI;

    /// The map of all the gift cards attached to the NFT.
    mapping(uint256 => GiftCard) private _giftMap;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() initializer {}

    function initialize(string memory uri) public initializer {
        __ERC721_init("Gift NFT Card", "GNFTCARD");
        __ERC721Enumerable_init();
        __ERC721Burnable_init();
        __Ownable_init();
        _contractBaseURI = uri;
    }

    function _baseURI() internal view override returns (string memory) {
        return _contractBaseURI;
    }

    /// Mint new gift card NFT.
    function safeMint(
        address to,
        string memory imageDataUrl,
        string memory message,
        string memory signedBy
    ) public payable onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);

        // Store the metadata of the NFT in the map.
        _giftMap[tokenId] = GiftCard({
            tokenId: tokenId,
            amount: msg.value,
            imageDataUrl: imageDataUrl,
            message: message,
            signedBy: signedBy,
            isUnwrapped: false,
            isInitialized: true
        });
    }

    // The following functions are overrides required by Solidity.

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override(ERC721Upgradeable, ERC721EnumerableUpgradeable) {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721Upgradeable, ERC721EnumerableUpgradeable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
