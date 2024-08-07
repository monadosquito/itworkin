import { useState, useEffect, useRef, memo } from "react";
import "./App.css";
import MainApiService from "./api/MainApiService";
import WebApp from "@twa-dev/sdk";
// import { SDKProvider } from "@telegram-apps/sdk-react";
import useWebSocket from "react-use-websocket";
import { Props as EnergyProps, Energy } from "./components/Energy";

const GAIN_ENERGY_INTERVAL = 1000;
const FARM_COINS_INTERVAL = 1000;
const ENERGY_MAX = 10;

const EnergyM = memo<EnergyProps>((props) => <Energy {...props} />);

function Hz() {
  const energyMaxRef = useRef<number>(ENERGY_MAX);
  const [energy, setEnergy] = useState<number>(ENERGY_MAX);
  const [coins, setCoins] = useState<number>(0);
  const [tapPoses, setTapPoses] = useState<[number, number][]>([]);
  const userId = WebApp.initDataUnsafe.user?.id;
  // console.log(WebApp);
  const onError = () => {
    console.log("err");
    setEnergy(energyMaxRef.current);
    setCoins(0);
  };
  const { sendMessage } = useWebSocket(
    `ws://127.0.0.1:8002/ws/coins_gain/${userId}/`,
    {
      onError,
    }
  );

  useEffect(() => {
    const res = userId
      ? MainApiService.getEnergyAndCoinsById(userId)
      : Promise.reject();
    res
      .then(({ energy, coins }) => {
        energyMaxRef.current = energy;
        setEnergy(energy);
        setCoins(coins);
      })
      .catch(() => {});
    const gainEnergyHandle = setInterval(() => {
      setEnergy((e) =>
        e < energyMaxRef.current ? e + 1 : energyMaxRef.current
      );
    }, GAIN_ENERGY_INTERVAL);
    const gainCoinsHandle = setInterval(() => {
      setCoins((e) => e + 1);
    }, FARM_COINS_INTERVAL);
    return () => {
      clearInterval(gainEnergyHandle);
      clearInterval(gainCoinsHandle);
    };
  }, []);

  const click: React.MouseEventHandler<HTMLDivElement> = (e) => {
    console.log(e);
    setTapPoses([...tapPoses, [e.clientX, e.clientY]]);
    if (energy && coins !== null) {
      const newEnergy = energy - 1;
      const newCoins = coins + 1;
      setEnergy(newEnergy);
      setCoins(newCoins);
      // workaround
      if (userId) {
        MainApiService.saveEnergyAndCoinsById(userId, { energy, coins });
      }
      sendMessage(JSON.stringify({ coins: newCoins }));
    }
  };

  const isLoadeding = !energy && !coins;

  return (
    <main>
      <div>
        {tapPoses.map(([x, y]) => {
          return (
            <span
              style={{
                position: "absolute",
                left: x,
                top: y,
              }}
            >
              Hi
            </span>
          );
        })}
      </div>
      <span>{coins}</span>
      {isLoadeding ? (
        <span>Loading...</span>
      ) : (
        <div onPointerDown={click} className="fruit"></div>
      )}
      <EnergyM energyMax={energyMaxRef.current} energy={energy} />
    </main>
  );
}

const App = () => {
  return <Hz />;
};

export default App;
