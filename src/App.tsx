import { useState, useEffect } from 'react'
import './App.css'
import MainApiService from './api/MainApiService'
import { } from '@telegram-apps/sdk-react'
import WebApp from '@twa-dev/sdk'


function App() {
  const [energy, setEnergy] = useState<number | null>(null)
  const [coins, setCoins] = useState<number | null>(null)
  //console.log(window!.Telegram.WebApp)

  useEffect(() => {
    

    const res = MainApiService.getEnergyAndCoinsById(2)
    res.then((data) => {
      console.log(data)
      setEnergy(data.energy)
      setCoins(data.coins)
    })
  }, [])

  return (
    <main>
      <button onClick={() => {WebApp.showAlert('Hi!')}}></button>
      <span>{energy}</span>
      <br/>
      <span>{coins}</span>
    </main>
  )
}

export default App
