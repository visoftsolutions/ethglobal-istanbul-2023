import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt, Address } from "@graphprotocol/graph-ts"
import { DrinkPriceUpdated } from "../generated/schema"
import { DrinkPriceUpdated as DrinkPriceUpdatedEvent } from "../generated/DeepShot/DeepShot"
import { handleDrinkPriceUpdated } from "../src/deep-shot"
import { createDrinkPriceUpdatedEvent } from "./deep-shot-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let drinkId = BigInt.fromI32(234)
    let newPrice = BigInt.fromI32(234)
    let newDrinkPriceUpdatedEvent = createDrinkPriceUpdatedEvent(
      drinkId,
      newPrice
    )
    handleDrinkPriceUpdated(newDrinkPriceUpdatedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("DrinkPriceUpdated created and stored", () => {
    assert.entityCount("DrinkPriceUpdated", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "DrinkPriceUpdated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "drinkId",
      "234"
    )
    assert.fieldEquals(
      "DrinkPriceUpdated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "newPrice",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
