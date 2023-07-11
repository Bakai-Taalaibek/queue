import zustand from "zustand";
import { API } from "@/utils/utils";
import axios from "axios";
import { create } from "zustand";

export const useRegistrar = create((set, get) => ({
  errors: [],
  token: JSON.parse(localStorage.getItem("token")) || {},
  talons: [],
  employee: {},
  currentTalon: {},
  clients_per_day: {},

  loginLoading: false,
  getTalonsLoading: false,


  getTalons: async (token) => {
     set({ getTalonsLoading: true });
     try {
        const res = await axios.get(`${API}/employee/registrator/`, {
           headers: {
            Authorization: `Bearer ${get().token.access}`,
           },
        });
        set({ talons: res.data.talons });
        set({ clients_per_day: res.data.clients_per_day });
        set({ currentTalon: res.data.talons[0] });
     } catch (err) {
        set({ errors: err });
     } finally {
        set({ getTalonsLoading: false });
     }
  },

  printTalons: async (id) => {
    try {
      await axios.post(
        `${API}/talons/print`,
        { id },
        {
          headers: {
            Authorization: `Bearer ${get().token.access}`,
          },
        }
      );
      console.log(" <<< Успешно распечатан талон с id:", id);
    } catch (error) {
      console.log(error, "<<<< Ошибка при распечатке талона");
    }
  },

  deleteTalon: async (id) => {
   set({ getTalonsLoading: true });
   try {
      const res = await axios.get(`${API}/talon/remove/${id}/`, {
         headers: {
            Authorization: `Bearer ${get().token.access}`,
         },
      });
   } catch (err) {
      set({ errors: err });
   } finally {
      set({ getTalonsLoading: false });
   }
},

  restoreTalon: async (token) => {
   try {
     const talonIndex = get().talons.findIndex((talon) => talon.token === token);
     if (talonIndex !== -1) {
       const talon = get().talons[talonIndex];
       talon.status = "waiting";
       set((state) => ({
         talons: [...state.talons.slice(0, talonIndex), talon, ...state.talons.slice(talonIndex + 1)],
       }));
     }
   } catch (error) {
     console.error("Ошибка при восстановлении талона:", error);
   }
 },

  createTalon: async (clientType, serviceId, branchId, appointmentDate) => {
    try {
      const response = await axios.post(`${API}/talon/`, {
        client_type: clientType,
        service: serviceId,
        branch: branchId,
        appointment_date: appointmentDate,
      });
      const { token } = response.data;
      // Возвращаем только токен
      return token;
    } catch (error) {
      console.error("Ошибка при создании талона:", error);
      // Возвращаем null или информацию об ошибке
      return null;
    }
  },

  // Другие функции...
}));
