"use client";

import { FormEvent, useEffect, useState } from "react";

type AccountingPlan = {
  title: string;
  note?: string;
  headers: [string, string];
  rows: [string, string][];
  footnote?: string;
};

const services = [
  "Бухгалтерський супровід та консультування з питань обліку",
  "Організація та ведення управлінської звітності",
  "Консультування з питань огранізації процесів та побудови фінансової моделі бізнесу",
];

const experience = [
  "Фінансових компаній",
  "FinTech та ІТ компаній",
  "Корпоративних клієнтів",
  "Компаній роздрібної торгівлі та промислового виробництва",
];

const expertise = [
  ["15+", "Операцій з авторським правом"],
  ["10+", "Платіжних рішень (Україна, Європа)"],
  ["5+", "Startup проектів"],
];

const consultancyPlans = [
  {
    name: "start",
    price: "$99",
    description: [
      "Для маленьких але відважних",
      "Базове обслуговування під ключ",
    ],
  },
  {
    name: "basic",
    price: "$199",
    description: [
      "Для тих, хто хоче змінити світ",
      "Базове обслуговування під ключ",
      "Розрахунок основных показників фінансового стану",
    ],
  },
  {
    name: "premium",
    price: "$299",
    description: [
      "Для тих, хто прагне більшого",
      "Базове обслуговування під ключ",
      "Створення додаткових управлінських звітів",
      "Проведення аналізу звітності та фінансового стану",
    ],
  },
];

const accountingFootnote =
  "*За наявності у штаті понад 5 одиниць нарахування заробітної плати та ведення кадрового обліку оплачується окремо з розрахунку 1000,00 грн. за кожні наступні 5 штатних одиниці.";

const accountingPlans: AccountingPlan[] = [
  {
    title:
      "Юридична особа на загальній системі оподаткування та платник ПДВ",
    note: "Кількість працівників до 5 осіб включно",
    headers: ["Кількість операцій, шт./міс", "Вартість, грн./міс.*"],
    rows: [
      ["1-10", "3000.00"],
      ["11-50", "5000.00"],
      ["51-100", "7000.00"],
      ["101-150", "8000.00"],
      ["150+", "За домовленістю"],
      ["Відсутність операцій", "1500,00"],
    ],
    footnote: accountingFootnote,
  },
  {
    title: "Юридична особа платник єдиного податку та платник ПДВ",
    headers: ["Кількість операцій, шт./міс", "Вартість, грн./міс.*"],
    rows: [
      ["1-10", "3000.00"],
      ["11-50", "5000.00"],
      ["51-100", "7000.00"],
      ["101+", "За домовленістю"],
      ["Відсутність операцій", "1500,00"],
    ],
    footnote: accountingFootnote,
  },
  {
    title:
      "Юридична особа на загальній системі оподаткування не платник ПДВ",
    headers: ["Кількість операцій, шт./міс", "Вартість, грн./міс.*"],
    rows: [
      ["1-20", "2000.00"],
      ["21-50", "2500.00"],
      ["51-100", "3000.00"],
      ["101+", "За домовленістю"],
      ["Відсутність операцій", "500,00"],
    ],
    footnote: accountingFootnote,
  },
  {
    title: "Юридична особа платник єдиного податку не платник ПДВ",
    headers: ["Кількість операцій, шт./міс", "Вартість, грн./міс.*"],
    rows: [
      ["1-20", "2000.00"],
      ["21-50", "4000.00"],
      ["51-100", "6000.00"],
      ["Відсутність операцій", "500,00"],
    ],
    footnote: accountingFootnote,
  },
  {
    title: "Фізична особа підприємець",
    headers: ["Група платника єдиного податку", "Вартість, грн./міс.*"],
    rows: [
      ["1-3 група без найманих працівників", "500.00"],
      ["2-3 група з найманими працівниками", "1500.00"],
      ["Будь яка група за відсутності операцій", "500.00"],
    ],
  },
];

const processSteps = [
  "Ми Вас вислуховуємо",
  "Ми аналізуємо і оцінюємо обʼєм послуг та їх вартість",
  "Обговорюємо всі деталі і описуємо порядок надання послуг",
  "Підписуємо договір",
];

