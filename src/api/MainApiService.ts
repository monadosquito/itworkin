
import { api } from "./api"

type EnergyAndCoins = {
    energy: number
    coins: number
}

const MainApiService = {
    async getEnergyAndCoinsById(id: number) {
        const res = await api.get<EnergyAndCoins>(
            `http://127.0.0.1:8002/test/user_entry_check/${id}`
        )
        return res.data
    }
}

export default MainApiService