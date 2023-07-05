import zustand from "zustand";
import { API } from "@/utils/utils";
import axios from "axios";
import { create } from "zustand";

export const useModel_1_7 = create((set, get) => ({
  queue: [],


  accessToken: '',
  loginOperator: async (email, password) => {
    try {
      const response = await axios.post(`${API}/employee/login`, {
        email: email,
        password: password
      });

      const accessToken = response.data.access;
      set({ accessToken });

      console.log('Успешная авторизация оператора:', accessToken);
    } catch (error) {
      console.error('Ошибка авторизации оператора:', error.response.data.detail);
    }
  },



  fetchQueue: async (token) => {
    try {
      const encodedToken = encodeURIComponent(token);
      const response = await axios.get(`${API}/employee/queue`, {
        headers: {
          Authorization: `Bearer ${encodedToken}`,
        },
      });
      const data = response.data;
      set({ queue: data });
    } catch (error) {
      console.error("Ошибка при получении очереди оператора", error);
    }
  },
  // Get all talons

  getTalons: async () => {
    try {
      const res = await axios.get(`${API}/talon/`);
      const talonsData = res.data.talons;
      set({
        talons: talonsData,
      });
    } catch (error) {
      console.log(error, " <<<<<Ошибка при получений данных");
    }
  },
  // Print talon with personal id
  // printTalons: async () => {
  //   try {
  //     await axios.post(`${API}/talons/print`, { id });
  //     console.log(" <<< Успешно распечатан талон с id:", id);
  //   } catch (error) {
  //     console.log(error, "<<<< Ошибка при распечатки талона");
  //   }
  // },

  // // Delete talon

  // removeTalon: async (id) => {
  //   try {
  //     await axios.delete(`${API}/talons/remove/`, { data: { id } }),
  //       console.log("<<<< Успещно  удален талон с id >>>>", id);
  //   } catch (error) {
  //     console.log(error, "Ошибка при удалиении >>>");
  //   }
  // },

  // //   Edit and Update talon

  // editTalon: async (talonData) => {
  //   try {
  //     await axios.patch(`${API}/talons/edit`, talonData);
  //     console.log("<<<<< Успешно отредактирован талон с id >>>", talonData.id);
  //   } catch (error) {
  //     console.log(error, "<<<<< Ошибка при редактировании талона>>");
  //   }
  // },
}));
