import Image from "next/image";
import Link from "next/link";

import { MochiGallery } from "@/components/home/MochiGallery";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <section className="relative px-4 pb-14 pt-6 sm:px-8 sm:pb-24 sm:pt-10">
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
            className="inline-flex min-h-11 items-center rounded-full border border-lavender-border bg-card/80 px-4 py-2.5 text-sm font-semibold text-plum transition hover:bg-lavender-hover sm:px-5"
          >
            Пройти тест <span aria-hidden="true">↗</span>
          </Link>
        </div>

        <div className="mx-auto grid max-w-6xl items-center gap-9 pt-10 sm:gap-12 sm:pt-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:pt-24">
          <div className="relative z-10 text-center lg:text-left">
            <span className="inline-flex items-center gap-2 rounded-full border border-lavender-border/70 bg-card/80 px-4 py-2 text-xs font-semibold tracking-wide text-plum-soft sm:text-sm">
              <span aria-hidden="true">🍡</span>
              Маленький тест о тебе
            </span>
            <h1 className="mx-auto mt-5 max-w-2xl text-4xl font-black leading-[1.08] tracking-tight text-plum sm:mt-6 sm:text-5xl md:text-6xl lg:mx-0">
              Какой ты
              <span className="block text-lavender-accent">моти?</span>
            </h1>
            <p className="mx-auto mt-5 max-w-lg text-base leading-7 text-plum-soft sm:mt-6 sm:text-lg sm:leading-8 lg:mx-0">
              Нежный снаружи, с характером внутри. Ответь на несколько вопросов
              и узнай, какой моти отражает именно тебя.
            </p>
            <div className="mt-7 flex flex-col items-center gap-3 sm:mt-8 sm:flex-row sm:justify-center sm:gap-4 lg:justify-start">
              <Link
                href="/quiz"
                className="inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-full bg-plum px-8 py-4 text-base font-bold text-white shadow-lg shadow-plum/15 transition hover:-translate-y-0.5 hover:bg-plum-soft sm:w-auto"
              >
                Пройти тест <span aria-hidden="true">♡</span>
              </Link>
              <a
                href="#mochi"
                className="inline-flex min-h-11 items-center justify-center px-5 py-3 text-sm font-semibold text-plum-soft transition hover:text-plum"
              >
                Познакомиться с моти ↓
              </a>
            </div>
            <p className="mt-5 text-xs font-medium text-plum-muted sm:mt-6">
              15 вопросов · 12 характеров · один ты
            </p>
          </div>

          <div className="relative mx-auto flex w-full max-w-md items-center justify-center">
            <div className="absolute inset-8 rounded-full bg-lavender/70 blur-3xl" />
            <div className="absolute left-4 top-10 h-16 w-16 rounded-full bg-cream/80 blur-xl sm:left-0" />
            <div className="absolute bottom-10 right-2 h-24 w-24 rounded-full bg-peach/70 blur-2xl" />
            <div className="relative aspect-square w-[min(78vw,390px)] overflow-hidden rounded-[2rem] border border-white/70 bg-card shadow-2xl shadow-plum/10 sm:w-[min(82vw,390px)] sm:rounded-[3rem]">
              <Image
                src="/images/mochi/strawberry.jpg"
                alt="Клубничный моти"
                fill
                priority
                sizes="(max-width: 640px) 78vw, 390px"
                className="object-cover"
              />
            </div>
            <div className="absolute left-0 top-6 rounded-2xl border border-white/80 bg-card/95 px-3 py-2.5 shadow-lg sm:-left-8 sm:top-14 sm:px-4 sm:py-3">
              <span className="block text-xs text-plum-muted">Твой характер</span>
              <span className="text-sm font-bold text-plum">Только твой ✨</span>
            </div>
            <div className="absolute -bottom-3 right-0 rounded-2xl border border-white/80 bg-card/95 px-3 py-2.5 shadow-lg sm:-right-5 sm:bottom-8 sm:px-4 sm:py-3">
              <span className="text-sm font-bold text-plum">Найди своего моти 💗</span>
            </div>
          </div>
        </div>
      </section>

      <section id="mochi" className="bg-card/65 px-4 py-14 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-lavender-accent sm:text-sm sm:tracking-[0.18em]">
              Наша маленькая компания
            </span>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-plum sm:text-4xl">
              12 моти — 12 характеров
            </h2>
            <p className="mt-4 text-sm leading-6 text-plum-soft sm:text-base sm:leading-7">
              Каждый особенный по-своему. Кто-то спокойный и рассудительный,
              кто-то яркий и непредсказуемый. А кто из них похож на тебя?
            </p>
          </div>

          <MochiGallery />

          <div className="mt-10 text-center sm:mt-16">
            <p className="mb-5 text-sm text-plum-soft">
              Кажется, ты уже кого-то присмотрел? 🍓
            </p>
            <Link
              href="/quiz"
              className="inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-full bg-plum px-8 py-4 text-base font-bold text-white shadow-lg shadow-plum/15 transition hover:-translate-y-0.5 hover:bg-plum-soft sm:w-auto"
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
