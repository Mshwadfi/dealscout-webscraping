import Carousel from "@/components/Carousel";
import ProductCard from "@/components/ProductCard";
import SearchBar from "@/components/SearchBar";
import { getAllProducts } from "@/lib/actions";
import Image from "next/image";

export default async function Home() {

  const allProducts = await getAllProducts();
  return (
    <>
      <section className="px-6 md:px-20 py-24">
        <div className="flex max-xl:flex-col gap-16">
          <div className="flex flex-col justify-center">
            <p className="text-[#8E0B0B] text-sm">
            Smart Shopping Starts Here: 
            <Image src={'/assets/icons/arrow-right.svg'}
              alt="arrow-rigth"
              height={14}
              width={14}
              className="inline mx-2"
              /> 
            </p>
            <h1 className="head-text">Your Ultimate Price <span className="text-primary">Companion</span></h1>
            <p className="mt-4">Discover unbeatable deals as we compare prices across top shopping sites just for you.</p>

            <SearchBar />
          </div>

          <Carousel />
          
        </div>
      </section>

      <section className="trending-section">
        <h2 className="section-text">Trending</h2>
        <div className="flex flex-wrap gap-x-8 gap-y-16">
          {allProducts?.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
}
