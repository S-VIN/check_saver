import React, {useEffect, useState} from 'react';
import {AutoComplete, message} from 'antd';
import axios from 'axios';
import {ApiUrl} from "../config.jsx";

const CategorySelectWidget = ({value, onChange}) => {
    const [categories, setCategories] = useState([]);
    const [filteredCategories, setFilteredCategories] = useState([]);

    useEffect(() => {
        // Загрузка категорий с сервера
        const fetchCategories = async () => {
            try {
                const response = await axios.get(ApiUrl + '/products/category/unique');
                setCategories(response.data);
                setFilteredCategories(response.data);
            } catch (error) {
                message.error('Ошибка загрузки категорий');
                console.error(error);
            }
        };

        fetchCategories();
    }, []);

    const handleSearch = (searchValue) => {
        setFilteredCategories(categories.filter((category) => category.toLowerCase().includes(searchValue.toLowerCase())));
    };

    return (<AutoComplete
        placeholder="Введите категорию"
        options={filteredCategories.map((category) => ({value: category}))}
        value={value}
        onChange={onChange}
        onSearch={handleSearch}
        filterOption={false} // Фильтрация выполняется вручную
    />);
};

export default CategorySelectWidget;
