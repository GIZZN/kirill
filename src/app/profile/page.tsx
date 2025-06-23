'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './profile.module.css';
import Image from 'next/image';

interface Order {
  id: string;
  items: Array<{
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
  }>;
  total: number;
  date: string;
  status: 'completed' | 'processing' | 'cancelled';
}

export default function Profile() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      router.push('/login');
      return;
    }

    const userData = JSON.parse(currentUser);
    setUser(userData);
    setFormData({
      firstName: userData.firstName || '',
      lastName: userData.lastName || '',
      email: userData.email || '',
      phone: userData.phone || '',
      address: userData.address || '',
    });
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.firstName || !formData.lastName || !formData.email) {
      setError('Name and email are required');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = users.map((u: any) => 
      u.id === user.id ? { ...u, ...formData } : u
    );
    
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    localStorage.setItem('currentUser', JSON.stringify({ ...user, ...formData }));

    setUser({ ...user, ...formData });
    setIsEditing(false);
    setSuccess('Profile updated successfully');
  };

  if (!user) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.profileWrapper}>
        <h1 className={styles.title}>Мой профиль</h1>

        {error && <div className={styles.error}>{error}</div>}
        {success && <div className={styles.success}>{success}</div>}

        <div className={styles.profileContent}>
          <div className={styles.profileHeader}>
            <div className={styles.userInitials}>
              {user.firstName[0]}{user.lastName[0]}
            </div>
            <button 
              onClick={() => setIsEditing(!isEditing)} 
              className={styles.editButton}
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>

          {isEditing ? (
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Phone (optional)</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Address (optional)</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>

              <button type="submit" className={styles.submitButton}>
                Save Changes
              </button>
            </form>
          ) : (
            <div className={styles.profileInfo}>
              <div className={styles.infoGroup}>
                <label>Name</label>
                <p>{user.firstName} {user.lastName}</p>
              </div>

              <div className={styles.infoGroup}>
                <label>Email</label>
                <p>{user.email}</p>
              </div>

              {user.phone && (
                <div className={styles.infoGroup}>
                  <label>Phone</label>
                  <p>{user.phone}</p>
                </div>
              )}

              {user.address && (
                <div className={styles.infoGroup}>
                  <label>Address</label>
                  <p>{user.address}</p>
                </div>
              )}
            </div>
          )}

          {/* Секция с историей заказов */}
          <div className={styles.ordersSection}>
            <h2 className={styles.ordersTitle}>История заказов</h2>
            {user.orders && user.orders.length > 0 ? (
              <div className={styles.ordersList}>
                {user.orders.map((order: Order) => (
                  <div key={order.id} className={styles.orderCard}>
                    <div className={styles.orderHeader}>
                      <span className={styles.orderDate}>
                        {new Date(order.date).toLocaleDateString()}
                      </span>
                      <span className={styles.orderTotal}>
                        ${order.total.toFixed(2)}
                      </span>
                    </div>
                    <div className={styles.orderItems}>
                      {order.items.map((item) => (
                        <div key={item.id} className={styles.orderItem}>
                          <div className={styles.itemImageContainer}>
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={60}
                              height={80}
                              style={{ objectFit: 'cover' }}
                            />
                          </div>
                          <div className={styles.itemDetails}>
                            <h4>{item.name}</h4>
                            <p>Количество: {item.quantity}</p>
                            <p>${item.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className={styles.noOrders}>У вас пока нет заказов</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 