#!/usr/bin/env bash

export NETWORK_NAME=ArbitrumSepolia && export CONTRACT_ADDRESS=0xad83c78433c3720fcd9e034ab64ac496b2aa62a1 && npx hardhat run --network arbitrumSepolia scripts/changeprice.ts
export NETWORK_NAME=ScrollSepolia && export CONTRACT_ADDRESS=0xa460ab650ea359a6bab7a7c1d2669389b124acb7 && npx hardhat run --network scrollSepolia scripts/changeprice.ts
export NETWORK_NAME=LineaGoerli && export CONTRACT_ADDRESS=0xad83c78433c3720fcd9e034ab64ac496b2aa62a1 && npx hardhat run --network lineaGoerli scripts/changeprice.ts
export NETWORK_NAME=BaseSepolia && export CONTRACT_ADDRESS=0x8b1f0d0b8a0a6ddcb0b64e065906d3a0c85e2807 && npx hardhat run --network baseSepolia scripts/changeprice.ts
