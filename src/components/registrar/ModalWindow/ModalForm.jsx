import React from "react";
import styles from "@/assets/styles/registrar/ModalForm.module.scss";
import { useState } from "react";

import { Select, DatePicker, TimePicker } from "antd";
import { useRegistrar } from "@/services/registrarStore";
import { useTranslation } from "react-i18next";

// const handleChange = (value) => {
//   console.log(`selected ${value}`);
// };

// Дата и время
const onChange = (date, dateString) => {
  console.log(date, dateString);
};

export const ModalForm = ({ active, setActive }) => {
  const { printTalons } = useRegistrar();
  const [type, setType] = useState("time");
  const { Option } = Select;
  const PickerWithType = ({ type, onChange }) => {
    if (type === "time") return <TimePicker onChange={onChange} />;
    if (type === "date") return <DatePicker onChange={onChange} />;
    return <DatePicker picker={type} onChange={onChange} />;
  };

  const [selectedValues, setSelectedValues] = useState({
    service: "Услуги",
    clientType: "Тип клиента",
    selectedWindow: "Окно",
    date: null,
    time: null,
  });

  const handlePrintClick = () => {
    const { service, clientType, selectedWindow, date, time } = selectedValues;

    // Создаем новое окно
    const printWindow = window.open("", "_blank");

    // Формируем HTML-разметку с выбранными данными
    const printContent = `
     <html>
       <head>
         <title>Чек</title>
         <style>
           /* Стили для чека */
           /* ... */
         </style>
       </head>
       <body>
         <h1>Ваши выбранные данные:</h1>
         <p>Услуга: ${service}</p>
         <p>Тип клиента: ${clientType}</p>
         <p>Окно: ${selectedWindow}</p>
         <p>Дата: ${date}</p>
         <p>Время: ${time}</p>
 
         <script>
           // Печатаем документ после его полной загрузки
           window.onload = function() {
             window.print();
             window.onafterprint = function() {
               window.close(); // Закрываем окно после печати
             };
           };
         </script>
       </body>
     </html>
   `;

    // Устанавливаем содержимое окна
    printWindow.document.open();
    printWindow.document.write(printContent);
    printWindow.document.close();
  };

  const { t } = useTranslation();

  // Верстка модального окна
  return (
    <div
      className={`${styles.modal} ${active ? styles.active : ""}`}
      onClick={() => setActive(false)}>
      <div
        className={styles.modal__content}
        onClick={(e) => e.stopPropagation()}>
        <label className={styles.modal__label}>{t("Button.newtalon")}</label>

        <Select
          className={`${styles.modal__selects} ${styles.customSelect}`}
          defaultValue="Услуги"
          onChange={(value) =>
            setSelectedValues({ ...selectedValues, service: value })
          }
          options={[
            {
              value: "Кредитование",
              label: "Кредитование",
            },
            {
              value: "Обмен валют",
              label: "Обмен валют",
            },
            {
              value: "Денежные переводы",
              label: "Денежные переводы",
            },
            {
              value: "Выпуск карты",
              label: "Выпуск карты",
            },
            {
              value: "Получить перевод",
              label: "Получить перевод",
            },
            {
              value: "Открыть счет",
              label: "Открыть счет",
            },
            {
              value: "Операции с ценными бумагами",
              label: "Операции с ценными бумагами",
            },
            {
              value: "Исламское финансирование",
              label: "Исламское финансирование",
            },
          ]}
          size="large"
        />
        <Select
          className={`${styles.modal__selects} ${styles.customSelect}`}
          defaultValue="Тип клиента"
          onChange={(value) =>
            setSelectedValues({ ...selectedValues, clientType: value })
          }
          options={[
            {
              value: "Юридическое лицо",
              label: "Юридическое лицо",
            },
            {
              value: "Физическое лицо",
              label: "Физическое лицо",
            },
          ]}
          size="large"
        />
        <Select
          className={`${styles.modal__selects} ${styles.customSelect}`}
          defaultValue="Окно"
          onChange={(value) =>
            setSelectedValues({ ...selectedValues, selectedWindow: value })
          }
          options={[
            {
              value: "Окно 1",
              label: "Окно 1",
            },
            {
              value: "Окно 2",
              label: "Окно 2",
            },
            {
              value: "Окно 3",
              label: "Окно 3",
            },
            {
              value: "Окно 4",
              label: "Окно 4",
            },
            {
              value: "Окно 5",
              label: "Окно 5",
            },
          ]}
          size="large"
        />

        <DatePicker
          placeholder="Выберите дату"
          className={styles.modal__pickers}
          onChange={(date, dateString) =>
            setSelectedValues({ ...selectedValues, date: dateString })
          }
          size="large"
        />

        <TimePicker
          placeholder="Выберите время"
          className={styles.modal__timePicker}
          type={type}
          onChange={(time) => setSelectedValues({ ...selectedValues, time })}
          size="large"
        />

        <button onClick={handlePrintClick} className={styles.modal__button}>
          {t("Button.print")}
        </button>
      </div>
    </div>
  );
};
