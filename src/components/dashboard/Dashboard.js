import React, { useEffect } from 'react'
import styles from './Dashboard.module.scss'

const Dashboard = ({
  currentState,
  isBrakeOverridden,
  isAlarmOn,
  isEngineOn,
  timeStamp,
  rawData,
  userName,
  userPresence
}) => {


  return (
    <div className={styles.dashboard}>
      <DriverPresenceIndicator userPresence={userPresence} />
      <DriverAuthenticatedIndicator userName={userName}/>
      <AlarmIndicator isAlarmOn={isAlarmOn}/>
      <CurrentStateIndicator currentState={currentState}/>
      <EngineOnIndicator isEngineOn={isEngineOn}/>
      <BrakeOverriddenIndicator isBrakeOverridden={isBrakeOverridden}/>
    </div>
  )
}

const DriverPresenceIndicator = ({userPresence}) => {

  return (
    <div className={styles.presenceIndicator}>
      <div className={styles.indicatorLabel}>Human in Car:</div>
      <div
        className={`${styles.led} ${userPresence ? styles.turnedOn : ''}`}
      ></div>
    </div>
  )
}

const CurrentStateIndicator = ({currentState}) => {


  return (
    <div className={styles.statusIndicator}>
      <div className={styles.currentState}>Current State:</div>
      <div className={styles.currentStateValue}>{currentState} Mode</div>
    </div>
  )
}

const DriverAuthenticatedIndicator = ({userName}) => {
  return (
    <div className={styles.presenceIndicator}>
      <div className={styles.indicatorLabel}>Driver Authenticated: </div>
      <div
        className={`${styles.led} ${
          (userName !== null && userName !== 'Unrecognized Face')? styles.turnedOn : ''
        }`}
      ></div>
    </div>
  )
}

const EngineOnIndicator = ({isEngineOn}) => {
  return (
    <div className={styles.presenceIndicator}>
      <div className={styles.indicatorLabel}>Engine Status: </div>
      <div
        className={`${styles.led} ${
          isEngineOn ? styles.turnedOn : ''
        }`}
      ></div>
    </div>
  )
}

const BrakeOverriddenIndicator = ({isBrakeOverridden}) => {
  return (
    <div className={styles.presenceIndicator}>
      <div className={styles.indicatorLabel}>Brake Override Status: </div>
      <div
        className={`${styles.led} ${
          isBrakeOverridden ? styles.turnedOn : ''
        }`}
      ></div>
    </div>
  )
}

const AlarmIndicator = ({isAlarmOn}) => {

  useEffect(() => {
    if (isAlarmOn) {
      const notify = new Notification('Alarm Activated, Check your Car!')
      notify.close()
    }
  }, [isAlarmOn])

  return (
    <div className={styles.presenceIndicator}>
      <div className={styles.indicatorLabel}>Is Alarm Turned On: </div>
      <div
        className={`${styles.led} ${isAlarmOn ? styles.turnedOn : ''}`}
      ></div>
    </div>
  )
}

export default Dashboard
