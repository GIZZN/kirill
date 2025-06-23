import styles from './Footer.module.css';
import Image from 'next/image';
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

          {/* Quick Links */}
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

          {/* Help & Info */}
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

          {/* Contact Info */}
          <div className={styles.footerSection}>
            <h4 className={styles.footerTitle}>Contact Us</h4>
            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <Image src="/icons/location.svg" alt="Location" width={20} height={20} />
                <span>123 Fashion Street, City, Country</span>
              </div>
              <div className={styles.contactItem}>
                <Image src="/icons/phone.svg" alt="Phone" width={20} height={20} />
                <span>+1 234 567 890</span>
              </div>
              <div className={styles.contactItem}>
                <Image src="/icons/mail.svg" alt="Email" width={20} height={20} />
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