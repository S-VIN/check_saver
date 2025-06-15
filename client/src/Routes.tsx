import type { ComponentType, JSX } from 'react';

import AddCheckScreen from './Screens/AddCheckScreen.tsx';
import AddProductScreen from './Screens/AddProductScreen.tsx';
import QuickPurchaseScreen from './Screens/QuickPurchaseScreen.tsx';

interface Route {
  path: string;
  Component: ComponentType;
  title?: string;
  icon?: JSX.Element;
}

export const routes: Route[] = [
  { path: '/', Component: AddCheckScreen, title: 'AddCheckScreen' },
  { path: '/add-check-screen', Component: AddCheckScreen, title: 'AddCheckScreen' },
  { path: '/add-product-screen', Component: AddProductScreen, title: 'AddProductScreen' },
  { path: '/quick-purchase-screen', Component: QuickPurchaseScreen, title: 'QuickPurchaseScreen' },
];