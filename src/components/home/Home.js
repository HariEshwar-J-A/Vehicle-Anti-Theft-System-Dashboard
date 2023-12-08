import React, { useState, useEffect } from "react";
import { usePubNub } from "pubnub-react";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import Dashboard from "../dashboard/Dashboard";
import Logs from "../logs/Logs";
import Map from "../map/Map";

import Button from "@mui/material/Button";

import styles from "./Home.module.scss";

const Home = () => {
  const [isLogsOpen, setIsLogsOpen] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const pubnub = usePubNub();
  const [channels] = useState([process.env.REACT_APP_CHANNEL]);
  const [messages, addMessage] = useState([]);
  const [currentState, setCurrentState] = useState("Lock");
  const [isBrakeOverridden, setIsBrakeOverridden] = useState(false);
  const [isAlarmOn, setIsAlarmOn] = useState(false);
  const [isEngineOn, setIsEngineOn] = useState(false);
  const [timeStamp, setTimeStamp] = useState("");
  const [rawData, setRawData] = useState({});
  const [userName, setUserName] = useState(null);
  const [userPresence, setUserPresence] = useState(false);

  const toggleLogsWindow = () => {
    setIsLogsOpen((prevState) => !prevState);
    setIsMapOpen(false);
  };

  const toggleMapWindow = () => {
    setIsMapOpen((prevState) => !prevState);
    setIsLogsOpen(false);
  };

  const handleMessage = (event) => {
    const message = event.message;
    console.log(message);

    if (message["messageType"]) {
      const jsonMessage = message;
      console.log("message received!");

      const messageType = jsonMessage.messageType;
      const receivedCurrentState = jsonMessage.currentState;
      const receivedIsBrakeOverridden = jsonMessage.isBrakeOverridden;
      const receivedIsAlarmOn = jsonMessage.isAlarmOn;
      const receivedIsEngineOn = jsonMessage.isEngineOn;
      const receivedTimeStamp = jsonMessage.timeStamp;
      const receivedRawData = jsonMessage.rawData;
      const receivedUserName = jsonMessage.userName;
      const receivedUserPresence = jsonMessage.userPresence;

      switch (messageType) {
        case "state_update":
          setCurrentState(receivedCurrentState);
          setIsBrakeOverridden(receivedIsBrakeOverridden);
          setIsAlarmOn(receivedIsAlarmOn);
          setIsEngineOn(receivedIsEngineOn);
          setTimeStamp(receivedTimeStamp);
          setRawData(receivedRawData);
          break;
        case "sensor_update":
          setUserName(receivedUserName);
          setUserPresence(receivedUserPresence);
          setTimeStamp(receivedTimeStamp);
          setRawData(receivedRawData);
          break;
        default:
          break;
      }

      addMessage((messages) => [
        ...messages.slice(0, 99),
        JSON.stringify(message),
      ]);
    }
  };

  useEffect(() => {
    Notification.requestPermission().then((perm) => console.log(perm));
  }, []);

  useEffect(() => {
    const listenerParams = { message: handleMessage };
    pubnub.addListener(listenerParams);
    pubnub.subscribe({ channels });
    return () => {
      pubnub.unsubscribe({ channels });
      pubnub.removeListener(listenerParams);
    };
  }, [pubnub, channels]);

  return (
    <div className={styles.home}>
      <Header />
      <Button
        className={`${styles.logButton} ${isLogsOpen ? styles.turnedOn : ""}`}
        variant="contained"
        onClick={toggleLogsWindow}
      >
        Logs
      </Button>
      {isLogsOpen && <Logs messages={messages} />}
      <Button
        className={`${styles.mapButton} ${isMapOpen ? styles.turnedOn : ""}`}
        variant="contained"
        onClick={toggleMapWindow}
      >
        Maps
      </Button>
      {isMapOpen && <Map />}
      <Dashboard
        currentState={currentState}
        isBrakeOverridden={isBrakeOverridden}
        isAlarmOn={isAlarmOn}
        isEngineOn={isEngineOn}
        timeStamp={timeStamp}
        rawData={rawData}
        userName={userName}
        userPresence={userPresence}
      />
      <Footer />
    </div>
  );
};

export default Home;
