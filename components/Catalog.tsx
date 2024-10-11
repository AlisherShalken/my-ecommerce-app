import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  quantity?: number;
}

interface CatalogProps {
  onAddToCart: (product: Product) => void;
}

const Catalog: React.FC<CatalogProps> = ({ onAddToCart }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('Все');
  const [sortOrder, setSortOrder] = useState<string>('asc');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const productsPerPage = 10;

  useEffect(() => {
    fetch('http://localhost:3001/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
      })
      .catch((error) => console.error('Ошибка при загрузке данных:', error));
  }, []);

  // Функция для изменения категории
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  // Обработка изменений в фильтрации и сортировке
  useEffect(() => {
    let updatedProducts = products;

    // Фильтрация по выбранной категории
    if (selectedCategory !== 'Все') {
      updatedProducts = updatedProducts.filter((product) => product.category === selectedCategory);
    }

    // Фильтрация по поисковому запросу
    if (searchTerm) {
      updatedProducts = updatedProducts.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Сортировка продуктов по цене
    const sortedProducts = [...updatedProducts].sort((a, b) => {
      return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
    });

    setFilteredProducts(sortedProducts);
  }, [products, selectedCategory, sortOrder, searchTerm]);

  // Индексы для пагинации продуктов
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfFirstProduct + productsPerPage);

  // Функция для переключения страниц
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between mb-4 space-y-2 sm:space-y-0">
        <input
          type="text"
          placeholder="Поиск товаров..."
          className="p-2 border rounded w-full sm:w-auto flex-grow mr-0 sm:mr-4"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Обновляем поисковый запрос
        />
        <select
          className="p-2 border rounded w-full sm:w-auto"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)} // Обновляем порядок сортировки
        >
          <option value="asc">Сортировать по цене (от дешевых к дорогим)</option>
          <option value="desc">Сортировать по цене (от дорогих к дешевым)</option>
        </select>
      </div>
      <div className="flex space-x-2 mb-4">
        {['Все', 'Электроника', 'Книги', 'Одежда', 'Дом', 'Аксессуары'].map((category) => (
          <button
            key={category}
            className={`p-2 border rounded ${selectedCategory === category ? 'bg-red-500 text-white' : 'text-red-500'}`}
            onClick={() => handleCategoryChange(category)} // Изменение категории при клике
          >
            {category}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {currentProducts.length > 0 ? (
          currentProducts.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
          ))
        ) : (
          <p>Нет доступных товаров</p>
        )}
      </div>
      <div className="flex justify-center mt-4">
        {Array.from({ length: Math.ceil(filteredProducts.length / productsPerPage) }, (_, i) => (
          <button
            key={i}
            className={`mx-1 px-3 py-1 border ${currentPage === i + 1 ? 'bg-red-500 text-white' : 'bg-white text-red-500'}`}
            onClick={() => paginate(i + 1)} // Переключение страницы
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Catalog;
