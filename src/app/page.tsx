import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

import mainImage from "../../public/images/main.jpg";
import side1Image from "../../public/images/side-1.jpg";
import side2Image from "../../public/images/side-2.jpg";
import side3Image from "../../public/images/side-3.jpg";
import side4Image from "../../public/images/side-4.jpg";
import popular1Image from "../../public/images/popular/1.png";
import popular2Image from "../../public/images/popular/2.png";
import popular3Image from "../../public/images/popular/3.png";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.heroSideContainer}>
            <div className={styles.heroSideImage}>
              <Image
                src={side1Image}
                alt="Fashion Collection"
                width={400}
                height={600}
                priority
                quality={85}
                className={styles.image}
              />
            </div>
            <div className={styles.heroSideImage}>
              <Image
                src={side2Image}
                alt="Fashion Collection"
                width={400}
                height={600}
                priority
                quality={85}
                className={styles.image}
              />
            </div>
          </div>

          <div className={styles.heroMainImage}>
            <Image
              src={mainImage}
              alt="Fashion Collection"
              width={800}
              height={1200}
              priority
              quality={90}
              className={styles.image}
            />
            <div className={styles.heroContent}>
              <h1 className={styles.heroTitle}>SHARKTECH PREMIER 2024</h1>
              <Link href="/new" className={styles.heroButton}>ПРЕДЗАКАЗ</Link>
            </div>
          </div>

          <div className={styles.heroSideContainer}>
            <div className={styles.heroSideImage}>
              <Image
                src={side3Image}
                alt="Fashion Collection"
                width={400}
                height={600}
                priority
                quality={85}
                className={styles.image}
              />
            </div>
            <div className={styles.heroSideImage}>
              <Image
                src={side4Image}
                alt="Fashion Collection"
                width={400}
                height={600}
                priority
                quality={85}
                className={styles.image}
              />
            </div>
          </div>
        </section>

        <section>
          <h2 className={styles.sectionTitle}>ПОПУЛЯРНЫЕ КАТЕГОРИИ</h2>
          <div className={styles.categories}>
            <div className={styles.categoryCard}>
              <Image
                src={popular1Image}
                alt="Women's Collection"
                width={600}
                height={800}
                quality={85}
                className={styles.image}
              />
              <h3 className={styles.categoryTitle}>WOMEN</h3>
            </div>
            <div className={styles.categoryCard}>
              <Image
                src={popular2Image}
                alt="Men's Collection"
                width={600}
                height={800}
                quality={85}
                className={styles.image}
              />
              <h3 className={styles.categoryTitle}>MEN</h3>
            </div>
            <div className={styles.categoryCard}>
              <Image
                src={popular3Image}
                alt="Accessories Collection"
                width={600}
                height={800}
                quality={85}
                className={styles.image}
              />
              <h3 className={styles.categoryTitle}>ACCESSORIES</h3>
            </div>
          </div>
        </section>

        <section>
          <h2 className={styles.sectionTitle}>ОТЗЫВЫ КЛИЕНТОВ</h2>
          <div className={styles.reviews}>
            <div className={styles.reviewCard}>
              <div className={styles.reviewHeader}>
                <div className={styles.initialsAvatar}>
                  АМ
                </div>
                <div className={styles.reviewAuthor}>
                  <h3>Анна М.</h3>
                  <div className={styles.rating}>★★★★★</div>
                </div>
              </div>
              <p className={styles.reviewText}>
                "Исключительное качество! Это мой второй заказ, и я в полном восторге. 
                Отдельное спасибо за быструю доставку и профессиональную поддержку."
              </p>
              <span className={styles.reviewDate}>15 марта 2024</span>
            </div>

            <div className={styles.reviewCard}>
              <div className={styles.reviewHeader}>
                <div className={styles.initialsAvatar}>
                  МК
                </div>
                <div className={styles.reviewAuthor}>
                  <h3>Михаил К.</h3>
                  <div className={styles.rating}>★★★★★</div>
                </div>
              </div>
              <p className={styles.reviewText}>
                "Впечатлен уникальным дизайном и качеством исполнения. Сидит идеально, 
                как будто сшито на заказ. Обязательно порекомендую друзьям!"
              </p>
              <span className={styles.reviewDate}>10 марта 2024</span>
            </div>

            <div className={styles.reviewCard}>
              <div className={styles.reviewHeader}>
                <div className={styles.initialsAvatar}>
                  ЕС
                </div>
                <div className={styles.reviewAuthor}>
                  <h3>Елена С.</h3>
                  <div className={styles.rating}>★★★★★</div>
                </div>
              </div>
              <p className={styles.reviewText}>
                "Недавно открыла для себя этот бренд и уже влюбилась! Каждая вещь - 
                произведение искусства. Особенно впечатляет внимание к деталям."
              </p>
              <span className={styles.reviewDate}>5 марта 2024</span>
            </div>

            <div className={styles.reviewCard}>
              <div className={styles.reviewHeader}>
                <div className={styles.initialsAvatar}>
                  ДВ
                </div>
                <div className={styles.reviewAuthor}>
                  <h3>Дмитрий В.</h3>
                  <div className={styles.rating}>★★★★★</div>
                </div>
              </div>
              <p className={styles.reviewText}>
                "Превосходный сервис и потрясающая коллекция. Нашел здесь свой идеальный стиль. 
                Отдельная благодарность за упаковку - каждая деталь продумана!"
              </p>
              <span className={styles.reviewDate}>1 марта 2024</span>
            </div>
          </div>
        </section>

        <section className={styles.contactSection}>
          <div className={styles.contactContent}>
            <div className={styles.contactInfo}>
              <h2 className={styles.contactTitle}>СВЯЗАТЬСЯ С НАМИ</h2>
              <p className={styles.contactDescription}>
                Есть вопросы? Мы поможем вам найти ваш идеальный стиль.
              </p>
              
              <div className={styles.contactMethods}>
                <div className={styles.contactMethod}>
                  <div className={styles.contactIcon}>
                    <Image
                      src="/icons/phone.svg"
                      alt="Телефон"
                      width={24}
                      height={24}
                    />
                  </div>
                  <div>
                    <h3>Телефон</h3>
                    <p>+1 (888) 123-4567</p>
                    <p className={styles.workHours}>Пн-Вс: 10:00 - 22:00</p>
                  </div>
                </div>

                <div className={styles.contactMethod}>
                  <div className={styles.contactIcon}>
                    <Image
                      src="/icons/mail.svg"
                      alt="Email"
                      width={24}
                      height={24}
                    />
                  </div>
                  <div>
                    <h3>Email</h3>
                    <p>contact@sharktech.com</p>
                    <p className={styles.workHours}>Ответ в течение часа</p>
                  </div>
                </div>

                <div className={styles.contactMethod}>
                  <div className={styles.contactIcon}>
                    <Image
                      src="/icons/location.svg"
                      alt="Адрес"
                      width={24}
                      height={24}
                    />
                  </div>
                  <div>
                    <h3>Адрес</h3>
                    <p>123 Fashion Avenue, NYC</p>
                    <p className={styles.workHours}>Шоурум открыт ежедневно</p>
                  </div>
                </div>
              </div>

              <div className={styles.socialLinks}>
                <button className={styles.socialButton}>Telegram</button>
                <button className={styles.socialButton}>WhatsApp</button>
                <button className={styles.socialButton}>Instagram</button>
              </div>
            </div>

            <form className={styles.contactForm}>
              <div className={styles.formGroup}>
                <input 
                  type="text" 
                  placeholder="Ваше имя" 
                  className={styles.formInput}
                />
              </div>
              <div className={styles.formGroup}>
                <input 
                  type="email" 
                  placeholder="Email" 
                  className={styles.formInput}
                />
              </div>
              <div className={styles.formGroup}>
                <input 
                  type="tel" 
                  placeholder="Телефон" 
                  className={styles.formInput}
                />
              </div>
              <div className={styles.formGroup}>
                <textarea 
                  placeholder="Ваше сообщение" 
                  className={styles.formTextarea}
                  rows={4}
                ></textarea>
              </div>
              <button type="submit" className={styles.submitButton}>
                ОТПРАВИТЬ СООБЩЕНИЕ
              </button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}

