import { useState, useEffect, useRef, memo, useCallback } from "react";
import WebApp from "@twa-dev/sdk";

import { EnergyAndCoinsApiService } from "../api/MainApiService";

import cs from "./Clicker.module.scss";

import { Props as EnergyProps, Energy } from "./Energy";
import { Props as CoinsProps, Coins } from "./Coins";
import { Props as FruitProps, Fruit } from "./Fruit";
import { Loading } from "./Loading";
import { Props as BlotsProps, Blots } from "./Blots";

import { BemProps } from "../utils/bem";
import { Fruit as FruitT, fruits } from "../utils/fruit";
import { Tap } from "../utils/tap";
import { blots } from "../utils/blot";
import { randomElem } from "../utils/random";

const GAIN_ENERGY_INTERVAL = 1000;
const GAIN_COINS_INTERVAL = 1000;
const ENERGY_MAX = 30;
const DELETE_FIRST_BLOT_INTERVAL = 2000;
const COINS_CLICK_GAIN = 1;
const COINS_AUTO_GAIN = 1;
const ENERGY_AUTO_GAIN = 1;
const ENERGY_CLICK_LOSS = 1;

const CoinsM = memo<CoinsProps>((props) => <Coins {...props} />);

const FruitM = memo<FruitProps>((props) => <Fruit {...props} />);

const BlotsM = memo<BlotsProps>((props) => <Blots {...props} />);

const EnergyM = memo<EnergyProps>((props) => <Energy {...props} />);

type Props = BemProps<{}>;

const Clicker: React.FC<Props> = ({ elem }) => {
  const [energy, setEnergy] = useState<number>(ENERGY_MAX);
  const [coins, setCoins] = useState<number>(0);
  const [taps, setTaps] = useState<Tap[]>([]);
  const [fruit, setFruit] = useState<FruitT | null>(null);
  const userId = WebApp.initDataUnsafe.user?.id;
  const gainCoinsWsRef = useRef<WebSocket | null>(null);
  const gainEnergyWsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    setFruit(randomElem(fruits));

    if (userId) {
      gainCoinsWsRef.current = new WebSocket(
        `ws://127.0.0.1:8002/ws/coins_gain/${userId}/`
      );
      gainEnergyWsRef.current = new WebSocket(
        `ws://127.0.0.1:8002/ws/energy_gain/${userId}/`
      );
    }

    const res = userId
      ? EnergyAndCoinsApiService.getEnergyAndCoinsById(userId)
      : Promise.reject();
    res
      .then(({ energy, coins }) => {
        setEnergy(energy);
        setCoins(coins);
      })
      .catch(() => {});
    const gainEnergyHandle = setInterval(() => {
      setEnergy((e) => (e < ENERGY_MAX ? e + ENERGY_AUTO_GAIN : ENERGY_MAX));
    }, GAIN_ENERGY_INTERVAL);
    const gainCoinsHandle = setInterval(() => {
      setCoins((c) => c + COINS_AUTO_GAIN);
    }, GAIN_COINS_INTERVAL);
    const deleteFirstBlotHandle = setInterval(() => {
      setTaps([...taps.slice(1)]);
    }, DELETE_FIRST_BLOT_INTERVAL);
    return () => {
      clearInterval(gainEnergyHandle);
      clearInterval(gainCoinsHandle);
      clearInterval(deleteFirstBlotHandle);
    };
  }, []);

  const onFruitPointerDown: React.PointerEventHandler<HTMLDivElement> = (e) => {
    if (energy && coins !== null) {
      const newTap: Tap = {
        key: e.timeStamp,
        coinsGain: COINS_CLICK_GAIN,
        pos: [e.clientY, e.clientX],
        blot: randomElem(blots),
      };
      setTaps([...taps, newTap]);
      const newEnergy = energy - ENERGY_CLICK_LOSS;
      const newCoins = coins + COINS_CLICK_GAIN;
      setEnergy(newEnergy);
      setCoins(newCoins);
      if (gainEnergyWsRef.current && gainCoinsWsRef.current) {
        gainCoinsWsRef.current.send(JSON.stringify({ coins: newCoins }));
        gainEnergyWsRef.current.send(JSON.stringify({ energy: newEnergy }));
      }
    }
  };

  const onFruitPointerDownM = useCallback(onFruitPointerDown, [taps]);

  const isLoading = !energy && !coins;

  return (
    <main className={`${cs["clicker"]} ${elem}`}>
      <CoinsM elem={cs["clicker__coins"]} coins={coins} />
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {fruit && (
            <FruitM
              elem={cs["clicker__fruit"]}
              onPointerDown={onFruitPointerDownM}
              fruit={fruit}
              replayPulsing={taps.length}
            />
          )}
          <BlotsM taps={taps} />
        </>
      )}
      <EnergyM
        elem={cs["clicker__energy"]}
        widthMax={7}
        energyMax={ENERGY_MAX}
        energy={energy}
      />
    </main>
  );
};

export { Clicker };
