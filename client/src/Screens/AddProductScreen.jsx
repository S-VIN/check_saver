import React from 'react';
import axios from 'axios';
import {Button, Form, Input, message, Select} from 'antd';
import CategorySelectWidget from "../Widgets/CategorySelectWidget.jsx";
import BrandSelectWidget from "../Widgets/BrandSelectWidget.jsx";
import VolumeSelectWidget from "../Widgets/VolumeSelectWidget.jsx";
import ProductStore from "../Stores/ProductStore.jsx";
import Product from "../Models/Product.jsx";
import {ApiUrl} from "../config.jsx";

const {Option} = Select;

const AddProductScreen = () => {
    const [form] = Form.useForm();

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            // Преобразование заглавных букв в строчные
            const formattedValues = {
                name: values.name.toLowerCase(),
                volume: values.volume.toLowerCase(),
                brand: values.brand.toLowerCase(),
                category: values.category.toLowerCase(),
            };

            // Отправка POST-запроса
            let response = await axios.post(ApiUrl + '/products/', formattedValues);

            await ProductStore.addProduct(Product(response.data.id, values.name, values.volume, values.brand, values.category))

            message.success('Товар успешно добавлен!');
            form.resetFields();
        } catch (error) {
            message.error('Ошибка при добавлении товара. Проверьте корректность данных.');
            console.error(error);
        }
    };

    return (<div
            style={{
                maxWidth: '400px',
                margin: '0px',
                padding: '20px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                backgroundColor: '#fff',
            }}
        >
            <h2 style={{textAlign: 'center', marginBottom: '20px'}}>Добавить товар</h2>

            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
            >
                {/* Название */}
                <Form.Item
                    label="Название"
                    name="name"
                    rules={[{required: true, message: 'Введите название товара'}]}
                >
                    <Input placeholder="Введите название"/>
                </Form.Item>

                {/* Объём */}
                <Form.Item
                    label="Объём"
                    name="volume"
                    rules={[{required: true, message: 'Введите объём'}]}
                >
                    <VolumeSelectWidget/>
                </Form.Item>

                {/* Бренд */}
                <Form.Item
                    label="Бренд"
                    name="brand"
                    rules={[{required: true, message: 'Введите бренд'}]}
                >
                    <BrandSelectWidget/>
                </Form.Item>

                {/* Категория */}
                <Form.Item
                    label="Категория"
                    name="category"
                    rules={[{required: true, message: 'Выберите категорию'}]}
                >
                    <CategorySelectWidget/>
                </Form.Item>

                {/* Кнопка подтверждения */}
                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        Добавить товар
                    </Button>
                </Form.Item>
            </Form>
        </div>);
};

export default AddProductScreen;
