/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Burger, { isBurger } from '../interfaces/Burger';

const defaultBurgers = `[
  {
    "name": "Delfino Burger",
    "collerette_uid": "51185105-1f67-44bd-9b64-ef7a9242243b",
    "aid": "805"
  },
  {
    "name": "Wide Putin",
    "collerette_uid": "9a7ab3ec-a7fc-4f56-b9c3-a2b1894bfc64",
    "aid": "439"
  },
  {
    "name": "Le JVCD Giant ",
    "collerette_uid": "55091e81-26ee-4f38-831a-6cc2a03b12a3",
    "aid": "776"
  },
  {
    "name": "Stonks",
    "collerette_uid": "f9049212-41e5-4678-83c1-fe1fd8cec956",
    "aid": "313"
  },
  {
    "name": "Make Quick Giant Again",
    "collerette_uid": "1c950ad0-bc3e-4676-a2e8-03b631da15c7",
    "aid": "229"
  },
  {
    "name": "le dernier quick",
    "collerette_uid": "8ed01031-2744-452b-866b-57146cfb3ad0",
    "aid": "728"
  },
  {
    "name": "oliburger",
    "collerette_uid": "02c8a036-4666-40f3-9a35-2a4c5554f620",
    "aid": "807"
  },
  {
    "name": "lolz",
    "collerette_uid": "f06c5e38-11ba-4386-8adc-a53e258904fc",
    "aid": "312"
  },
  {
    "name": "Help!",
    "collerette_uid": "9e73ddff-7695-4c14-a923-40ca3b3b9780",
    "aid": "304"
  },
  {
    "name": "De Leekere Giant",
    "collerette_uid": "9e73ddff-7695-4c14-a923-40ca3b3b9780",
    "aid": "304"
  },
  {
    "name": "Miam Burger",
    "collerette_uid": "b32829d6-2e46-4191-8c84-469fa3c61b15",
    "aid": "762"
  },
  {
    "name": "Le voleur du géant",
    "collerette_uid": "32be823e-8fb7-4bd9-aa43-598ca635c2ba",
    "aid": "152"
  },
  {
    "name": "Wawww",
    "collerette_uid": "ff30eb41-9dc9-4ea0-b9e9-20ff20c7e89e",
    "aid": "174"
  },
  {
    "name": "Giant Bernie",
    "collerette_uid": "870cfd6a-7516-4ee9-9f45-e634d061afb8",
    "aid": "517"
  },
  {
    "name": "Bob Ross",
    "collerette_uid": "f9f22364-75de-4d3a-b62f-26596a227463",
    "aid": "766"
  },
  {
    "name": "The Giant Wrestler",
    "collerette_uid": "36219dde-ead5-4b21-87ec-c60a433c0cbf",
    "aid": "134"
  },
  {
    "name": "WomenCat burger",
    "collerette_uid": "7daa08a7-b643-4fba-8b31-31844d70a788",
    "aid": "688"
  },
  {
    "name": "Giant park",
    "collerette_uid": "74f4d88c-001f-4515-893b-84beab3386be",
    "aid": "542"
  },
  {
    "name": "Fish and sick",
    "collerette_uid": "d36bbbfb-434e-48ef-8533-2e379a67dc8b",
    "aid": "767"
  },
  {
    "name": "Pied Giant de furry",
    "collerette_uid": "f8ea860e-90af-4d4d-b393-4e83b31d4c00",
    "aid": "779"
  },
  {
    "name": "le pepe burger",
    "collerette_uid": "8a3c9ac6-2c2b-41d2-a063-017bed76ecec",
    "aid": "1392"
  },
  {
    "name": "Le burger de l'élite",
    "collerette_uid": "54b2b643-2df9-435a-99f1-609859c4348e",
    "aid": "1207"
  },
  {
    "name": "Le Giant élite",
    "collerette_uid": "ad62d56d-2a10-4a7c-83d8-fe6e422fd189",
    "aid": "1349"
  }
]`;

interface IProps {
  onLoadConfCallBack: (fetchedBurgers: Burger[]) => void;
}

export default function ConfManager({ onLoadConfCallBack }: IProps) {
  const [newConf, setNewConf] = useState(defaultBurgers);
  const [isConfValid, setConfValidity] = useState(true);

  function isBurgerArray(burgers: unknown[]): boolean {
    let valid = true;
    burgers.forEach((burger) => {
      if (isBurger(burger)) {
        valid = false;
      }
    });

    return valid;
  }

  function loadBurgers(): void {
    const burgersObjs = JSON.parse(newConf);

    if (!isBurgerArray(burgersObjs)) {
      setConfValidity(false);

      // eslint-disable-next-line no-console
      console.error('invalid conf.');
    } else {
      setConfValidity(true);

      onLoadConfCallBack(burgersObjs);
    }
  }

  useEffect(() => {
    loadBurgers();
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        justifyContent: 'center',
      }}
    >
      <span style={{ textAlign: 'center' }}>
        Import a new configuration file.
      </span>
      <span style={{ textAlign: 'center' }}>
        <textarea
          value={newConf}
          style={{ width: '600px' }}
          id="burgers_conf_input"
          onChange={(e) => setNewConf(e.target.value)}
        />
      </span>
      <span>
        {isConfValid
          ? 'Current configuration is valid.'
          : 'Could not parse conf, please check that it is valid'}
      </span>
      <button type="button" onClick={loadBurgers}>
        Load configuration
      </button>
    </div>
  );
}
