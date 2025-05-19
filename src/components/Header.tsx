
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-gray-900">TruxtedAI</span>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-gray-900">Products</Link>
            <Link to="/" className="text-gray-700 hover:text-gray-900">Solutions</Link>
            <Link to="/sandbox" className="text-gray-700 hover:text-gray-900">Sandbox</Link>
            <Link to="/" className="text-gray-700 hover:text-gray-900">Contact Us</Link>
          </div>
          <div className="flex items-center space-x-2">
            <Link to="/" className="text-gray-700 hover:text-gray-900 px-3 py-2">Login</Link>
            <Button className="bg-blue-500 hover:bg-blue-600">Request Demo</Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
