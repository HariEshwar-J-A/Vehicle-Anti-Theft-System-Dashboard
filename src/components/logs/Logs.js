import React, { useState, useEffect } from 'react'
import {usePubNub } from 'pubnub-react'
import styles from './Logs.module.scss';

const Logs = () => {
    const pubnub = usePubNub()
    const [channels] = useState([process.env.REACT_APP_CHANNEL])
    const [messages, addMessage] = useState([])
  
    const handleMessage = event => {
      const message = event.message
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
      <div style={pageStyles}>
        <div style={chatStyles}>
          <div style={headerStyles}>Last 100 Logs</div>
          <div style={listStyles}>
            {messages.map((message, index) => {
              return (
                <div key={`message-${index}`} style={messageStyles}>
                  {message}
                </div>
              )
            })}
          </div>
         
        </div>
      </div>
    )
  }


const pageStyles = {
    alignItems: 'center',
    background: '#282c34',
    display: 'flex',
    justifyContent: 'center',
    minHeight: '100vh'
  }
  
  const chatStyles = {
    display: 'flex',
    flexDirection: 'column',
    height: '50vh',
    width: '50%'
  }
  
  const headerStyles = {
    background: '#323742',
    color: 'white',
    fontSize: '1.4rem',
    padding: '10px 15px'
  }
  
  const listStyles = {
    alignItems: 'flex-start',
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    overflow: 'auto',
    padding: '10px'
  }
  
  const messageStyles = {
    backgroundColor: '#eee',
    borderRadius: '5px',
    color: '#333',
    fontSize: '1.1rem',
    margin: '5px',
    padding: '8px 15px'
  }

export default Logs