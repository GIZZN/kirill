import styles from './Footer.module.css';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <h3 className={styles.footerTitle}>SHARKTECH</h3>
            <p className={styles.footerText}>
              Discover the perfect blend of style and innovation in our exclusive collection.
            </p>
            <div className={styles.socialLinks}>
              <Link href="#" className={styles.socialLink}>Instagram</Link>
              <Link href="#" className={styles.socialLink}>Facebook</Link>
              <Link href="#" className={styles.socialLink}>Twitter</Link>
            </div>
          </div>

          <div className={styles.footerSection}>
            <h4 className={styles.footerTitle}>Quick Links</h4>
            <nav className={styles.footerNav}>
              <Link href="/new-arrivals" className={styles.footerLink}>New Arrivals</Link>
              <Link href="/bestsellers" className={styles.footerLink}>Bestsellers</Link>
              <Link href="/men" className={styles.footerLink}>Men</Link>
              <Link href="/women" className={styles.footerLink}>Women</Link>
              <Link href="/accessories" className={styles.footerLink}>Accessories</Link>
            </nav>
          </div>

          <div className={styles.footerSection}>
            <h4 className={styles.footerTitle}>Help & Info</h4>
            <nav className={styles.footerNav}>
              <Link href="/shipping" className={styles.footerLink}>Shipping Info</Link>
              <Link href="/returns" className={styles.footerLink}>Returns</Link>
              <Link href="/sizing" className={styles.footerLink}>Size Guide</Link>
              <Link href="/track-order" className={styles.footerLink}>Track Order</Link>
              <Link href="/contact" className={styles.footerLink}>Contact Us</Link>
            </nav>
          </div>

          <div className={styles.footerSection}>
            <h4 className={styles.footerTitle}>Contact Us</h4>
            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <svg className={styles.icon} width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="currentColor"/>
                </svg>
                <span>123 Fashion Street, City, Country</span>
              </div>
              <div className={styles.contactItem}>
                <svg className={styles.icon} width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.15 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" fill="currentColor"/>
                </svg>
                <span>+1 234 567 890</span>
              </div>
              <div className={styles.contactItem}>
                <svg className={styles.icon} width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" fill="currentColor"/>
                </svg>
                <span>info@sharktech.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} SHARKTECH. All rights reserved.
          </p>
          <div className={styles.legalLinks}>
            <Link href="/privacy" className={styles.legalLink}>Privacy Policy</Link>
            <Link href="/terms" className={styles.legalLink}>Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
} 