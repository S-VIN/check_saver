import React, {forwardRef, useEffect, useImperativeHandle, useState} from 'react';
import {Select} from 'antd';
import axios from 'axios';
import {ApiUrl} from "../config.jsx";

const TagSelectWidget = forwardRef(({onTagChange, style}, ref) => {
    const [options, setOptions] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchTags = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(ApiUrl + '/purchases/tag/unique');
            setOptions(response.data);
        } catch (error) {
            console.error('Ошибка при загрузке тегов', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchTags()
    }, []);

    useImperativeHandle(ref, () => ({
        resetTags: () => {
            setSelectedTags([])
        },
    }));

    const handleTagSelect = (value) => {

        console.log('handle tag select', value)
        setSelectedTags(value)
        onTagChange(value)
    };

    return (<Select
            mode="tags"
            placeholder="tags"
            style={{width: '100%', ...style}}
            onChange={handleTagSelect}
            tokenSeparators={[',']}
            loading={isLoading}
            value={selectedTags}
            options={options.map((item) => ({
                value: item, label: item,
            }))}
        />);
});
export default TagSelectWidget;