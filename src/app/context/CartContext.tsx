'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface Order {
  id: string;
  items: CartItem[];
  total: number;
  date: string;
  status: 'completed' | 'processing' | 'cancelled';
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  processOrder: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const processOrder = () => {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      alert('Пожалуйста, войдите в аккаунт для оформления заказа');
      return;
    }

    try {
      const user = JSON.parse(currentUser);
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      const newOrder: Order = {
        id: Date.now().toString(),
        items: [...cart],
        total: totalPrice,
        date: new Date().toISOString(),
        status: 'completed'
      };

      const updatedUsers = users.map((u: any) => {
        if (u.email === user.email) {
          return {
            ...u,
            orders: [...(u.orders || []), newOrder]
          };
        }
        return u;
      });

      localStorage.setItem('users', JSON.stringify(updatedUsers));
      
      const updatedUser = updatedUsers.find((u: any) => u.email === user.email);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));

      clearCart();

      alert('Заказ успешно оформлен! Вы можете посмотреть его в своем профиле.');
    } catch (error) {
      console.error('Error processing order:', error);
      alert('Произошла ошибка при оформлении заказа');
    }
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalItems,
      totalPrice,
      processOrder
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
} 