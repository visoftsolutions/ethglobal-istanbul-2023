import {
  DrinkPriceUpdated as DrinkPriceUpdatedEvent,
  DrinkPurchased as DrinkPurchasedEvent,
  OwnershipTransferred as OwnershipTransferredEvent
} from "../generated/DeepShot/DeepShot"
import {
  DrinkPriceUpdated,
  DrinkPurchased,
  OwnershipTransferred
} from "../generated/schema"

export function handleDrinkPriceUpdated(event: DrinkPriceUpdatedEvent): void {
  let entity = new DrinkPriceUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.drinkId = event.params.drinkId
  entity.newPrice = event.params.newPrice

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleDrinkPurchased(event: DrinkPurchasedEvent): void {
  let entity = new DrinkPurchased(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.owner = event.params.owner
  entity.drinkId = event.params.drinkId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
