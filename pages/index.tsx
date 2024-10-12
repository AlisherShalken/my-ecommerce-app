import Head from 'next/head';
import { useState } from 'react';
import Catalog from '../components/Catalog';
import CartSidebar from '../components/CartSidebar';

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  quantity?: number;
}

const Home = () => {
  const [cart, setCart] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleAddToCart = (product: Product) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, quantity: (item.quantity ?? 0) + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const handleRemoveFromCart = (productId: number) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveFromCart(productId); // Удаляем товар, если количество становится нулевым или отрицательным
    } else {
      setCart(
        cart.map((item) => {
          if (item.id === productId) {
            return { ...item, quantity: newQuantity };
          } else {
            return item;
          }
        })
      );
    }
  };

  return (
    <div>
      <Head>
        <title>Мой интернет-магазин</title>
      </Head>
      <main className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Каталог товаров</h1>
        <button
          className="bg-red-500 text-white p-2 rounded mb-4"
          onClick={() => setIsCartOpen(!isCartOpen)}
        >
          Корзина ({cart.reduce((acc, item) => acc + (item.quantity ?? 0), 0)})
        </button>
        <Catalog onAddToCart={handleAddToCart} />
        <CartSidebar
          cart={cart}
          onClose={() => setIsCartOpen(false)}
          onRemove={handleRemoveFromCart}
          onQuantityChange={handleQuantityChange}
          isOpen={isCartOpen}
        />
      </main>
      
      {/* Добавляем футер */}
      <footer className="bg-white text-black text-center py-4 mt-8">
        <p>Made by Alisher Shalken :)</p>
      </footer>
    </div>
  );
};

export default Home;
