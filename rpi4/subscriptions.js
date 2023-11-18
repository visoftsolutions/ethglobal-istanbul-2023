export const zksyncTheGraphUrl = "https://api.studio.thegraph.com/query/58578/subgraph-zksync/v0.0.2";
export const arbitrumTheGraphUrl = "https://api.studio.thegraph.com/query/58578/subgraph-arbitrumsepolia/v0.0.1";
export const scrollTheGraphUrl = "https://api.studio.thegraph.com/query/58578/subgraph-scroll/v0.0.1";
export const baseTheGraphUrl = "https://api.studio.thegraph.com/query/58578/subgraph-base/v0.0.1";

export const getAllNewEvents = async (supabase) => {
  const zksyncEvents = await getZksyncNewEvents(supabase);
  const arbitrumEvents = await getArbitrumNewEvents(supabase);
  const scrollEvents = await getScrollNewEvents(supabase);
  const baseEvents = await getBaseNewEvents(supabase);
  return [].concat(zksyncEvents, arbitrumEvents, scrollEvents, baseEvents);
}

export const getZksyncNewEvents = async (supabase) => {
  return await getNewEvents(supabase, zksyncTheGraphUrl, "zksync_events");
}

export const getArbitrumNewEvents = async (supabase) => {
  return await getNewEvents(supabase, arbitrumTheGraphUrl, "arbitrum_events");
}

export const getScrollNewEvents = async (supabase) => {
  return await getNewEvents(supabase, arbitrumTheGraphUrl, "scroll_events");
}

export const getBaseNewEvents = async (supabase) => {
  return await getNewEvents(supabase, arbitrumTheGraphUrl, "base_events");
}

export const getNewEvents = async (supabase, url, name) => {
  const { data, error } = await supabase
    .from(name)
    .select("block_number")
    .order("block_number", { ascending: false })
    .limit(1);
  console.error(error);

  const blockNumber = (data && data[0] && data[0].block_number) || 0;
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

  const response = await fetch(
    url,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(graphqlQuery),
    },
  ).then((response) => {
    return response.json();
  });

  const events = response.data.drinkPurchaseds;
  console.log(events);

  const x = events.map((x) => ({
    block_number: parseFloat(x.blockNumber),
    block_timestamp: parseFloat(x.blockTimestamp),
    drink_id: parseFloat(x.drinkId),
    event_id: x.id,
    owner: x.owner,
    transaction_hash: x.transactionHash,
  }));

  {
    const { error } = await supabase.from("events").insert(x).select();
    console.error(error);
  }

  return x;
};
