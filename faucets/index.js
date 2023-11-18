import { TatumSDK, Network } from "@tatumio/tatum";

const tatum = await TatumSDK.init({
  network: Network.CELO_ALFAJORES,
});
const res = await tatum.faucet.fund(
  "0xa09768A5425727D1968Af6388132f045603Dc366"
);

if (res.data) {
  console.log(res.data);
} else {
  console.error(res.error);
}
