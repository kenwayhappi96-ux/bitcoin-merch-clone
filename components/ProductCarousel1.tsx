import { useEffect, useMemo, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import ProductCard2 from "./ProductCard2"

function useItemsPerView() {
  const [items, setItems] = useState(1)

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth
      if (w >= 1280) setItems(5)
      else if (w >= 1024) setItems(4)
      else if (w >= 768) setItems(2)
      else setItems(1)
    }

    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  return items
}

export default function ProductCarousel1({ products }: { products: any[] }) {
  const itemsPerView = useItemsPerView()
  const [page, setPage] = useState(0)

  const pages = useMemo(() => {
    const res = []
    for (let i = 0; i < products.length; i += itemsPerView) {
      res.push(products.slice(i, i + itemsPerView))
    }
    return res
  }, [products, itemsPerView])

  const next = () =>
    setPage((p) => Math.min(p + 1, pages.length - 1))

  const prev = () =>
    setPage((p) => Math.max(p - 1, 0))

  return (
    <div className="w-full py-6">
      <div className="relative overflow-hidden">
        
        {/* TRACK */}
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${page * 100}%)` }}
        >
          {pages.map((group, i) => (
            <div
              key={i}
              className="w-full flex gap-6 px-4 shrink-0"
            >
              {group.map((product) => (
                <div
                  key={product.id}
                  className="flex-1 min-w-0 border border-orange-400 rounded-lg p-4"
                >
                  <ProductCard2 product={product} />
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* ARROWS */}
        {page > 0 && (
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-gray-200 hover:bg-gray-300 rounded-full p-2"
          >
            <ChevronLeft />
          </button>
        )}

        {page < pages.length - 1 && (
          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-200 hover:bg-gray-300 rounded-full p-2"
          >
            <ChevronRight />
          </button>
        )}
      </div>

      {/* INDICATORS */}
      <div className="flex justify-center gap-2 mt-6">
        {pages.map((_, i) => (
          <span
            key={i}
            className={`h-1.5 w-8 transition ${
              i === page ? "bg-black" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  )
}