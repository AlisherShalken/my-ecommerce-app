import React from 'react';

// Интерфейс для определения типов пропсов, которые принимает компонент CartButton
interface CartButtonProps {
  itemCount: number; // Количество товаров в корзине
  onClick: () => void; // Функция, вызываемая при нажатии на кнопку
}

// Компонент CartButton принимает количество товаров в корзине и функцию, срабатывающую при клике
const CartButton: React.FC<CartButtonProps> = ({ itemCount, onClick }) => {
  return (
    <div className="relative inline-block">
      {/* Кнопка корзины */}
      <button
        onClick={onClick} // Обработчик клика, переданный через пропсы
        className="mb-4 p-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-200 flex items-center"
      >
        {/* Иконка корзины */}
        <span className="material-icons">shopping_cart</span>
        {/* Текст "Корзина" рядом с иконкой */}
        <span className="ml-2">Корзина</span>
      </button>
      {/* Показ количества товаров, если оно больше 0 */}
      {itemCount > 0 && (
        <span className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
          {itemCount}
        </span>
      )}
    </div>
  );
};

export default CartButton;
