import zustand from 'zustand';
import { API } from '@/utils/utils';
import axios from 'axios';
import { create } from 'zustand';

export const useRegistrar = create((set, get) => ({
   // Я особо не стал трогать твой store, здесь сам по ТЗ

   email: JSON.parse(localStorage.getItem('email')) || '',
   errors: [],
   token: JSON.parse(localStorage.getItem('token')) || {},
   talons: [],
   employee: {},
   currentTalon: {},

   loginLoading: false,
   getTalonsLoading: false,
   getProfileInfoLoading: false,
   transferTalonToEndLoading: false,

   login: async (body, navigate) => {
      set({ loginLoading: true });
      try {
         const res = await axios.post(`${API}/employee/login/`, body);
         localStorage.setItem('token', JSON.stringify(res.data));
         localStorage.setItem('email', JSON.stringify(body.email));
         set({ token: res.data });
         switch (res.data?.position) {
            case 'operator':
               navigate('/operator/home');
               break;
            case 'registrar':
               navigate('/registrar/home');
               break;

            default:
               break;
         }
         set({ loginLoading: false });
      } catch (err) {
         set({ errors: err });
         ShowMessage('error', 'Ошибка при входе на аккаунт');
      } finally {
      }
   },


   getTalonsLoadind: false,
   talons: [],
   // Get all talons
   // getTalons: async () => {
   //    set({ getTalonsLoading: true });
   //    try {
   //       const res = await axios.get(`${API}/talon/`, {
   //          headers: {
   //             Authorization: `Bearer ${get().token.access}`,
   //          },
   //       });
   //       set({ talons: res.data });
   //       set({ currentTalon: res.data[0] });
   //    } catch (err) {
   //       set({ errors: err });
   //    } finally {
   //       set({ getTalonsLoading: false });
   //    }
   // },
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
   getProfileInfo: async (email) => {
      set({ getProfileInfoLoading: true });
      try {
         const res = await axios.get(`${API}/employee/retrieve/${email}/`, {
            headers: {
               Authorization: `Bearer ${get().token.access}`,
            },
         });
         set({ employee: res.data });
      } catch (err) {
         set({ errors: err });
      } finally {
         set({ getProfileInfoLoading: false });
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
   deleteTalon: async (id) => {
      set({ getTalonsLoading: true });
      try {
        const res = await axios.delete(`${API}/talon/remove/${id}/`, {
          headers: {
            Authorization: `Bearer ${get().token.access}`,
          },
        });
        set({ get });
      } catch (err) {
        set({ errors: err });
      } finally {
        set({ getTalonsLoading: false });
      }
    },

   //   Edit and Update talon

   // editTalon: async (talonData) => {
   //    try {
   //       await axios.patch(`${API}/talons/edit`, talonData);
   //       console.log('<<<<< Успешно отредактирован талон с id >>>', talonData.id);
   //    } catch (error) {
   //       console.log(error, '<<<<< Ошибка при редактировании талона>>');
   //    }
   // },
}));
