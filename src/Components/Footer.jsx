import React from 'react';
import { Facebook, Twitter, Instagram } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10 px-6 md:px-24">
      <div className="flex flex-wrap justify-between gap-6">
        <div className="w-full md:w-1/4">
          <h1 className="text-xl font-bold">NEXTTRIP</h1>
          <p className="mt-2 text-gray-400 text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos consectetur numquam ipsa provident. Vitae, earum? Suscipit commodi, ex necessitatibus corrupti labore adipisci itaque aut magni voluptates unde dignissimos enim consequuntur?
          </p>
        </div>

        <div className="w-full md:w-auto">
          <h1 className="text-lg font-semibold">Home</h1>
          <ul className="text-gray-400 text-sm mt-2 space-y-1">
            <li>Discover</li>
            <li>Explore</li>
            <li>Jon</li>
          </ul>
        </div>

        <div className="w-full md:w-auto">
          <h1 className="text-lg font-semibold">Company</h1>
          <ul className="text-gray-400 text-sm mt-2 space-y-1">
            <li>Corporation</li>
            <li>Fashions</li>
            <li>About Us</li>
          </ul>
        </div>

        <div className="w-full md:w-auto">
          <h1 className="text-lg font-semibold">Features</h1>
          <ul className="text-gray-400 text-sm mt-2 space-y-1">
            <li>Shop</li>
            <li>Cart</li>
            <li>Sale</li>
          </ul>
        </div>

        <div className="w-full md:w-auto">
          <h1 className="text-lg font-semibold">Contact Us</h1>
          <ul className="text-gray-400 text-sm mt-2 space-y-1">
            <li>Privacy & Policy</li>
            <li>Terms Of Services</li>
            <li>+91 1234567890</li>
          </ul>
        </div>
      </div>

      <div className="flex justify-center mt-6 space-x-6">
        <Instagram color="white" size={32} className="cursor-pointer hover:text-gray-400" />
        <Facebook color="white" size={32} className="cursor-pointer hover:text-gray-400" />
        <Twitter color="white" size={32} className="cursor-pointer hover:text-gray-400" />
      </div>
    </footer>
  );
}

export default Footer;
