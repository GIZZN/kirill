"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.css';
import { useRouter } from 'next/navigation'; 
import { useCart } from '../../context/CartContext';

const allProducts = [
  { id: 1, name: 'Premium Leather Jacket', category: 'new', path: '/new#product-1' },
  { id: 2, name: 'Designer Crossbody Bag', category: 'new', path: '/new#product-2' },
  { id: 3, name: 'Limited Edition Sneakers', category: 'new', path: '/new#product-3' },
  { id: 4, name: 'Silk Evening Dress', category: 'new', path: '/new#product-4' },
  { id: 5, name: 'Smart Watch Pro', category: 'new', path: '/new#product-5' },
  { id: 6, name: 'Premium Denim Jeans', category: 'new', path: '/new#product-6' },
  { id: 7, name: 'Oversized Cotton T-Shirt', category: 'shop', path: '/shop#product-1' },
  { id: 8, name: 'Minimalist Leather Watch', category: 'shop', path: '/shop#product-2' },
  { id: 9, name: 'Urban Cargo Pants', category: 'shop', path: '/shop#product-3' },
  { id: 10, name: 'Classic Silver Chain', category: 'shop', path: '/shop#product-4' },
  { id: 11, name: 'Premium Denim Jacket', category: 'shop', path: '/shop#product-5' },
  { id: 12, name: 'Designer Sunglasses', category: 'shop', path: '/shop#product-6' },
];

