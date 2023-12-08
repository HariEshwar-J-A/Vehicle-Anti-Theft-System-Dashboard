import React from "react";
import PubNub from "pubnub";
import { PubNubProvider } from "pubnub-react";
import Home from "./components/home/Home";

const pubnub = new PubNub({
  publishKey: process.env.REACT_APP_PUB_KEY,
  subscribeKey: process.env.REACT_APP_SUB_KEY,
  userId: process.env.REACT_APP_UUID,
});

function App() {
  return (
    <PubNubProvider client={pubnub}>
      <Home />
    </PubNubProvider>
  );
}

export default App;
