import React from 'react';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import Dashboard from '../dashboard/Dashboard';

import styles from './Home.module.scss';

const Home = () => {
  return (
    <div className={styles.home}>
      <Header/>
      <Dashboard/>
      <Footer/>
    </div>
  );
}

export default Home;