import React, { useEffect, useState } from 'react';
import axios from 'axios';

const { session } = require('electron').remote;

const burgers = [
  {
    name: 'Delfino Burger',
    collerette_uid: '51185105-1f67-44bd-9b64-ef7a9242243b',
    aid: '805',
  },
  {
    name: 'Wide Putin',
    collerette_uid: '9a7ab3ec-a7fc-4f56-b9c3-a2b1894bfc64',
    aid: '439',
  },
  {
    name: 'Le JVCD Giant ',
    collerette_uid: '55091e81-26ee-4f38-831a-6cc2a03b12a3',
    aid: '776',
  },
  {
    name: 'Stonks',
    collerette_uid: 'f9049212-41e5-4678-83c1-fe1fd8cec956',
    aid: '313',
  },
  {
    name: 'Make Quick Giant Again',
    collerette_uid: '1c950ad0-bc3e-4676-a2e8-03b631da15c7',
    aid: '229',
  },
  {
    name: 'le dernier quick',
    collerette_uid: '8ed01031-2744-452b-866b-57146cfb3ad0',
    aid: '728',
  },
];

export default function RequestButton() {
  const [spamming, setSpamming] = useState(false);
  const [nbRequests, setNbRequests] = useState(0);
  const [selectedBurger, setSelectedBurger] = useState(burgers[0]);
  const [targetBurgerNbLikes, setTargetBurgerNbLikes] = useState(0);

  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  function deleteCookies(): void {
    // eslint-disable-next-line no-console
    session.defaultSession.clearStorageData();
  }

  async function loopSpamming() {
    deleteCookies();
    const newNbRequest = nbRequests + 1;

    // eslint-disable-next-line no-console
    console.log(newNbRequest);

    setNbRequests(newNbRequest);
    if (spamming) {
      // eslint-disable-next-line no-await-in-loop
      await sleep(3000);
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      startRequest();
    }
  }

  async function startRequest() {
    const formData = new FormData();
    formData.append('type', 'like');
    formData.append('collerette_uid', selectedBurger.collerette_uid);
    formData.append('aid', selectedBurger.aid);

    axios({
      method: 'post',
      url: 'https://www.quick.be/fr/giantdesigners/likeShareCollerette',
      data: formData,
    })
      .then((res) => {
        // eslint-disable-next-line no-console
        console.log(`spamming state : ${spamming}`);
        // eslint-disable-next-line no-console
        console.log(res.data);

        setTargetBurgerNbLikes(res.data.like_count);
        loopSpamming();
        return res;
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error);
      });
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (spamming) {
      loopSpamming();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spamming]);

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}
    >
      <select
        onChange={(e) =>
          setSelectedBurger(burgers[parseInt(e.target.value, 10)])
        }
      >
        {burgers.map((burger, i) => (
          <option value={i} key={burger.collerette_uid}>
            {burger.name}
          </option>
        ))}
      </select>
      <button
        type="button"
        onClick={() => {
          setSpamming(!spamming);
        }}
      >
        {spamming ? 'Stop spamming!' : 'Spam likes!'}
      </button>
      <span>You spammed {nbRequests} times.</span>
      <span>Total likes on this burger: {targetBurgerNbLikes}.</span>
    </div>
  );
}
