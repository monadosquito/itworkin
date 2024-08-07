import { api } from "./api";

type EnergyAndCoins = {
  energy: number;
  coins: number;
};

const EnergyAndCoinsApiService = {
  async getEnergyAndCoinsById(id: number) {
    const res = await api.get<EnergyAndCoins>(`/test/user_entry_check/${id}`);
    return res.data;
  },
  async saveEnergyAndCoinsById(id: number, { energy, coins }: EnergyAndCoins) {
    const res = await api.post<EnergyAndCoins>(
      `/test/user_exit/${id}/?energy=${energy}&coins=${coins}`
    );
    return res.data;
  },
};

export type { EnergyAndCoins };
export { EnergyAndCoinsApiService };
