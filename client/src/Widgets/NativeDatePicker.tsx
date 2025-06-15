import React, { useEffect, useState, ChangeEvent } from "react";
import dayjs from "dayjs";
import "antd/dist/reset.css";
import { Input } from "antd";

interface NativeDatePickerProps {
  onChange?: (date: dayjs.Dayjs) => void;
  style?: React.CSSProperties;
}

const NativeDatePicker: React.FC<NativeDatePickerProps> = ({ onChange, style }) => {
  const [selectedDate, setSelectedDate] = useState<string>(getCurrentDate());

  useEffect(() => {
    setSelectedDate(getCurrentDate());
  }, []);

  // Получаем текущую дату в формате DD-MM-YYYY
  function getCurrentDate(): string {
    return dayjs().format("DD-MM-YYYY");
  }

  const handleDateChange = (event: ChangeEvent<HTMLInputElement>): void => {
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
  );
};

export default NativeDatePicker;