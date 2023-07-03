import React, { useState } from 'react';
import styles from '@/assets/styles/operator/Sidebar.module.scss';

import { Image, Input, Menu, Popover } from 'antd';
import { useTranslation } from 'react-i18next';
import Sider from 'antd/es/layout/Sider';
import {
   UserOutlined,
   SettingOutlined,
   HomeOutlined,
   CaretDownOutlined,
   DownOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router';
import { useOperator } from '@/services/operatorStore';

const Sidebar = () => {
   const navigate = useNavigate();

   const employee = useOperator((state) => state.employee);

   const [collapsed, setCollapsed] = useState(true);

   const { t } = useTranslation();

   const branchIndeficator = (branch) => {
      switch (branch) {
         case 1:
            return 'Бишкек, Киевская 77';
         case 2:
            return 'Каракол, Кулакунова 89';
         case 3:
            return 'Ош, Курманжан датка 124';
         default:
            return { branch };
      }
   };

   const ITEMS = [
      {
         title: 'Пользователь',
         label: t('sidebar.employee'),
         key: 1,
         icon: <UserOutlined style={{ fontSize: '20px', color: 'white' }} />,
         children: [
            {
               key: 2,
               label: (
                  <div className={styles.childrenBlock}>
                     <label>
                        {t('sidebar.name')}
                        <div>{employee?.username}</div>
                     </label>
                  </div>
               ),
               type: 'group',
            },
            {
               key: 3,
               label: (
                  <div className={styles.childrenBlock}>
                     <label>
                        {t('sidebar.position')}
                        <div>{employee?.position === 'registrar' ? 'Регистратор' : 'Оператор'}</div>
                     </label>
                  </div>
               ),
               type: 'group',
            },
            {
               key: 4,
               label: (
                  <div className={styles.childrenBlock}>
                     <label>
                        {t('sidebar.status')}
                        <div>{employee?.status === 'active' ? 'Активный' : 'Не активный'}</div>
                     </label>
                  </div>
               ),
               type: 'group',
            },

            {
               key: 5,
               label: (
                  <div className={styles.childrenBlock}>
                     <label>
                        {t('sidebar.service')}
                        <div>
                           {employee?.service?.map((item) => (
                              <p key={item?.id}>{item?.name}</p>
                           ))}
                        </div>
                     </label>
                  </div>
               ),
               type: 'group',
            },
            {
               key: 6,
               label: (
                  <div className={styles.childrenBlock}>
                     <label>
                        {t('sidebar.window')}
                        <div>№{employee?.window}</div>
                     </label>
                  </div>
               ),
               type: 'group',
            },
            {
               key: 7,
               label: (
                  <div className={styles.childrenBlock}>
                     <label>
                        {t('sidebar.shiftTime')}
                        <div>{employee?.shift}</div>
                     </label>
                  </div>
               ),
               type: 'group',
            },
            {
               key: 8,
               label: (
                  <div className={styles.childrenBlock}>
                     <label>
                        {t('sidebar.branch')}
                        <div>{branchIndeficator(employee?.branch)}</div>
                     </label>
                  </div>
               ),
               type: 'group',
            },
         ],
      },
      {
         key: 9,
         icon: <SettingOutlined style={{ fontSize: '20px', color: 'white' }} />,
         label: t('sidebar.settings'),
         // children: [],
      },
   ];

   return (
      <Sider
         width={350}
         onMouseLeave={() => setCollapsed(true)}
         onMouseEnter={() => setCollapsed(false)}
         collapsible
         collapsed={collapsed}
         onCollapse={setCollapsed}
         trigger={null}
         style={{
            height: '100vh',
            minHeight: '100%',
            overflow: 'auto',
            backgroundColor: '#1e4a89',
            zIndex: 999,
         }}
      >
         <Menu
            triggerSubMenuAction=''
            className='custom-menu'
            mode='inline'
            items={ITEMS}
            subMenuOpenDelay={0.5}
            expandIcon={({ isOpen }) => (
               <DownOutlined style={{ color: 'white' }} rotate={isOpen ? 0 : 180} />
            )}
         />
      </Sider>
   );
};

export default Sidebar;