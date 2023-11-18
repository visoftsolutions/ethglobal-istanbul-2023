import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import {
  DrinkPriceUpdated,
  DrinkPurchased,
  OwnershipTransferred
} from "../generated/DeepShot/DeepShot"

export function createDrinkPriceUpdatedEvent(
  drinkId: BigInt,
  newPrice: BigInt
): DrinkPriceUpdated {
  let drinkPriceUpdatedEvent = changetype<DrinkPriceUpdated>(newMockEvent())

  drinkPriceUpdatedEvent.parameters = new Array()

  drinkPriceUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "drinkId",
      ethereum.Value.fromUnsignedBigInt(drinkId)
    )
  )
  drinkPriceUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "newPrice",
      ethereum.Value.fromUnsignedBigInt(newPrice)
    )
  )

  return drinkPriceUpdatedEvent
}

export function createDrinkPurchasedEvent(
  owner: Address,
  drinkId: BigInt
): DrinkPurchased {
  let drinkPurchasedEvent = changetype<DrinkPurchased>(newMockEvent())

  drinkPurchasedEvent.parameters = new Array()

  drinkPurchasedEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  drinkPurchasedEvent.parameters.push(
    new ethereum.EventParam(
      "drinkId",
      ethereum.Value.fromUnsignedBigInt(drinkId)
    )
  )

  return drinkPurchasedEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}
