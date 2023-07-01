import zustand from 'zustand';
import { API } from '@/utils/utils';
import axios from 'axios';
import { create } from 'zustand';

export const useRegistrar = create((set, get) => ({
   // Я особо не стал трогать твой store, здесь сам по ТЗ
   getTalonsLoadind: false,
   talons: [],
   // Get all talons
   getTalons: async () => {
      set({ getTalonsLoadind: true });
      try {
         const res = await axios.get(`${API}/talon/`);
         set({
            talons: res.data,
         });
      } catch (error) {
         console.log(error, ' <<<<<Ошибка при получений данных');
      } finally {
         set({ getTalonsLoadind: false });
      }
   },
   // Print talon with personal id
   printTalons: async () => {
      try {
         await axios.post(`${API}/talons/print`, { id });
         console.log(' <<< Успешно распечатан талон с id:', id);
      } catch (error) {
         console.log(error, '<<<< Ошибка при распечатки талона');
      }
   },

   // Delete talon

   removeTalon: async (id) => {
      try {
         await axios.delete(`${API}/talons/remove/`, { data: { id } }),
            console.log('<<<< Успещно  удален талон с id >>>>', id);
      } catch (error) {
         console.log(error, 'Ошибка при удалиении >>>');
      }
   },

   //   Edit and Update talon

   editTalon: async (talonData) => {
      try {
         await axios.patch(`${API}/talons/edit`, talonData);
         console.log('<<<<< Успешно отредактирован талон с id >>>', talonData.id);
      } catch (error) {
         console.log(error, '<<<<< Ошибка при редактировании талона>>');
      }
   },
}));
