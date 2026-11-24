import Image from "next/image";
import Link from "next/link";

import { mochiProfiles } from "@/data/mochi";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <section className="relative px-5 pb-16 pt-8 sm:px-8 sm:pb-24 sm:pt-10">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Link
            href="/"
            className="text-xl font-extrabold tracking-tight text-plum"
            aria-label="Моти — главная"
          >
            mochi<span className="text-lavender-accent">.</span>
          </Link>
          <Link
            href="/quiz"
            className="rounded-full border border-lavender-border bg-card/80 px-5 py-2.5 text-sm font-semibold text-plum transition hover:bg-lavender-hover"
          >
            Пройти тест <span aria-hidden="true">↗</span>
          </Link>
        </div>

        <div className="mx-auto grid max-w-6xl items-center gap-12 pt-14 sm:pt-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:pt-24">
          <div className="relative z-10 text-center lg:text-left">
            <span className="inline-flex items-center gap-2 rounded-full border border-lavender-border/70 bg-card/80 px-4 py-2 text-xs font-semibold tracking-wide text-plum-soft sm:text-sm">
              <span aria-hidden="true">🍡</span>
              Маленький тест о тебе
            </span>
            <h1 className="mx-auto mt-6 max-w-2xl text-4xl font-black leading-[1.08] tracking-tight text-plum sm:text-5xl md:text-6xl lg:mx-0">
              Какой ты
              <span className="block text-lavender-accent">моти?</span>
            </h1>
            <p className="mx-auto mt-6 max-w-lg text-base leading-7 text-plum-soft sm:text-lg sm:leading-8 lg:mx-0">
              Нежный снаружи, с характером внутри. Ответь на несколько вопросов
              и узнай, какой моти отражает именно тебя.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <Link
                href="/quiz"
                className="inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-full bg-plum px-8 py-4 text-base font-bold text-white shadow-lg shadow-plum/15 transition hover:-translate-y-0.5 hover:bg-plum-soft sm:w-auto"
              >
                Пройти тест <span aria-hidden="true">♡</span>
              </Link>
              <a
                href="#mochi"
                className="px-5 py-3 text-sm font-semibold text-plum-soft transition hover:text-plum"
              >
                Познакомиться с моти ↓
              </a>
            </div>
            <p className="mt-6 text-xs font-medium text-plum-muted">
              15 вопросов · 12 характеров · один ты
            </p>
          </div>

          <div className="relative mx-auto flex w-full max-w-md items-center justify-center">
            <div className="absolute inset-8 rounded-full bg-lavender/70 blur-3xl" />
            <div className="absolute left-4 top-10 h-16 w-16 rounded-full bg-cream/80 blur-xl sm:left-0" />
            <div className="absolute bottom-10 right-2 h-24 w-24 rounded-full bg-peach/70 blur-2xl" />
            <div className="relative aspect-square w-[min(82vw,390px)] overflow-hidden rounded-[2.5rem] border border-white/70 bg-card shadow-2xl shadow-plum/10 sm:rounded-[3rem]">
              <Image
                src="/images/mochi/strawberry.jpg"
                alt="Клубничный моти"
                fill
                priority
                sizes="(max-width: 640px) 82vw, 390px"
                className="object-cover"
              />
            </div>
            <div className="absolute -left-1 top-8 rounded-2xl border border-white/80 bg-card/95 px-4 py-3 shadow-lg sm:-left-8 sm:top-14">
              <span className="block text-xs text-plum-muted">Твой характер</span>
              <span className="text-sm font-bold text-plum">Только твой ✨</span>
            </div>
            <div className="absolute -bottom-3 right-0 rounded-2xl border border-white/80 bg-card/95 px-4 py-3 shadow-lg sm:-right-5 sm:bottom-8">
              <span className="text-sm font-bold text-plum">Найди своего моти 💗</span>
            </div>
          </div>
        </div>
      </section>

      <section id="mochi" className="bg-card/65 px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-bold uppercase tracking-[0.18em] text-lavender-accent">
              Наша маленькая компания
            </span>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-plum sm:text-4xl">
              12 моти — 12 характеров
            </h2>
            <p className="mt-4 text-base leading-7 text-plum-soft">
              Каждый особенный по-своему. Кто-то спокойный и рассудительный,
              кто-то яркий и непредсказуемый. А кто из них похож на тебя?
            </p>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 sm:mt-14 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
            {mochiProfiles.map((mochi) => (
              <article
                key={mochi.id}
                className="group overflow-hidden rounded-3xl border border-lavender-border/50 bg-card shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-plum/5"
              >
                <div className="relative aspect-square overflow-hidden bg-lavender/30">
                  <Image
                    src={mochi.image}
                    alt={mochi.name}
                    fill
                    sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 240px"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-4 sm:p-5">
                  <h3 className="text-sm font-extrabold text-plum sm:text-base">
                    {mochi.name}
                  </h3>
                  <p className="mt-1 text-xs font-semibold text-lavender-accent sm:text-sm">
                    {mochi.archetype}
                  </p>
                  {/* <p className="mt-3 text-xs leading-5 text-plum-soft sm:text-sm sm:leading-6">
                    {mochi.description}
                  </p> */}
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 text-center sm:mt-16">
            <p className="mb-5 text-sm text-plum-soft">
              Кажется, ты уже кого-то присмотрел? 🍓
            </p>
            <Link
              href="/quiz"
              className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-plum px-8 py-4 text-base font-bold text-white shadow-lg shadow-plum/15 transition hover:-translate-y-0.5 hover:bg-plum-soft"
            >
              Узнать своего моти <span aria-hidden="true">♡</span>
            </Link>
          </div>
        </div>
      </section>

      <footer className="px-5 py-8 text-center text-xs font-medium text-plum-muted">
        Сделано с нежностью и щепоткой рисовой муки 🍡
      </footer>
    </main>
  );
}
