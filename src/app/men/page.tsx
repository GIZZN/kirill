'use client';

import { useState, useEffect } from 'react';
import styles from './men.module.css';
import Image from 'next/image';
import { useCart } from '../context/CartContext';

const products = [
  {
    id: 1,
    name: 'Leather Jacket',
    price: 399.99,
    image: '/images/newprod/leather-jacket.jpg',
    category: 'outerwear'
  },
  {
    id: 2,
    name: 'Premium Jeans',
    price: 159.99,
    image: '/images/newprod/jeans.jpg',
    category: 'pants'
  },
  {
    id: 3,
    name: 'Backpack',
    price: 129.99,
    image: '/images/newprod/backpack.jpg',
    category: 'accessories'
  },
  {
    id: 4,
    name: 'Wireless Earbuds',
    price: 199.99,
    image: '/images/newprod/earbuds.jpg',
    category: 'accessories'
  },
  {
    id: 5,
    name: 'Smart Watch',
    price: 299.99,
    image: '/images/newprod/smart-watch.jpg',
    category: 'accessories'
  },
  {
    id: 6,
    name: 'Sneakers',
    price: 149.99,
    image: '/images/newprod/sneakers.jpg',
    category: 'shoes'
  }
];

const ITEMS_PER_PAGE = 6;

export default function MenShop() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const { addToCart } = useCart();

  useEffect(() => {
    const filtered = selectedCategory === 'all' 
      ? products 
      : products.filter(product => product.category === selectedCategory);
    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [selectedCategory]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  const getCurrentPageProducts = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredProducts.slice(startIndex, endIndex);
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      let startPage = Math.max(1, currentPage - 2);
      let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

      if (endPage - startPage < maxVisiblePages - 1) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }

      if (startPage > 1) {
        pageNumbers.push(1);
        if (startPage > 2) pageNumbers.push('...');
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) pageNumbers.push('...');
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>MEN</h1>
        <div className={styles.filters}>
          <button 
            className={`${styles.filterButton} ${selectedCategory === 'all' ? styles.active : ''}`}
            onClick={() => setSelectedCategory('all')}
          >
            ALL
          </button>
          <button 
            className={`${styles.filterButton} ${selectedCategory === 'outerwear' ? styles.active : ''}`}
            onClick={() => setSelectedCategory('outerwear')}
          >
            OUTERWEAR
          </button>
          <button 
            className={`${styles.filterButton} ${selectedCategory === 'pants' ? styles.active : ''}`}
            onClick={() => setSelectedCategory('pants')}
          >
            PANTS
          </button>
          <button 
            className={`${styles.filterButton} ${selectedCategory === 'accessories' ? styles.active : ''}`}
            onClick={() => setSelectedCategory('accessories')}
          >
            ACCESSORIES
          </button>
          <button 
            className={`${styles.filterButton} ${selectedCategory === 'shoes' ? styles.active : ''}`}
            onClick={() => setSelectedCategory('shoes')}
          >
            SHOES
          </button>
        </div>
      </div>

      <div className={styles.grid}>
        {getCurrentPageProducts().map((product) => (
          <div 
            key={product.id}
            id={`product-${product.id}`}
            className={styles.product}
            onMouseEnter={() => setHoveredProduct(product.id)}
            onMouseLeave={() => setHoveredProduct(null)}
          >
            <div className={styles.imageContainer}>
              <Image
                src={product.image}
                alt={product.name}
                width={400}
                height={500}
                className={styles.image}
              />
              <div className={`${styles.overlay} ${hoveredProduct === product.id ? styles.visible : ''}`}>
                <div className={styles.overlayContent}>
                  <button 
                    className={styles.addToCart}
                    onClick={() => addToCart({
                      id: product.id.toString(),
                      name: product.name,
                      price: product.price,
                      image: product.image
                    })}
                  >
                    ADD TO CART
                  </button>
                </div>
              </div>
            </div>
            <div className={styles.details}>
              <h3 className={styles.productName}>{product.name}</h3>
              <p className={styles.price}>${product.price}</p>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button 
            className={`${styles.pageButton} ${currentPage === 1 ? styles.disabled : ''}`}
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          
          {getPageNumbers().map((pageNum, index) => (
            <button
              key={index}
              className={`${styles.pageButton} ${
                pageNum === currentPage ? styles.active : ''
              } ${pageNum === '...' ? styles.dots : ''}`}
              onClick={() => typeof pageNum === 'number' && setCurrentPage(pageNum)}
              disabled={pageNum === '...'}
            >
              {pageNum}
            </button>
          ))}

          <button 
            className={`${styles.pageButton} ${currentPage === totalPages ? styles.disabled : ''}`}
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
} 