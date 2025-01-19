class Product {
    /**
     * Конструктор для создания объекта покупки
     * @param {string} id - Уникальный идентификатор покупки
     * @param {string} name - Название покупки
     * @param {string} volume - Объём покупки
     * @param {Array<string>} category - Массив тегов, связанных с покупкой
     * @param {string} brand - Бренд покупки
     */
    constructor(id, name, volume, category = [], brand) {
        this.id = id; // Уникальный идентификатор
        this.name = name; // Название
        this.volume = volume; // Объём
        this.category = category; // Массив тегов
        this.brand = brand; // Бренд
    }

    /**
     * Метод для получения описания объекта в текстовом формате
     * @returns {string} Строка с описанием объекта
     */
    getDescription() {
        return `Product [ID: ${this.id}, Name: ${this.name}, Volume: ${this.volume}, category: ${this.category.join(
            ', '
        )}, Brand: ${this.brand}]`;
    }

    /**
     * Добавить новый тег в массив тегов
     * @param {string} tag - Тег для добавления
     */
    addTag(tag) {
        if (!this.category.includes(tag)) {
            this.category.push(tag);
        }
    }

    /**
     * Удалить тег из массива тегов
     * @param {string} tag - Тег для удаления
     */
    removeTag(tag) {
        this.category = this.category.filter((t) => t !== tag);
    }

    /**
     * Проверить, содержит ли покупка заданный тег
     * @param {string} tag - Тег для проверки
     * @returns {boolean} Возвращает true, если тег есть
     */
    hasTag(tag) {
        return this.category.includes(tag);
    }
}

export default Product;