function sendMail(subject: string, body: string) {
  window.location.href = `mailto:fin.serv.ua@gmail.com?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activePlan, setActivePlan] = useState<string | null>(null);
  const [openAccounting, setOpenAccounting] = useState(0);

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setActivePlan(null);
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const submitContact = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    sendMail(
      "Звернення з сайту FinServ",
      `Імʼя: ${data.get("name")}\nEmail: ${data.get("email")}\n\n${data.get(
        "message",
      )}`,
    );
  };

  const submitOrder = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    sendMail(
      `Замовлення пакета ${activePlan}`,
      `Пакет: ${activePlan}\nІмʼя: ${data.get("name")}\nТелефон: ${data.get(
        "phone",
      )}\nEmail: ${data.get("email")}`,
    );
  };

  return (
    <>
      <header className="site-header">
        <div className="header-inner">
          <a className="brand" href="#top" aria-label="FinServ — на початок">
            <img src="/assets/logo.svg" alt="FinServ" />
          </a>

          <nav className="desktop-nav" aria-label="Основна навігація">
            <a href="#works">Наші послуги</a>
            <a href="#consultancy">Вартість обслуговування</a>
            <a href="#contacts">Контакти</a>
          </nav>

          <div className="header-actions">
            <button
              className="menu-button"
              type="button"
              aria-label={menuOpen ? "Закрити меню" : "Відкрити меню"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((value) => !value)}
            >
              <span />
              <span />
              <span />
            </button>
            <a
              className="social-button viber"
              href="viber://chat?number=+380502077912"
              aria-label="Viber"
            />
            <a
              className="social-button telegram"
              href="https://t.me/fin.serv"
              target="_blank"
              rel="noreferrer"
              aria-label="Telegram"
            />
            <a className="phone-button" href="tel:+380733230393">
              <span className="phone-desktop">+380 (73) 323-03-93</span>
              <span className="phone-mobile">073 323 03 93</span>
            </a>
          </div>
        </div>

        <div className={`mobile-nav ${menuOpen ? "is-open" : ""}`}>
          <nav aria-label="Мобільна навігація">
            <a href="#works" onClick={closeMenu}>
              Наші послуги
            </a>
            <a href="#consultancy" onClick={closeMenu}>
              Вартість обслуговування
            </a>
            <a href="#contacts" onClick={closeMenu}>
              Контакти
            </a>
          </nav>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="section-inner hero-grid">
            <div className="hero-copy reveal-left" data-reveal>
              <h1>FIN.SERV</h1>
              <p>
                Сервіс для сучасного бізнесу,
                <br />
                який допомагає налагодити облік
              </p>
              <img className="tags" src="/assets/tegi.svg" alt="" />
              <a className="primary-button" href="#consultancy">
                Тарифи <span aria-hidden="true">›</span>
              </a>
            </div>
            <img
              className="hero-illustration"
              src="/assets/hero-illustration.svg"
              alt=""
            />
          </div>
        </section>

        <section className="services" id="works">
          <div className="section-inner services-grid">
            <div className="services-card reveal-left" data-reveal>
              <h2>Наші послуги</h2>
              <ul>
                {services.map((service) => (
                  <li key={service}>{service}</li>
                ))}
              </ul>
            </div>
            <div className="services-logos-wrap" aria-hidden="true">
              <img className="services-logos" src="/assets/logos.png" alt="" />
              <span className="diia-city-card">
                <img src="/assets/diia-city.png" alt="" />
              </span>
            </div>
          </div>
        </section>

        <section className="experience">
          <div className="section-inner experience-grid">
            <img
              className="section-illustration"
              src="/assets/experience-illustration.svg"
              alt=""
            />
            <div className="experience-copy reveal-right" data-reveal>
              <h2>Досвід в обслуговуванні</h2>
              <div className="experience-list">
                {experience.map((item, index) => (
                  <div className="experience-item" key={item}>
                    <img
                      src={`/assets/experience-icon-${index + 1}.svg`}
                      alt=""
                    />
                    <h3>{item}</h3>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="expertise">
          <div className="section-inner reveal-fade" data-reveal>
            <h2>Експертні знання в галузі</h2>
            <div className="expertise-grid">
              {expertise.map(([value, title]) => (
                <div className="expertise-card" key={title}>
                  <div className="expertise-value">
                    {value} <span>років</span>
                  </div>
                  <h3>{title}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="consultancy" id="consultancy">
          <div className="section-inner">
            <h2>Вартість консультування</h2>
            <div className="consultancy-grid">
              {consultancyPlans.map((plan, index) => (
                <article
                  className="consultancy-card reveal-left"
                  data-reveal
                  style={{ transitionDelay: `${index * 0.15}s` }}
                  key={plan.name}
                >
                  <h3>{plan.name}</h3>
                  <div className="consultancy-body">
                    <div className="consultancy-description">
                      {plan.description.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                    <p className="consultancy-price">
                      <strong>{plan.price}</strong> per month
                    </p>
                    <button
                      className="primary-button"
                      type="button"
                      onClick={() => setActivePlan(plan.name)}
                    >
                      Замовити <span aria-hidden="true">›</span>
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bookkeeping" id="bookkeeping">
          <div className="section-inner">
            <h2>Вартість ведення бухгалтерського обліку</h2>
            <div className="accordion reveal-up" data-reveal>
              {accountingPlans.map((plan, index) => {
                const isOpen = openAccounting === index;
                return (
                  <article className={`accordion-item ${isOpen ? "is-open" : ""}`} key={plan.title}>
                    <h3>
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={`accounting-panel-${index}`}
                        onClick={() => setOpenAccounting(isOpen ? -1 : index)}
                      >
                        <span>{plan.title}</span>
                        <span className="chevron" aria-hidden="true" />
                      </button>
                    </h3>
                    <div
                      className="accordion-panel"
                      id={`accounting-panel-${index}`}
                      hidden={!isOpen}
                    >
                      {plan.note && <p className="accounting-note">{plan.note}</p>}
                      <table>
                        <thead>
                          <tr>
                            <th>{plan.headers[0]}</th>
                            <th>{plan.headers[1]}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {plan.rows.map(([label, price]) => (
                            <tr key={`${label}-${price}`}>
                              <td>{label}</td>
                              <td>{price}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      {plan.footnote && (
                        <p className="accounting-footnote">{plan.footnote}</p>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="process" id="accounting">
          <div className="section-inner process-grid">
            <img
              className="section-illustration"
              src="/assets/process-illustration.svg"
              alt=""
            />
            <div className="process-copy reveal-right" data-reveal>
              <h2>Як це працює</h2>
              <ul>
                {processSteps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="about" id="about">
          <div className="section-inner about-grid">
            <div className="about-copy reveal-left" data-reveal>
              <h2>Про компанію</h2>
              <p>
                Компанія Finserv надає фінансові послуги для бізнесу в Україні.
                Ми розуміємо як великий так і малий бізнес та допомагаємо своїм
                клієнтам в організації та супроводі бізнесу на всіх етапах
                більше 15 років.
              </p>
              <p>
                Беремо на себе побудову всіх необхідних процесів для
                впровадження максимально ефективного рішення з організації
                бухгалтерського та управлінського обліку. Співпраця з нами
                дозволить вам не перейматися рутинними питаннями та зекономити
                час для розвитку свого бізнесу.
              </p>
            </div>
            <img className="about-illustration" src="/assets/hamel.svg" alt="" />
          </div>
        </section>

        <section className="contacts" id="contacts">
          <div className="contacts-panel">
            <img className="contact-icon" src="/assets/contact-icon.png" alt="" />
            <div className="contact-copy reveal-right" data-reveal>
              <h2>Поговоримо?</h2>
              <a href="mailto:fin.serv.ua@gmail.com">fin.serv.ua@gmail.com</a>
              <h2>Напишіть нам</h2>
              <form className="contact-form" onSubmit={submitContact}>
                <label>
                  <span className="sr-only">Ваше імʼя</span>
                  <input name="name" type="text" placeholder="Ваше ім'я" required />
                </label>
                <label>
                  <span className="sr-only">Ваш email</span>
                  <input name="email" type="email" placeholder="Ваш email" required />
                </label>
                <label>
                  <span className="sr-only">Питання</span>
                  <textarea name="message" placeholder="Питання" required />
                </label>
                <button className="primary-button contact-submit" type="submit">
                  Відправити
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="section-inner footer-inner">
          <img src="/assets/logo-footer.svg" alt="FinServ" />
          <p>Усі права захищенні (с) FinServ, 2021</p>
        </div>
      </footer>

      <a className="back-to-top" href="#top" aria-label="Наверх">
        ⌃
      </a>

      {activePlan && (
        <div className="modal-backdrop" onMouseDown={() => setActivePlan(null)}>
          <div
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="order-modal-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              className="modal-close"
              type="button"
              aria-label="Закрити"
              onClick={() => setActivePlan(null)}
            >
              ×
            </button>
            <h2 id="order-modal-title">Пакет {activePlan}</h2>
            <form className="order-form" onSubmit={submitOrder}>
              <input name="name" type="text" placeholder="Ваше ім'я" required />
              <input name="phone" type="tel" placeholder="Ваш телефон" required />
              <input name="email" type="email" placeholder="Ваш email" required />
              <button className="primary-button" type="submit">
                Замовити
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
