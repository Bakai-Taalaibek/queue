import { create } from 'zustand';
import { API, ShowMessage } from '@/utils/utils';
import axios from 'axios';

export const useOperator = create((set, get) => ({
   email: {},
   errors: [],
   token: JSON.parse(localStorage.getItem('token')) || {},
   talons: [],
   employee: {},
   currentTalon: {},
   clients_per_day: {},

   isDarkMode: false,

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

   getTalons: async () => {
      set({ getTalonsLoading: true });
      try {
         const res = await axios.get(`${API}/employee/queue/`, {
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

   transferTalonToEnd: async (id) => {
      set({ getTalonsLoading: true });
      try {
         const res = await axios.get(`${API}/talon/end/${id}/`, {
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

   transferTalonToStart: async (id) => {
      set({ getTalonsLoading: true });
      try {
         const res = await axios.get(`${API}/talon/start/${id}/`, {
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

   serviceStart: async (id) => {
      set({ getTalonsLoading: true });
      try {
         const res = await axios.get(`${API}/talon/service-start/${id}/`, {
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

   serviceEnd: async (id) => {
      set({ getTalonsLoading: true });
      try {
         const res = await axios.get(`${API}/talon/service-end/${id}/`, {
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
   toggleDarkMode: (checked) => {
      set({ isDarkMode: checked });
   },
}));
