"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import Link from "next/link";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import router from "next/router";

export default function BannerSlider() {
  const slides = [
    {
      image: "/banner1.jpg",
      title: "Bem-vindo ao Portal da SAP",
      subtitle: "Aceda a informacoes Uteis da Sociedade",
      button: "Logar para informacoes Personalizadas",
    },
    {
      image: "/banner2.jpg",
      title: "Webinar SAP 12 de Marco de 2026",
      subtitle: "Webinar SAP 12 de Marco de 2026 - Descubra as Novidades",
      button: "click para mais detalhes",
    },
    {
      image: "/banner4.jpeg",
      title: "Dia Internacional da Mulher",
      subtitle: "Dia Internacional da Mulher",
      button: "Explorar",
    },
  ];

  return (
    <div className="w-full h-screen">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        effect="fade"
        loop
        className="h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-screen">
              {/* Background Image */}
              <img
                src={slide.image}
                className="absolute w-full h-full object-cover"
              />

              {/* Overlay escuro estilo Netflix */}
              {/*<div className="absolute inset-0 bg-black/50"></div>*/}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

              {/* Content */}
              <div className="relative z-10 flex flex-col justify-center h-full max-w-6xl mx-auto px-8 text-white">
                <h1 className="text-5xl md:text-6xl font-bold mb-6">
                  {slide.title}
                </h1>

                <p className="text-xl md:text-2xl mb-8 max-w-2xl">
                  {slide.subtitle}
                </p>

                {/* <button className="bg-red-600 hover:bg-red-700 w-fit px-8 py-4 text-lg rounded-lg transition">
                  {slide.button}
                </button> */}
                {/* <button
                  onClick={() => router.push("/activities/act1")}
                  className="bg-red-600 hover:bg-red-700 px-8 py-4 rounded-lg"
                >
                  {slide.button}
                </button> */}

                <Link href="/activities/act1">
                  <button className="bg-red-600 hover:bg-red-700 px-8 py-4 rounded-lg">
                    {slide.button}
                  </button>
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
