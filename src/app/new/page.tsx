'use client';

import { useState, useEffect } from 'react';
import styles from './new.module.css';
import Image from 'next/image';
import { useCart } from '../context/CartContext';

const newProducts = [
  {
    id: 1,
    name: 'Leather Crossbody Bag',
    price: 199.99,
    image: '/images/newprod/crossbody-bag.jpg',
    category: 'accessories',
    dateAdded: '2024-03-15'
  },
  {
    id: 2,
    name: 'Smart Watch Pro',
    price: 299.99,
    image: '/images/newprod/smart-watch.jpg',
    category: 'electronics',
    dateAdded: '2024-03-14'
  },
  {
    id: 3,
    name: 'Designer Evening Dress',
    price: 399.99,
    image: '/images/newprod/evening-dress.jpg',
    category: 'clothing',
    dateAdded: '2024-03-13'
  },
  {
    id: 4,
    name: 'Premium Leather Jacket',
    price: 499.99,
    image: '/images/newprod/leather-jacket.jpg',
    category: 'clothing',
    dateAdded: '2024-03-12'
  },
  {
    id: 5,
    name: 'Designer Jeans',
    price: 159.99,
    image: '/images/newprod/jeans.jpg',
    category: 'clothing',
    dateAdded: '2024-03-11'
  },
  {
    id: 6,
    name: 'Limited Edition Sneakers',
    price: 249.99,
    image: '/images/newprod/sneakers.jpg',
    category: 'shoes',
    dateAdded: '2024-03-10'
  },
  {
    id: 7,
    name: 'Designer Backpack',
    price: 179.99,
    image: '/images/newprod/backpack.jpg',
    category: 'accessories',
    dateAdded: '2024-03-09'
  },
  {
    id: 8,
    name: 'Wireless Earbuds',
    price: 159.99,
    image: '/images/newprod/earbuds.jpg',
    category: 'electronics',
    dateAdded: '2024-03-08'
  },
  {
    id: 9,
    name: 'Summer Dress Collection',
    price: 129.99,
    image: '/images/newprod/summer-dress.jpg',
    category: 'clothing',
    dateAdded: '2024-03-07'
  },
  {
    id: 10,
    name: 'Sport Running Shoes',
    price: 189.99,
    image: '/images/newprod/running-shoes.jpg',
    category: 'shoes',
    dateAdded: '2024-03-06'
  },
  {
    id: 11,
    name: 'Designer Sunglasses',
    price: 199.99,
    image: '/images/newprod/sunglasses.jpg',
    category: 'accessories',
    dateAdded: '2024-03-05'
  },
  {
    id: 12,
    name: 'Smart Fitness Band',
    price: 99.99,
    image: '/images/newprod/fitness-band.jpg',
    category: 'electronics',
    dateAdded: '2024-03-04'
  }
];

const ITEMS_PER_PAGE = 6;

export default function NewArrivals() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredProducts, setFilteredProducts] = useState(newProducts);
  const { addToCart } = useCart();

  useEffect(() => {
    const filtered = selectedCategory === 'all'
      ? newProducts
      : newProducts.filter(product => product.category === selectedCategory);
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric'
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>NEW ARRIVALS</h1>
        <div className={styles.filters}>
          <button 
            className={`${styles.filterButton} ${selectedCategory === 'all' ? styles.active : ''}`}
            onClick={() => setSelectedCategory('all')}
          >
            ALL
          </button>
          <button 
            className={`${styles.filterButton} ${selectedCategory === 'clothing' ? styles.active : ''}`}
            onClick={() => setSelectedCategory('clothing')}
          >
            CLOTHING
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
          <button 
            className={`${styles.filterButton} ${selectedCategory === 'electronics' ? styles.active : ''}`}
            onClick={() => setSelectedCategory('electronics')}
          >
            ELECTRONICS
          </button>
        </div>
      </div>

      <div className={styles.grid}>
        {getCurrentPageProducts().map((product) => (
          <div 
            key={product.id}
            className={styles.product}
            onMouseEnter={() => setHoveredProduct(product.id)}
            onMouseLeave={() => setHoveredProduct(null)}
          >
            <div className={styles.imageContainer}>
              <div className={styles.newBadge}>NEW</div>
              <div className={styles.dateBadge}>{formatDate(product.dateAdded)}</div>
              <Image
                src={product.image}
                alt={product.name}
                width={400}
                height={500}
                className={styles.image}
              />
              <div className={`${styles.overlay} ${hoveredProduct === product.id ? styles.visible : ''}`}>
                <div className={styles.overlayContent}>
                  <div className={styles.productButtons}>
                    <button className={styles.quickViewButton}>
                      QUICK VIEW
                    </button>
                    <button 
                      className={styles.addToCartButton}
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