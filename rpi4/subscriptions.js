export const getNewEvents = async (supabase) => {
  const { data, error } = await supabase
    .from("events")
    .select("block_number")
    .order("block_number", { ascending: false })
    .limit(1);
  console.error(error);

  const blockNumber = (data && data[0] && data[0]["block_number"]) || 0;
  console.log(blockNumber);

  const graphqlQuery = {
    query: `
      {
        drinkPurchaseds(where: {blockNumber_gt: ${blockNumber}}) {
          blockNumber
          blockTimestamp
          drinkId
          id
          owner
          transactionHash
        }
      }
    `,
  };

  let response = await fetch(
    "https://api.studio.thegraph.com/query/58578/subgraph-zksync/v0.0.1",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(graphqlQuery),
    }
  ).then((response) => {
    return response.json();
  });

  let events = response["data"]["drinkPurchaseds"];
  console.log(events);

  let x = events.map((x) => ({
    block_number: parseFloat(x.blockNumber),
    block_timestamp: parseFloat(x.blockTimestamp),
    drink_id: parseFloat(x.drinkId),
    event_id: x.id,
    owner: x.owner,
    transaction_hash: x.transactionHash,
  }));

  {
    let { error } = await supabase.from("events").insert(x).select();
    console.error(error);
  }

  return x;
};
