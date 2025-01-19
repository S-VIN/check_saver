import {makeAutoObservable} from 'mobx';
import axios from 'axios';
import Product from '../Models/Product';
import {ApiUrl} from "../config.jsx";

class ProductStore {
    products = [];

    constructor() {
        makeAutoObservable(this);
        this.loadProducts(); // Инициализация при создании
    }

    // Метод для загрузки продуктов с сервера
    async loadProducts() {
        try {
            const response = await axios.get(ApiUrl + '/products/unique');

            for (const item of response.data) {
                this.products.push(new Product(item.id, item.name, item.volume, item.category, item.brand))
            }
        } catch (error) {
            console.error('Ошибка загрузки продуктов:', error);
        }
    }

    // Получение всех продуктов
    getProducts() {
        return this.products;
    }

    // Получение продукта по ID
    getProductById(id) {
        return this.products.find((product) => product.id === id);
    }

    // Добавление нового продукта
    async addProduct(productData) {
        try {
            // Создаем новый продукт и отправляем его на сервер
            const response = await axios.post(ApiUrl + '/products/', productData);
            const newProduct = new Product(response.data);

            // Добавляем продукт в store
            this.products.push(newProduct);
        } catch (error) {

        }
    }
}

const productStore = new ProductStore();
export default productStore;
