'use client'

import Pagination from '@/components/Pagination';
import { videoGuides } from '@/lib/constants'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react';

const ITEMS_PER_PAGE = 4;

export default function VideoGuidesPage() {

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(videoGuides.length / ITEMS_PER_PAGE);

  const paginatedVideos = videoGuides.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );


  return (
    <main className="min-h-screen bg-white py-12 px-10 w-full overflow-hidden">
      <div className='flex flex-col gap-8'>
        <span className="text-3xl md:text-4xl font-bold text-black! review">Guides</span>

        <div className='flex flex-col gap-6'>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {paginatedVideos.map((video) => (
              <Link href={video.link} key={video.id} className="bg-white overflow-hidden cursor-pointer review">
                <div className="p-4 mb-4">
                  <div className='flex flex-col gap-1 mb-4'>
                    <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 hover:text-[#fd9619]">{video.title}</h3>
                    <span className='text-xs text-black!'>Jan 27, 2025</span>
                  </div>
                  <p className="text-gray-600 text-left! text-sm line-clamp-2 whitespace-normal">{video.description}</p>
                </div>
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={'/ref/logo.png'}
                    alt={video.title}
                    fill
                    className="object-cover w-full hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </main>
  )
}
