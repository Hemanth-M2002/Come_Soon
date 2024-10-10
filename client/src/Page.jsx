import React, { useState } from 'react';
import { ShoppingCart, Menu, Facebook, Twitter, Instagram } from 'lucide-react';
import Image1 from './images/image1.jpg';
import Image2 from './images/image2.jpg';
import Image3 from './images/image3.jpg';
import Image4 from './images/image4.jpg';
import Image5 from './images/image5.jpg';
import Image6 from './images/image6.jpg';
import Image7 from './images/image7.jpg';
import Image8 from './images/image8.jpg';
import Image9 from './images/image9.jpg';
import Image10 from './images/image10.jpg';
import Image11 from './images/image11.jpg';
import Image12 from './images/image12.jpg';
import Image13 from './images/image13.jpg';
import Image14 from './images/image14.jpg';

export default function Page() {
  const [hoveredProduct, setHoveredProduct] = useState(null);

  const products = [
    {
      name: 'Leather Jacket',
      price: '$129.99',
      image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/handsome-man-leather-jacket_144627-3574-pJH94ZeUfJn0Em1adBGJQKn9s5Vaml.jpg',
      hoverImage: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BBGJ-1121-01-SL_1-L0RyPgmlrcSbmQwtiinM4tSSrwZsln.webp',
    },
    {
      name: 'Summer Outfit',
      price: '$79.99',
      image: Image1,
      hoverImage: Image2,
    },
    {
      name: 'Casual Shirt',
      price: '$49.99',
      image: Image3,
      hoverImage: Image4,
    },
    {
      name: 'Denim Set',
      price: '$89.99',
      image: Image5,
      hoverImage: Image6,
    },
    {
      name: 'Leather Jacket',
      price: '$129.99',
      image: Image7,
      hoverImage: Image8,
    },
    {
      name: 'Summer Outfit',
      price: '$79.99',
      image: Image9,
      hoverImage: Image10,
    },
    {
      name: 'Casual Shirt',
      price: '$49.99',
      image: Image11,
      hoverImage: Image12,
    },
    {
      name: 'Denim Set',
      price: '$89.99',
      image: Image13,
      hoverImage: Image14,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <a href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold">StyleHub</span>
          </a>
          {/* Main Navigation */}
          <nav className="hidden md:flex ml-auto space-x-4">
            <a className="text-sm font-medium hover:underline underline-offset-4" href="#">
              Home
            </a>
            <a className="text-sm font-medium hover:underline underline-offset-4" href="#">
              Shop
            </a>
            <a className="text-sm font-medium hover:underline underline-offset-4" href="#">
              About
            </a>
            <a className="text-sm font-medium hover:underline underline-offset-4" href="#">
              Contact
            </a>
          </nav>
          {/* Cart & Menu */}
          <div className="flex items-center space-x-4 ml-auto md:ml-4">
            <button className="bg-transparent border-none p-2">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Shopping Cart</span>
            </button>
            <button className="md:hidden bg-transparent border-none p-2">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-black">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white">
                  Welcome to StyleHub
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl">
                  Discover the latest trends in fashion. Shop our curated collection of stylish clothing and accessories.
                </p>
              </div>
              <div className="space-x-4">
                <button className="bg-white text-black hover:bg-gray-200 px-4 py-2 rounded">
                  Shop Now
                </button>
                <button className="border border-white text-white hover:bg-white hover:text-black px-4 py-2 rounded">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              Featured Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product, index) => (
                <div
                  key={index}
                  className="rounded-lg overflow-hidden shadow-lg bg-white"
                  onMouseEnter={() => setHoveredProduct(index)}
                  onMouseLeave={() => setHoveredProduct(null)}
                >
                  <div className="relative w-full h-[400px]">
                    <img
                      src={hoveredProduct === index ? product.hoverImage : product.image}
                      alt={product.name}
                      className="object-cover w-full h-full transition-opacity duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <p className="text-gray-600">{product.price}</p>
                    <button className="w-full mt-4 bg-blue-500 text-white p-2 rounded">
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Subscribe to Our Newsletter
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Stay up to date with the latest trends and exclusive offers.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <input
                    className="max-w-lg flex-1 p-2 border"
                    placeholder="Enter your email"
                    type="email"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-6 bg-gray-800 text-white">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="space-y-2">
              <h4 className="text-lg font-semibold">Shop</h4>
              <ul className="space-y-1">
                <li><a className="hover:underline" href="#">Men's Clothing</a></li>
                <li><a className="hover:underline" href="#">Women's Clothing</a></li>
                <li><a className="hover:underline" href="#">Accessories</a></li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="text-lg font-semibold">Company</h4>
              <ul className="space-y-1">
                <li><a className="hover:underline" href="#">About Us</a></li>
                <li><a className="hover:underline" href="#">Careers</a></li>
                <li><a className="hover:underline" href="#">Contact</a></li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="text-lg font-semibold">Customer Service</h4>
              <ul className="space-y-1">
                <li><a className="hover:underline" href="#">FAQs</a></li>
                <li><a className="hover:underline" href="#">Shipping</a></li>
                <li><a className="hover:underline" href="#">Returns</a></li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="text-lg font-semibold">Connect</h4>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-gray-300">
                  <Facebook className="h-6 w-6" />
                  <span className="sr-only">Facebook</span>
                </a>
                <a href="#" className="hover:text-gray-300">
                  <Twitter className="h-6 w-6" />
                  <span className="sr-only">Twitter</span>
                </a>
                <a href="#" className="hover:text-gray-300">
                  <Instagram className="h-6 w-6" />
                  <span className="sr-only">Instagram</span>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-700 pt-4 text-center">
            <p className="text-sm">© 2024 StyleHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}