import React, { useEffect, useState } from 'react';
import axios from 'axios';

const { session } = require('electron').remote;

const NB_REQUESTS_INDEX = 'nb_requests';

export default function RequestButton() {
  const [spamming, setSpamming] = useState(false);
  const [nbRequests, setNbRequests] = useState(
    parseInt(localStorage.getItem(NB_REQUESTS_INDEX) || '0', 10) || 0
  );

  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  function deleteCookies(): void {
    // eslint-disable-next-line no-console
    session.defaultSession.clearStorageData();
  }

  function startRequest() {
    const formData = new FormData();
    formData.append('type', 'like');
    formData.append('collerette_uid', '847068fc-847b-4020-b7f4-8edf9e889cc9');
    formData.append('aid', '784');

    axios({
      method: 'post',
      url: 'https://www.quick.be/fr/giantdesigners/likeShareCollerette',
      data: formData,
    })
      .then(async (res) => {
        deleteCookies();

        const newNbRequest = nbRequests + 1;
        // eslint-disable-next-line no-console
        console.log(newNbRequest);
        setNbRequests(newNbRequest);
        localStorage.setItem(NB_REQUESTS_INDEX, newNbRequest.toString());

        // eslint-disable-next-line no-console
        console.log(spamming);

        if (spamming) {
          await sleep(3000);
          startRequest();
        }
        // eslint-disable-next-line no-console
        console.log(res.data);
        return res;
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error);
      });
  }

  useEffect(() => {
    if (spamming) {
      startRequest();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spamming]);

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}
    >
      <button
        type="button"
        onClick={() => {
          setSpamming(!spamming);
        }}
      >
        {spamming ? 'Stop spamming!' : 'Spam likes!'}
      </button>
      <span>You spammed {nbRequests} times.</span>
    </div>
  );
}
