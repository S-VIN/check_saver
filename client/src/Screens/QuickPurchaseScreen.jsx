import React, {useState} from 'react';
import {Button, DatePicker, Form, InputNumber, Select, Typography} from 'antd';
import dayjs from 'dayjs';
import SelectProductWidget from '../Widgets/ProductSelectWidget.jsx'

const {Option} = Select;
const {Text} = Typography;

const QuickPurchaseScreen = () => {
    const [form] = Form.useForm();
    const [totalPrice, setTotalPrice] = useState(0);
    const [tags] = useState(['Скидка', 'Новинка', 'Популярное', 'Эксклюзив', 'Акция']);

    const handleValuesChange = (_, allValues) => {
        const {price = 0, quantity = 1} = allValues;
        setTotalPrice(price * quantity);
    };

    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleProductSelect = (productName) => {
        setSelectedProduct(productName);
    };

    return (<div
            style={{
                maxWidth: '400px',
                margin: '0px auto',
                padding: '20px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                backgroundColor: '#fff',
            }}
        >
            <h2 style={{textAlign: 'center', marginBottom: '20px'}}>Быстрая покупка</h2>

            <Form
                form={form}
                layout="vertical"
                initialValues={{
                    date: dayjs(), // сегодняшняя дата
                    quantity: 1, // количество по умолчанию
                }}
                onValuesChange={handleValuesChange}
            >
                {/* Дата */}
                <Form.Item
                    label="Дата"
                    name="date"
                    rules={[{required: true, message: 'Выберите дату'}]}
                >
                    <DatePicker
                        style={{width: '100%'}}
                        format="DD.MM.YYYY"
                        placeholder="Выберите дату"
                    />
                </Form.Item>

                {/* Цена */}
                <Form.Item
                    label="Цена (₽)"
                    name="price"
                    rules={[{required: true, message: 'Введите цену товара'}]}
                >

                </Form.Item>

                {/* Количество */}
                <Form.Item
                    label="Количество"
                    name="quantity"
                    rules={[{required: true, message: 'Введите количество'}, {
                        type: 'number',
                        min: 1,
                        max: 100,
                        message: 'Введите количество от 1 до 100'
                    },]}
                >
                    <InputNumber
                        style={{width: '100%'}}
                        min={1}
                        max={100}
                        placeholder="Введите количество"
                    />
                </Form.Item>
                <Text type="secondary" style={{display: 'block', marginBottom: '20px'}}>
                    Общая стоимость: {totalPrice} ₽
                </Text>

                {/* Теги */}
                <Form.Item
                    label="Выбор тегов"
                    name="tags"
                    rules={[{required: true, message: 'Выберите хотя бы один тег'}]}
                >
                    <Select
                        mode="multiple"
                        placeholder="Выберите теги"
                        allowClear
                        filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                    >
                        {tags.map((tag) => (<Option key={tag} value={tag}>
                                {tag}
                            </Option>))}
                    </Select>
                </Form.Item>

                {/* Кнопка подтверждения */}
                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        Купить
                    </Button>
                </Form.Item>

                <Form.Item>
                    <SelectProductWidget onSelect={handleProductSelect}/>
                </Form.Item>

            </Form>
        </div>);
};

export default QuickPurchaseScreen;
