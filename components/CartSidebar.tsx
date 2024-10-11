import React from 'react';
import { Product } from './Catalog';

// Интерфейс для определения типов пропсов, которые принимает компонент CartSidebar
interface CartSidebarProps {
  cart: Product[]; // Массив товаров в корзине
  onClose: () => void; // Функция для закрытия боковой панели
  onRemove: (productId: number) => void; // Функция для удаления товара из корзины
  onQuantityChange: (productId: number, newQuantity: number) => void; // Функция для изменения количества товара
  isOpen: boolean; // Определяет, открыта ли боковая панель
}

// Компонент CartSidebar отображает боковую панель с содержимым корзины
const CartSidebar: React.FC<CartSidebarProps> = ({ cart, onClose, onRemove, onQuantityChange, isOpen }) => {
  return (
    <div
      // Устанавливаем позицию панели: если открыта, она появляется справа, если нет — скрыта
      className={`fixed top-0 ${isOpen ? 'right-0' : '-right-full'} w-full md:w-64 h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50`}
    >
      {/* Кнопка закрытия боковой панели */}
      <button onClick={onClose} className="p-4 text-red-500 font-semibold">
        Закрыть
      </button>
      {/* Заголовок корзины */}
      <h2 className="text-xl font-bold mb-4 p-4 text-gray-900">Корзина</h2>
      {/* Список товаров в корзине */}
      <ul className="p-4 space-y-4">
        {cart.map((item) => (
          <li key={item.id} className="flex justify-between items-center mb-2 text-gray-900">
            {/* Название товара и его количество */}
            <span>{item.name} (x{item.quantity ?? 0})</span>
            <div className="flex items-center">
              {/* Кнопка уменьшения количества товара */}
              <button
                className="mr-2 p-1 bg-yellow-400 text-black rounded hover:bg-yellow-500 transition-colors duration-200"
                onClick={() => onQuantityChange(item.id, (item.quantity ?? 0) - 1)}
              >
                -
              </button>
              {/* Кнопка увеличения количества товара */}
              <button
                className="p-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors duration-200"
                onClick={() => onQuantityChange(item.id, (item.quantity ?? 0) + 1)}
              >
                +
              </button>
              {/* Кнопка удаления товара из корзины */}
              <button
                className="ml-2 p-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-200"
                onClick={() => onRemove(item.id)}
              >
                Удалить
              </button>
            </div>
          </li>
        ))}
      </ul>
      {/* Общая сумма товаров в корзине */}
      <div className="p-4">
        <strong className="text-gray-900">
          Итого: {cart.reduce((total, item) => total + item.price * (item.quantity ?? 0), 0)} ₸
        </strong>
      </div>
    </div>
  );
};

export default CartSidebar;