export default function Header() {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cart, removeFromCart, updateQuantity, totalItems, totalPrice, processOrder } = useCart();

  useEffect(() => {
    const checkUserAuth = () => {
      const userData = localStorage.getItem('currentUser');
      if (userData) {
        try {
          const user = JSON.parse(userData);
          setCurrentUser(user);
        } catch (error) {
          console.error('Error parsing user data:', error);
          localStorage.removeItem('currentUser');
          setCurrentUser(null);
        }
      } else {
        setCurrentUser(null);
      }
    };

    checkUserAuth();

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'currentUser') {
        checkUserAuth();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    router.push('/');
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setIsSearching(true);

    if (query.trim() === '') {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    const productResults = allProducts.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );

    const results = [
      ...productResults,
      ...(currentUser && (
        currentUser.firstName.toLowerCase().includes(query.toLowerCase()) ||
        currentUser.lastName.toLowerCase().includes(query.toLowerCase())
      ) ? [{ id: 'profile', name: 'My Profile', path: '/profile' }] : [])
    ];

    setSearchResults(results);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchResults.length > 0) {
      const firstResult = searchResults[0];
      handleResultClick(firstResult.path);
    }
  };

  const handleResultClick = (path: string) => {
    const [basePath, anchor] = path.split('#');
    
    if (window.location.pathname === basePath && anchor) {
      const element = document.getElementById(anchor);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      router.push(path);
    }

    setSearchQuery('');
    setSearchResults([]);
    setIsSearching(false);
    setIsMobileMenuOpen(false);
  };

  const navigateToProduct = (productId: number) => {
    setShowResults(false);
    setSearchQuery('');
    router.push(`/shop#product-${productId}`);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const searchContainer = document.querySelector(`.${styles.searchContainer}`);
      if (searchContainer && !searchContainer.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <button 
          className={`${styles.mobileMenuButton} ${isMobileMenuOpen ? styles.active : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Меню"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={styles.leftSection}>
          <nav className={`${styles.nav} ${isMobileMenuOpen ? styles.mobileNavVisible : ''}`}>
            <Link href="/women" className={styles.navLink}>WOMEN</Link>
            <Link href="/men" className={styles.navLink}>MEN</Link>
            <Link href="/new" className={styles.navLink}>NEW</Link>
            <Link href="/shop" className={styles.navLink}>SALE</Link>
          </nav>
        </div>

        <Link href="/" className={styles.logo}>
          <div className={styles.logoTop}>SHARKTECH</div>
          <div className={styles.logoBottom}>
            <span>SECRET</span>
            <span>SHOP</span>
          </div>
        </Link>

        <div className={styles.rightSection}>
          <div className={`${styles.search} ${styles.desktopOnly}`}>
            <form onSubmit={handleSearchSubmit}>
              <input
                type="text"
                placeholder="Поиск"
                className={styles.searchInput}
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                onFocus={() => setShowResults(true)}
              />
              <button type="submit" className={styles.searchButton}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M19 19L13.8 13.8M16 8.5C16 12.6421 12.6421 16 8.5 16C4.35786 16 1 12.6421 1 8.5C1 4.35786 4.35786 1 8.5 1C12.6421 1 16 4.35786 16 8.5Z" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round"/>
                </svg>
              </button>
            </form>
            {showResults && searchResults.length > 0 && (
              <div className={styles.searchResults}>
                {searchResults.map((result) => (
                  <div
                    key={result.id}
                    className={styles.searchResult}
                    onClick={() => navigateToProduct(result.id)}
                  >
                    <span className={styles.resultName}>{result.name}</span>
                    <span className={styles.resultCategory}>
                      {result.category === 'new' ? 'New Arrivals' : 
                       result.category === 'shop' ? 'Shop' : 'Profile'}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className={styles.actions}>
            <div className={styles.cartContainer}>
              <button 
                className={styles.cartButton}
                onClick={() => setIsCartOpen(!isCartOpen)}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {totalItems > 0 && (
                  <span className={styles.cartBadge}>{totalItems}</span>
                )}
              </button>
              {isCartOpen && (
                <div className={styles.cartDropdown}>
                  <div className={styles.cartHeader}>
                    <h3>Shopping Cart</h3>
                    <button 
                      className={styles.closeButton}
                      onClick={() => setIsCartOpen(false)}
                    >
                      ×
                    </button>
                  </div>

                  {cart.length === 0 ? (
                    <div className={styles.emptyCart}>
                      <p>Your cart is empty</p>
                    </div>
                  ) : (
                    <>
                      <div className={styles.cartItems}>
                        {cart.map(item => (
                          <div key={item.id} className={styles.cartItem}>
                            <div className={styles.itemImage}>
                              <Image
                                src={item.image}
                                alt={item.name}
                                width={80}
                                height={100}
                                style={{ objectFit: 'cover' }}
                              />
                            </div>
                            <div className={styles.itemDetails}>
                              <h4>{item.name}</h4>
                              <p className={styles.itemPrice}>${item.price}</p>
                              <div className={styles.quantityControls}>
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  disabled={item.quantity <= 1}
                                >
                                  -
                                </button>
                                <span>{item.quantity}</span>
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                >
                                  +
                                </button>
                              </div>
                            </div>
                            <button
                              className={styles.removeButton}
                              onClick={() => removeFromCart(item.id)}
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>

                      <div className={styles.cartFooter}>
                        <div className={styles.total}>
                          <span>Total:</span>
                          <span>${totalPrice.toFixed(2)}</span>
                        </div>
                        <button 
                          className={styles.checkoutButton}
                          onClick={() => {
                            if (!currentUser) {
                              alert('Пожалуйста, войдите в аккаунт для оформления заказа');
                              router.push('/login');
                              return;
                            }
                            processOrder();
                            setIsCartOpen(false);
                          }}
                        >
                          PROCEED TO CHECKOUT
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
            {currentUser ? (
              <div className={styles.userSection}>
                <Link href="/profile" className={styles.profileLink}>
                  <div className={styles.userInitials}>
                    {currentUser.firstName[0]}{currentUser.lastName[0]}
                  </div>
                </Link>
                <button onClick={handleLogout} className={styles.logoutButton}>
                  Logout
                </button>
              </div>
            ) : (
              <div className={styles.authButtons}>
                <Link href="/login" className={styles.authButton}>Login</Link>
                <Link href="/register" className={styles.authButton}>Register</Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={`${styles.mobileSearch} ${isMobileMenuOpen ? styles.visible : ''}`}>
        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Поиск"
            className={styles.mobileSearchInput}
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            onFocus={() => setShowResults(true)}
          />
        </form>
        {showResults && searchResults.length > 0 && (
          <div className={styles.mobileSearchResults}>
            {searchResults.map((result) => (
              <div
                key={result.id}
                className={styles.searchResult}
                onClick={() => navigateToProduct(result.id)}
              >
                <span className={styles.resultName}>{result.name}</span>
                <span className={styles.resultCategory}>
                  {result.category === 'new' ? 'New Arrivals' : 
                   result.category === 'shop' ? 'Shop' : 'Profile'}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </header>
  );
} 