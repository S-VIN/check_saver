import React, {useEffect, useState} from "react";
import dayjs from "dayjs";
import "antd/dist/reset.css";
import {Input } from "antd";
import { UserOutlined } from '@ant-design/icons';

const NativeDatePicker = ({onChange, style}) => {
  const [selectedDate, setSelectedDate] = useState(getCurrentDate());

  useEffect(() => {
    setSelectedDate(getCurrentDate())
    }, []);

  // Получаем текущую дату в формате YYYY-MM-DD
  // Получаем текущую дату в формате dd-mm-yyyy
  function getCurrentDate() {
    return dayjs().format("DD-MM-YYYY");
  }

  const handleDateChange = (event) => {
    const date = event.target.value; // Получаем значение из input
    const formattedDate = dayjs(date, "YYYY-MM-DD").format("DD-MM-YYYY");
    setSelectedDate(formattedDate);
    onChange && onChange(dayjs(date)); // Передаем оригинальную дату
  };

  return (
    <Input
      type="date"
      value={dayjs(selectedDate, "DD-MM-YYYY").format("YYYY-MM-DD") || ""}
      onChange={handleDateChange}
      data-date-format="DD MMMM YYYY"
      style={{ height: "32px", ...style }}
    />
  )
};

export default NativeDatePicker;