import React, { useEffect, useState } from 'react';
import { AutoComplete, message } from 'antd';
import axios from 'axios';
import {ApiUrl} from "../config.jsx";

const VolumeSelectWidget = ({value, onChange }) => {
  const [volumes, setVolumes] = useState([]);
  const [filteredVolumes, setFilteredVolumes] = useState([]);

  useEffect(() => {
    // Загрузка объёмов с сервера
    const fetchVolumes = async () => {
      try {
        const response = await axios.get(ApiUrl + '/products/volume/unique');
        setVolumes(response.data);
        setFilteredVolumes(response.data);
      } catch (error) {
        message.error('Ошибка загрузки объёмов');
        console.error(error);
      }
    };

    fetchVolumes();
  }, []);

  const handleSearch = (searchValue) => {
    setFilteredVolumes(
      volumes.filter((volume) =>
        volume.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
  };

  return (
    <AutoComplete
      placeholder="Введите объём"
      options={filteredVolumes.map((volume) => ({ value: volume }))}
      value={value}
      onChange={onChange}
      onSearch={handleSearch}
      filterOption={false}
    />
  );
};

export default VolumeSelectWidget;
