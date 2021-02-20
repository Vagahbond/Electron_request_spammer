import React, { useState } from 'react';
import '../App.global.css';
import BurgersTable from '../components/BurgersTable';
import ConfManager from '../components/ConfManager';

import RequestButton from '../components/RequestButton';

import Burger from '../interfaces/Burger';

export default function Home() {
  const [burgers, setBurgers] = useState([
    {
      name: '',
      collerette_uid: '',
      aid: '',
      picture: '',
    },
  ] as Burger[]);

  function updateSpecificBurger(burger: Burger): void {
    const burgersClone: Burger[] = [];
    burgers.forEach((b, i) => {
      const cur = b;
      if (burgers[i].collerette_uid === burger.collerette_uid) {
        b.nbLikes = burger.nbLikes;
      }

      burgersClone.push(cur);
    });

    setBurgers(burgersClone);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div className="Hello">
        <h1>Burger design likes spammer</h1>
        <ConfManager
          onLoadConfCallBack={(newBurgers) => {
            setBurgers(newBurgers);
          }}
        />
        <RequestButton
          burgers={burgers}
          updateBurgerCallback={(burger) => {
            updateSpecificBurger(burger);
          }}
        />
      </div>
      <div className="Hello">
        <BurgersTable burgersScores={burgers} />
      </div>
    </div>
  );
}
