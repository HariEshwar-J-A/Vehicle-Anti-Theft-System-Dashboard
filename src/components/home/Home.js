import React, { useState, useEffect } from 'react'
import { usePubNub } from 'pubnub-react'
import Header from '../header/Header'
import Footer from '../footer/Footer'
import Dashboard from '../dashboard/Dashboard'
import Logs from '../logs/Logs'

import Button from '@mui/material/Button'

import styles from './Home.module.scss'

const Home = () => {
  const [isLogsOpen, setIsLogsOpen] = useState(true)

  const toggleLogsWindow = () => setIsLogsOpen(prevState => !prevState)

  const pubnub = usePubNub()
  const [channels] = useState([process.env.REACT_APP_CHANNEL])
  const [messages, addMessage] = useState([])
  const [currentState, setCurrentState] = useState('Lock Mode');
  const [isBrakeOverridden, setIsBrakeOverridden] = useState(false);
  const [isAlarmOn, setIsAlarmOn] = useState(false);
  const [isEngineOn, setIsEngineOn] = useState(false);
  const [timeStamp, setTimeStamp] = useState('');
  const [rawData, setRawData] = useState({});
  const [userName, setUserName] = useState('None');
  const [userPresence, setUserPresence] = useState(false);

  const handleMessage = event => {
    const message = event.message
    console.log(typeof message)

    if (typeof message === 'string' || message.hasOwnProperty('messageType')) {
      
      const jsonMessage = JSON.parse(message);
      console.log(jsonMessage)
      
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
        case 'state_update':
          setCurrentState(receivedCurrentState)
          setIsBrakeOverridden(receivedIsBrakeOverridden)
          setIsAlarmOn(receivedIsAlarmOn)
          setIsEngineOn(receivedIsEngineOn)
          setTimeStamp(receivedTimeStamp)
          setRawData(receivedRawData)
          break
        case 'sensor_update':
          setUserName(receivedUserName)
          setUserPresence(receivedUserPresence)
          setTimeStamp(receivedTimeStamp)
          setRawData(receivedRawData)
          break
        default:
          break
      }
    }

    if (typeof message === 'string' || message.hasOwnProperty('text')) {
      const text = message.text || message
      addMessage(messages => [...messages.slice(0, 99), text])
    }
  }

  useEffect(() => {
    const listenerParams = { message: handleMessage }
    pubnub.addListener(listenerParams)
    pubnub.subscribe({ channels })
    return () => {
      pubnub.unsubscribe({ channels })
      pubnub.removeListener(listenerParams)
    }
  }, [pubnub, channels])

  return (
    <div className={styles.home}>
      <Header />
      <Button
        className={`${styles.logButton} ${isLogsOpen ? styles.turnedOn : ''}`}
        variant='contained'
        onClick={toggleLogsWindow}
      >
        Logs
      </Button>
      {isLogsOpen && <Logs messages={messages} />}
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
  )
}

export default Home
