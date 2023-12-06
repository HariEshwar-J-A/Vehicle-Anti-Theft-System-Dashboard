import React, { useEffect, useState } from 'react'
import styles from './Dashboard.module.scss'

const Dashboard = () => {
  return (
    <div className={styles.dashboard}>
      <DriverPresenceIndicator />
      <DriverAuthenticatedIndicator />
      <AlarmIndicator/>
      <CurrentStateIndicator />
    </div>
  )
}

const DriverPresenceIndicator = () => {
  const [isPresent, setIsPresent] = useState(true)

  return (
    <div className={styles.presenceIndicator}>
      <div className={styles.indicatorLabel}>Human in Car:</div>
      <div
        className={`${styles.led} ${isPresent ? styles.turnedOn : ''}`}
      ></div>
    </div>
  )
}

const CurrentStateIndicator = () => {
  const [currentState, setCurrentState] = useState('Drive Mode')

  const turnOnLockMode = () => setCurrentState('Lock Mode')
  const turnOnDriveMode = () => setCurrentState('Drive Mode')
  const turnOnShutdownMode = () => setCurrentState('Shutdown Mode')

  return (
    <div className={styles.statusIndicator}>
      <div className={styles.currentState}>
        Current State:
      </div>
      <div className={styles.currentStateValue}>{currentState}</div>
    </div>
  )
}

const DriverAuthenticatedIndicator = () => {
    const [isDriverAuthenticated, setIsDriverAuthenticated] = useState(true);

    return (
        <div className={styles.presenceIndicator}>
          <div className={styles.indicatorLabel}>Driver Authenticated: </div>
          <div
            className={`${styles.led} ${isDriverAuthenticated ? styles.turnedOn : ''}`}
          ></div>
        </div>
      )
}

const AlarmIndicator = () => {
    const [isAlarmOn, setIsAlarmOn] = useState(false);

    useEffect(() => {
        if (isAlarmOn) {
            const notify = new Notification("Alarm Activated, Check your Car!")
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
