import React, {useState} from "react";
import "antd/dist/reset.css";
import {Input} from "antd";
import {ShoppingCartOutlined} from "@ant-design/icons";

const CountWidget = ({value, onChange, style, defaultValue = 1,}) => {
    const [internalValue, setInternalValue] = useState(defaultValue);


    const handleChange = (e) => {
        const value = parseInt(e.target.value, 10);
        if (isNaN(value)) {
            onChange && onChange(null); // Если значение пустое
            setInternalValue(null)
        } else if (value >= 1 && value <= 100) {
            onChange && onChange(value); // Если значение в пределах диапазона
            setInternalValue(value)
        }
    };

    return (
        <Input
            type="text"
            inputMode='numeric'
            value={value}
            onChange={handleChange}
            min={1}
            max={100}
            style={{...style}}
            placeholder="count"
            suffix={<ShoppingCartOutlined style={{marginRight: '8px', color: 'rgba(0, 0, 0, 0.45)'}}/>}
        />
    );
};

export default CountWidget;