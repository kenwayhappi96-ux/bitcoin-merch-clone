'use client'

import { reviews } from '@/lib/constants';
import { ArrowRight, CheckCircle, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react'

const ReviewsCarousel = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollButtons = () => {
    const el = scrollRef.current;
    if (!el) return;

    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 5);
  };

  const scroll = (direction:any) => {
    const el = scrollRef.current;
    if (!el) return;

    const scrollAmount = 360;
    el.scrollBy({
      left: direction === "right" ? scrollAmount*2.75 : -scrollAmount*2.75,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    updateScrollButtons();
  }, []);

  return (
    <div className="w-full flex items-center gap-6 overflow-hidden">
      
      {/* LEFT ARROW */}
      <button
        onClick={() => scroll("left")}
        disabled={!canScrollLeft}
        className={`p-3 rounded-full transition
          ${canScrollLeft ? " hover:bg-blue-200" : "opacity-40 cursor-not-allowed"}
        `}
      >
        <ArrowRight className={`w-5 h-5 rotate-180 border rounded-full transition ${canScrollLeft ? 'text-black border-black':'text-black border-gray-400'}`} />
      </button>

      {/* CAROUSEL */}
      <div
        ref={scrollRef}
        onScroll={updateScrollButtons}
        className="relative h-full w-1210 overflow-hidden whitespace-nowrap will-change-transform [transition-timing-function: ease;]"
      >
        {reviews.map((review, idx) => (
          <div
            key={idx}
            className="relative max-w-76.75 inline-block h-27.5 mr-3.75 mb-2.5 pb-5 whitespace-normal [vertical-align: top;]"
          >
            {/* Stars + Verified */}
            <div className="flex items-center gap-4">
                <div className='block mb-3 mx-0 mt-0 w-24.75'>
                    <div className="relative h-0 w-full pb-[18%] px-0 pt-0">
                        <svg role="img" viewBox="0 0 251 46" width={251} height={46} xmlns="http://www.w3.org/2000/svg" className="h-3 sm:h-4 md:h-5 w-auto block">
                            <title id="starRating" lang="en-US">4.4 out of 5 star rating on Trustpilot</title>
                            <g className="tp-star">
                                <path className="tp-star__canvas" fill="#00b67a" d="M0 46.330002h46.375586V0H0z"></path>
                                <path className="tp-star__shape" d="M39.533936 19.711433L13.230239 38.80065l3.838216-11.797827L7.02115 19.711433h12.418975l3.837417-11.798624 3.837418 11.798624h12.418975zM23.2785 31.510075l7.183595-1.509576 2.862114 8.800152L23.2785 31.510075z" fill="#FFF"></path>
                            </g>
                            <g className="tp-star">
                                <path className="tp-star__canvas" fill="#00b67a" d="M51.24816 46.330002h46.375587V0H51.248161z"></path>
                                <path className="tp-star__canvas--half" fill="#00b67a" d="M51.24816 46.330002h23.187793V0H51.248161z"></path>
                                <path className="tp-star__shape" d="M74.990978 31.32991L81.150908 30 84 39l-9.660206-7.202786L64.30279 39l3.895636-11.840666L58 19.841466h12.605577L74.499595 8l3.895637 11.841466H91L74.990978 31.329909z" fill="#FFF"></path>
                            </g>
                            <g className="tp-star">
                                <path className="tp-star__canvas" fill="#00b67a" d="M102.532209 46.330002h46.375586V0h-46.375586z"></path>
                                <path className="tp-star__canvas--half" fill="#00b67a" d="M102.532209 46.330002h23.187793V0h-23.187793z"></path>
                                <path className="tp-star__shape" d="M142.066994 19.711433L115.763298 38.80065l3.838215-11.797827-10.047304-7.291391h12.418975l3.837418-11.798624 3.837417 11.798624h12.418975zM125.81156 31.510075l7.183595-1.509576 2.862113 8.800152-10.045708-7.290576z" fill="#FFF"></path>
                            </g>
                            <g className="tp-star">
                                <path className="tp-star__canvas" fill="#00b67a" d="M153.815458 46.330002h46.375586V0h-46.375586z"></path>
                                <path className="tp-star__canvas--half" fill="#00b67a" d="M153.815458 46.330002h23.187793V0h-23.187793z"></path>
                                <path className="tp-star__shape" d="M193.348355 19.711433L167.045457 38.80065l3.837417-11.797827-10.047303-7.291391h12.418974l3.837418-11.798624 3.837418 11.798624h12.418974zM177.09292 31.510075l7.183595-1.509576 2.862114 8.800152-10.045709-7.290576z" fill="#FFF"></path>
                            </g>
                            <g className="tp-star">
                                <path className="tp-star__canvas" fill="#00b67a" d="M205.064416 46.330002h46.375587V0h-46.375587z"></path>
                                <path className="tp-star__canvas--half" fill="#00b67a" d="M205.064416 46.330002h23.187793V0h-23.187793z"></path>
                                <path className="tp-star__shape" d="M244.597022 19.711433l-26.3029 19.089218 3.837419-11.797827-10.047304-7.291391h12.418974l3.837418-11.798624 3.837418 11.798624h12.418975zm-16.255436 11.798642l7.183595-1.509576 2.862114 8.800152-10.045709-7.290576z" fill="#FFF"></path>
                            </g>
                            </svg>
                    </div>
                </div>

              {review.isVerified && 
              <span className="inline-flex gap-1 text-sm text-gray-600">
                <CheckCircle2 className="w-4 h-4 text-gray-600" />
                Verified
              </span>
              }
            </div>

              <Link href={'/'} className='review'>
                {/* Title */}
                <h3 className="font-semibold text-sm text-left! text-gray-900 mb-1">
                {review.title}
                </h3>

                {/* Text */}
                <p className="text-xs text-left! text-gray-700 mb-2">
                {review.text}
                </p>

                {/* Author */}
                <p className="text-xs text-left! text-gray-500">
                <span className='font-semibold'>{review.author}</span>, {review.date}
                </p>
              </Link>
          </div>
        ))}
      </div>

      {/* RIGHT ARROW */}
      <button
        onClick={() => scroll("right")}
        disabled={!canScrollRight}
        className={`p-3 rounded-full transition
          ${canScrollRight ? " hover:bg-blue-200" : "opacity-40 cursor-not-allowed"}
        `}
      >
        <ArrowRight className={`w-5 h-5 border rounded-full transition ${canScrollRight ? 'text-black border-black':'text-black border-gray-400'}`}/>
      </button>
    </div>
  );
};


export default ReviewsCarousel
