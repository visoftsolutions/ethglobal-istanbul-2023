// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";

/// @title DeepShot - a simple contract for managing a drink menu and purchases
contract DeepShot is Ownable {
    // Mapping of drink IDs to their respective prices
    mapping(uint256 => uint256) public menu;

    // Event emitted when a drink is purchased
    event DrinkPurchased(address owner, uint256 drinkId);

    // Event emitted when a drink price is updated
    event DrinkPriceUpdated(uint256 drinkId, uint256 newPrice);

    constructor() {}

    /// @notice Allows a customer to buy a drink if it's available and they have sent enough Ether
    /// @param drinkId The ID of the drink to purchase
    function buy(uint256 drinkId) external payable {
        uint256 drinkPrice = menu[drinkId];
        require(drinkPrice > 0, "Drink not available or not priced");
        require(msg.value >= drinkPrice, "Insufficient amount for this drink");

        emit DrinkPurchased(msg.sender, drinkId);
    }

    /// @notice Allows the owner to set or update the price of a drink
    /// @param drinkId The ID of the drink whose price is being set
    /// @param price The price to set for the drink
    function setDrinkPrice(uint256 drinkId, uint256 price) external onlyOwner {
        require(price > 0, "Price should be greater than zero");
        menu[drinkId] = price;

        emit DrinkPriceUpdated(drinkId, price);
    }
}
