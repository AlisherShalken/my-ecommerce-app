import React from 'react';
import { Product } from './Catalog';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="border border-red-500 p-4 rounded-lg bg-white hover:shadow-lg transition-shadow duration-300">
      {/* Отображаем изображение товара */}
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover mb-2 rounded"
      />
      <h2 className="text-lg font-bold text-gray-900">{product.name}</h2>
      <p className="text-xl text-gray-700 font-semibold">{product.price} ₸</p>
      <button
        className="mt-4 p-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-200"
        onClick={() => onAddToCart(product)}
      >
        В корзину
      </button>
    </div>
  );
};

export default ProductCard;
