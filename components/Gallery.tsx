'use client';
import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

const images = [
  { src: '/images/img1.png', alt: 'Gallery Image 1' },
  { src: '/images/img2.png', alt: 'Gallery Image 2' },
  { src: '/images/img3.png', alt: 'Gallery Image 3' },
  { src: '/images/img4.png', alt: 'Gallery Image 4' },
];

export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const prev = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length));
  }, []);

  const next = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i + 1) % images.length));
  }, []);

  const close = useCallback(() => setLightboxIndex(null), []);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft')  prev();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'Escape')     close();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxIndex, prev, next, close]);

  return (
    <section className="py-0">
      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
        {images.map((img, idx) => (
          <div
            key={img.src}
            className="relative overflow-hidden cursor-pointer group aspect-square"
            onClick={() => setLightboxIndex(idx)}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
              <svg className="w-10 h-10 text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"/>
              </svg>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 bg-black/92 z-50 flex flex-col"
          onClick={close}
        >
          {/* Top bar */}
          <div
            className="flex items-center justify-between px-5 py-3 shrink-0"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="text-white/80 text-[15px] font-medium">
              {lightboxIndex + 1} / {images.length}
            </span>
            <button
              onClick={close}
              className="text-white/70 hover:text-white transition-colors"
              aria-label="Close"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Main image row: prev arrow | side strip | image | side strip | next arrow */}
          <div
            className="flex flex-1 items-center overflow-hidden min-h-0"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Prev arrow */}
            <button
              onClick={prev}
              className="shrink-0 text-white/70 hover:text-white transition-colors px-3 md:px-6"
              aria-label="Previous image"
            >
              <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Previous image strip */}
            <div className="hidden md:block shrink-0 w-[16%] h-full relative opacity-30 overflow-hidden">
              <Image
                src={images[(lightboxIndex - 1 + images.length) % images.length].src}
                alt="prev"
                fill
                className="object-cover"
              />
            </div>

            {/* Focused center image */}
            <div className="flex-1 relative h-full flex items-center justify-center px-2">
              <div className="relative w-full h-full">
                <Image
                  key={lightboxIndex}
                  src={images[lightboxIndex].src}
                  alt={images[lightboxIndex].alt}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            {/* Next image strip */}
            <div className="hidden md:block shrink-0 w-[16%] h-full relative opacity-30 overflow-hidden">
              <Image
                src={images[(lightboxIndex + 1) % images.length].src}
                alt="next"
                fill
                className="object-cover"
              />
            </div>

            {/* Next arrow */}
            <button
              onClick={next}
              className="shrink-0 text-white/70 hover:text-white transition-colors px-3 md:px-6"
              aria-label="Next image"
            >
              <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Thumbnail strip */}
          <div
            className="shrink-0 flex gap-2 justify-center px-4 py-3"
            onClick={(e) => e.stopPropagation()}
          >
            {images.map((img, idx) => (
              <button
                key={img.src}
                onClick={() => setLightboxIndex(idx)}
                className={`relative w-14 h-12 md:w-20 md:h-14 overflow-hidden border-2 transition-all duration-200 ${
                  idx === lightboxIndex
                    ? 'border-white opacity-100'
                    : 'border-transparent opacity-45 hover:opacity-75'
                }`}
              >
                <Image src={img.src} alt={img.alt} fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
