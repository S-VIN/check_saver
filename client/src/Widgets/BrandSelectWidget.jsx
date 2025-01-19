import React, { useEffect, useState } from 'react';
import { AutoComplete, message } from 'antd';
import axios from 'axios';
import {ApiUrl} from "../config.jsx";

const BrandSelectWidget = ({ value, onChange }) => {
  const [brands, setBrands] = useState([]);
  const [filteredBrands, setFilteredBrands] = useState([]);

  useEffect(() => {
    // Загрузка брендов с сервера
    const fetchBrands = async () => {
      try {
        const response = await axios.get(ApiUrl + '/products/brand/unique');
        setBrands(response.data);
        setFilteredBrands(response.data);
      } catch (error) {
        message.error('Ошибка загрузки брендов');
        console.error(error);
      }
    };

    fetchBrands();
  }, []);

  const handleSearch = (searchValue) => {
    setFilteredBrands(
      brands.filter((brand) =>
        brand.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
  };

  return (
    <AutoComplete
      placeholder="Введите бренд"
      options={filteredBrands.map((brand) => ({ value: brand }))}
      value={value}
      onChange={onChange}
      onSearch={handleSearch}
      filterOption={false}
    />
  );
};

export default BrandSelectWidget;
