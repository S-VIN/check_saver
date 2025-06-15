import React, { useEffect, useState} from 'react';
import { Input, Typography } from 'antd';
import { ShoppingCartOutlined } from "@ant-design/icons";

const { Text } = Typography;

interface PriceQuantitySelectWidgetProps {
    onPriceChanged: (value: number) => void;
    onQuantityChanged: (value: number) => void;
}

const PriceQuantitySelectWidget: React.FC<PriceQuantitySelectWidgetProps> = ({ onPriceChanged, onQuantityChanged}) => {
    const [price, setPrice] = useState<number | null>(null);
    const [qty, setQty] = useState<number | null>(null);

    useEffect(() => {

    }, []);

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value, 10);
        if (!isNaN(value)) {
            setPrice(value);
            onPriceChanged(value);
        } else {
            setPrice(null);
        }

    };

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value, 10);
        if (!isNaN(value)) {
            setQty(value);
            onQuantityChanged(value);
        } else {
            setQty(null);
        }
    };

    const reset = () => {
        setPrice(null);
        setQty(null);
    };

    return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '8px' }}>
                <Input
                    type="text"
                    inputMode='numeric'
                    value={price !== null ? price : ''}
                    onChange={handlePriceChange}
                    min={1}
                    max={1000000}
                    placeholder="price"
                    suffix={<label style={{color: 'rgba(0, 0, 0, 0.45)' }}>₽</label>}
                />

                <Input
                    type="text"
                    inputMode='numeric'
                    value={qty !== null ? qty : ''}
                    onChange={handleQuantityChange}
                    min={1}
                    max={100}
                    placeholder="count"
                    suffix={<ShoppingCartOutlined style={{ color: 'rgba(0, 0, 0, 0.45)' }} />}
                />
            </div>

            <Text type="secondary" style={{ height: '16px', display: 'block', textAlign: 'left' }}>
                {!price || !qty ? ' ' : "total cost: " + (price * qty).toString() + "₽"}
            </Text>
        </div>
    );
};

export default PriceQuantitySelectWidget;