/* eslint-disable no-await-in-loop */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Burger from '../interfaces/Burger';

const { session } = require('electron').remote;

interface IProps {
  burgers: Burger[];
  updateBurgerCallback: (fetchedBurger: Burger) => void;
}
export default function RequestButton({
  burgers,
  updateBurgerCallback,
}: IProps) {
  /** **************** Set the state ******************************** */
  const [spamming, setSpamming] = useState(false);
  const [nbRequests, setNbRequests] = useState(0);
  const [burgerUpdateCache, setBurgerUpdateCache] = useState(burgers[0]);

  /** **************** Setup the cookies n shit ******************************** */

  async function setacceptCookiesCookie() {
    const cookie = {
      url: 'www.quick.be',
      name: 'GDPR-cookie-accepted',
      value: '10-20-30-40',
    };

    await session.defaultSession.cookies.set(cookie);
  }

  function getCurrentBurger(): Burger {
    return burgers[nbRequests % burgers.length];
  }

  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  function deleteCookies(): void {
    // eslint-disable-next-line no-console
    session.defaultSession.clearStorageData();
  }

  async function loopSpamming() {
    if (nbRequests % burgers.length === 0) {
      deleteCookies();
    }

    if (spamming) {
      await sleep(1000);
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      await startRequest();

      updateBurgerCallback(burgerUpdateCache);
    }
  }

  async function startRequest() {
    const formData = new FormData();
    formData.append('type', 'like');
    formData.append('collerette_uid', getCurrentBurger().collerette_uid);
    formData.append('aid', getCurrentBurger().aid);

    await axios({
      method: 'post',
      url: 'https://www.quick.be/fr/giantdesigners/likeShareCollerette',
      data: formData,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    })
      .then((res) => {
        // eslint-disable-next-line no-console
        console.log(res.data);
        setBurgerUpdateCache({
          name: getCurrentBurger().name,
          aid: getCurrentBurger().aid,
          collerette_uid: getCurrentBurger().collerette_uid,
          nbLikes: res.data.like_count,
        });

        // eslint-disable-next-line @typescript-eslint/no-shadow
        setNbRequests((nbRequests) => nbRequests + 1);

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
  }, [spamming, nbRequests]);

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}
    >
      {spamming ? (
        <button
          type="button"
          onClick={() => {
            // eslint-disable-next-line @typescript-eslint/no-shadow
            setSpamming(false);
          }}
        >
          Stop Spamming!
        </button>
      ) : (
        <button
          type="button"
          onClick={() => {
            // eslint-disable-next-line @typescript-eslint/no-shadow
            setSpamming(true);
          }}
        >
          Start spamming !
        </button>
      )}
      <span>You spammed {nbRequests} times.</span>
    </div>
  );
}
