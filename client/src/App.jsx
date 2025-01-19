import {useEffect, useState} from 'react'
import {Button, Layout} from 'antd';

import './App.css'
import AddProductScreen from "./Screens/AddProductScreen.jsx";
import QuickPurchaseScreen from "./Screens/QuickPurchaseScreen.jsx";
import AddCheckScreen from "./Screens/AddCheckScreen.jsx";
import 'antd/dist/reset.css';
import {AppleOutlined, CoffeeOutlined, OrderedListOutlined,} from '@ant-design/icons';

const {Footer, Content} = Layout;

// Компоненты контента
const AddProductContent = () => <AddProductScreen/>;
const QuickPurchaseContent = () => <QuickPurchaseScreen/>;
const AddCheckContent = () => <AddCheckScreen/>;

const App = () => {
    const [activePage, setActivePage] = useState('home'); // Состояние для текущей страницы

    const isTelegramWebApp = () => {
        // Проверяем наличие Telegram API и подтверждаем, что приложение открыто в Telegram
        console.log(window.Telegram)
        return (typeof window !== 'undefined' && window.Telegram?.WebApp && window.Telegram?.WebApp.platform !== "unknown");
    };

    useEffect(() => {
        if (isTelegramWebApp()) {
            const tg = window.Telegram.WebApp;

            // Инициализируем Telegram Web App API
            tg.ready();

            // Отключаем свайпы для закрытия
            tg.disableVerticalSwipes();
        }
    }, []);


    // Функция для отображения контента
    const renderContent = () => {
        switch (activePage) {
            case 'AddProduct':
                return <AddProductContent/>;
            case 'QuickPurchase':
                return <QuickPurchaseContent/>;
            case 'AddCheck':
                return <AddCheckContent/>;
            default:
                return <AddCheckContent/>;
        }
    }

    return (<Layout style={{height: '100vh', width: '100%', display: 'flex', flexDirection: 'column', padding: 0}}>
            {/* Контент страницы */}
            <Content style={{
                flex: 1, backgroundColor: '#f0f2f5', overflow: 'hidden', // Предотвращение прокрутки контента
                display: 'flex', flexDirection: 'column', width: '100%'
            }}>
                {renderContent()}
            </Content>

            {/* Меню внизу */}
            <Footer

                style={{
                    backgroundColor: '#fff', display: 'flex', justifyContent: 'space-around', // padding: '10px 0',
                    borderTop: '1px solid #e8e8e8', position: 'sticky', // Закрепляем внизу экрана
                    bottom: 0, padding: 0, width: '100%', overflow: 'hidden', // Исключение скролла в меню
                }}
            >
                <Button
                    type="text"
                    icon={<OrderedListOutlined/>}
                    size="large"
                    onClick={() => setActivePage('AddCheck')}
                />

                <Button
                    type="text"
                    icon={<CoffeeOutlined/>}
                    size="large"
                    onClick={() => setActivePage('QuickPurchase')}
                />

                <Button
                    type="text"
                    icon={<AppleOutlined/>}
                    size="large"
                    onClick={() => setActivePage('AddProduct')}
                />

            </Footer>
        </Layout>);
}

export default App;