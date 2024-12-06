

# Test Assessment Report: Adding XAU/USD Pair to GMX
## Task Overview
The objective of this assessment was to integrate the XAU/USD trading pair into both the GMX UI and smart contract functionalities. The source for the XAU/USD price was Chainlink’s decentralized data feeds. The task included implementing the solution on a testnet, with flexibility to choose any supported testnet for development and testing.

## Resources
### The GMX repositories for reference:

- GMX Interface (UI): GitHub - gmx-interface
- GMX Smart Contracts: GitHub - gmx-contracts

### Chainlink Data Feeds documentation: Chainlink Docs - Using Data Feeds

### Relevant Chainlink feed for XAU/USD: XAU/USD Price Feed

## Solution Approach
The existing API used by GMX (https://arbitrum-api.gmxinfra.io/prices/tickers) is not designed for direct customization, making it challenging to directly add the XAU/USD pair information. To address this, the approach was to intercept and augment the API’s original response by appending XAU/USD data fetched from Chainlink.

The integration involved the following key components:

### Smart Contract Development
Chainlink Data Feeds were leveraged to fetch reliable and decentralized price data for XAU/USD. These feeds aggregate data from numerous sources and ensure secure delivery to the smart contract.

- Testnet Selection: Sepolia was chosen for its compatibility and availability of Chainlink price feeds.
- Data Source: The XAU/USD price feed was accessed using the Chainlink AggregatorV3Interface.
- Aggregator Address for Sepolia: 0xC5981F461d74c46eB4b0CF3f4Ec79f025573B0Ea
### Technical Implementation
- Chainlink AggregatorV3Interface:
This interface was used to fetch the latest XAU/USD price data. The implementation involved:
- Initializing the price feed in the contract constructor.
Fetching the latest price through the latestRoundData method.
```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";

contract PriceConsumer {
    AggregatorV3Interface internal dataFeed;

    /**
     * Network: Sepolia
     * Aggregator: BTC/USD
     * Address: 0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43
     */
    constructor() {
        dataFeed = AggregatorV3Interface(
            0xC5981F461d74c46eB4b0CF3f4Ec79f025573B0Ea
        );
    }

    /**
     * Returns the latest answer.
     */
    function getChainlinkDataFeedLatestAnswer() public view returns (int) {
        // prettier-ignore
        (
            /* uint80 roundID */,
            int answer,
            /*uint startedAt*/,
            /*uint timeStamp*/,
            /*uint80 answeredInRound*/
        ) = dataFeed.latestRoundData();
        return answer;
    }
}
```
