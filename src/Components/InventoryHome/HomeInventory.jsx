import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import TopHeader from "../common/TopHeader/TopHeader.jsx";
import Footer from "../common/Footer/Footer.jsx";
import kitchen from "../../assets/kitchen.png";
import bathroom from "../../assets/bathroom.png";
import bedRoom from "../../assets/bedRoom.png";
import living from "../../assets/living.png";
import laundry from "../../assets/laundry.png";
import smart from "../../assets/smart.png";
import HomeOfc from "../../assets/HomeOfc.png";
import outdoor from "../../assets/Outdoor.png";
import ModHome from "../../assets/ModHome.png";
import Home1Main from "../../assets/Home1Main.png";
import SmartHome from "../../assets/SmartHome.png";


const HomeInventory = () => {
    const [activeTab, setActiveTab] = useState('All');
    const [currentSlide, setCurrentSlide] = useState(0);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const sliderContent = [
        {
            title: "All Your Home Appliances at One Place....",
            description: "Upgrade your home with our premium class....",
            buttonText: "Shop now",
            bgGradient: "from-purple-700 to-purple-500",
            image: Home1Main,
        },
        {
            title: "Modern Home Appliances",
            description: "Get your Home Modernized...",
            bgGradient: "from-green-700 to-green-500",
            image: ModHome,
        },
        {
            title: "Smart Living Solutions",
            description: "Connect your home with innovative smart devices",
            bgGradient: "from-blue-700 to-blue-500",
            image: SmartHome,
        },
    ];

    // Auto-rotate slider
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % sliderContent.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    // Fetch products from API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await fetch('http://localhost:8080/api/track-tidy/inventory/getAll');

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setProducts(data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching products:", err);
                setError(err.message);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Sample data for categories
    const categories = [
        {name: 'Kitchen', image: kitchen },
        {name: 'Bathroom', image: bathroom },
        {name: 'Bedroom', image: bedRoom },
        {name: 'Living Room', image: living },
        {name: 'Laundry', image: laundry },
        {name: 'Smart Home', image: smart },
        {name: 'Home Office', image: HomeOfc },
        {name: 'Outdoor', image: outdoor },
    ];

    // Filter products based on active tab (with case-insensitive comparison)
    const filteredProducts = activeTab === 'All'
        ? products
        : products.filter(product => {
            const category = product.productCategory || "";
            // Case-insensitive comparison and handling spaces
            return category.toLowerCase() === activeTab.toLowerCase() ||
                category.replace(/\s+/g, '') === activeTab.replace(/\s+/g, '') ||
                category.replace(/\s+/g, '').toLowerCase() === activeTab.replace(/\s+/g, '').toLowerCase();
        });

    // Debug function to check what categories exist in the data
    useEffect(() => {
        if (products.length > 0) {
            const uniqueCategories = [...new Set(products.map(p => p.productCategory))];
            console.log("Available categories in data:", uniqueCategories);
        }
    }, [products])

    return (
        <>
            <TopHeader/>
            <motion.div
                className="max-w-auto mx-auto px-4 py-8 bg-gradient-to-b from-green-800 to-green-100"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
            >
                {/* Hero Banner Slider */}
                <motion.div
                    className="relative overflow-hidden h-90 md:h-90 lg:h-96 rounded-lg mb-8 md:mb-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Slide container */}
                    <div
                        className="flex transition-transform duration-700 ease-in-out h-full shadow-lg hover:scale-100"
                        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                    >
                        {sliderContent.map((slide, index) => (
                            <motion.div
                                key={index}
                                className="flex-shrink-0 w-full h-full relative bg-gradient-to-r"
                            >
                                {/* Image with transparency */}
                                <img
                                    src={slide.image}
                                    alt={slide.title}
                                    className="absolute inset-0 w-full h-full object-fit-cover z-0 opacity-70"
                                />

                                {/* Text content */}
                                <motion.div className="relative z-20 p-4 md:p-8 text-white flex flex-col justify-center text-start h-full">
                                    <h1 className="text-4xl md:text-4xl lg:text-4xl font-bold mb-2 drop-shadow-md">
                                        {slide.title}
                                    </h1>
                                    <p className="text-lg md:text-base lg:text-lg mb-4 drop-shadow-md">
                                        {slide.description}
                                    </p>
                                    {slide.buttonText && (
                                        <button className="bg-green-800 hover:bg-green-700 text-white max-w-max font-semibold py-2 px-6 rounded-md transition duration-300">
                                            {slide.buttonText}
                                        </button>
                                    )}
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Navigation Dots */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-30">
                        {sliderContent.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                className={`w-3 h-3 rounded-full ${
                                    currentSlide === index ? 'bg-white' : 'bg-white bg-opacity-50'
                                }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </motion.div>

                {/* Categories Section */}
                <motion.div
                    className="flex py-12 px-6 max-w-8xl place-items-center mx-auto justify-center items-center rounded-lg mb-12 bg-gradient-to-tl from-gray-900 to-green-900 hover:scale-101 transition-transform duration-200"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="relative text-start">
                        <h2 className="text-4xl font-bold mb-4 text-white">Our categories</h2>
                        <p className="text-gray-200 mb-8">Explore our wide range of home appliances by room and function</p>
                    </div>
                    {/* Dark overlay */}
                    <div className="flex flex-wrap justify-center items-center gap-3 opacity-100 max-w-7xl mx-auto">
                        {categories.map((category, index) => (
                            <motion.div
                                key={index}
                                className="w-49 h-48 opacity-90 relative rounded-full overflow-hidden shadow-md cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:-translate-y-1 group"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ duration: 0.3 }}
                                onClick={() => setActiveTab(category.name)}
                            >
                                <img
                                    src={category.image || `/api/placeholder/200/200`}
                                    alt={category.name}
                                    className="w-full h-full object-cover"
                                />
                                <div
                                    className="absolute inset-0 flex items-center justify-center group-hover:bg-gray-800 group-hover:bg-opacity-70 transition-colors duration-300">
                                    <span className="text-green-50 text-xl font-bold">{category.name}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Products Section */}
                <div className="mb-12">
                    <h2 className="text-4xl text-center font-bold mb-4 text-gray-900">Our Products</h2>

                    <div className="flex overflow-x-auto border-b border-gray-200 mb-6">
                        {['All', ...categories.map(cat => cat.name)].map((tab) => (
                            <div
                                key={tab}
                                className={`cursor-pointer py-2 px-4 font-medium transition-colors duration-300 ${
                                    activeTab === tab
                                        ? 'text-green-800 border-b-2 border-green-800'
                                        : 'text-gray-900 hover:text-green-800'
                                }`}
                                onClick={() => setActiveTab(tab)}
                            >
                                {tab}
                            </div>
                        ))}
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center h-40">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-800"></div>
                        </div>
                    ) : error ? (
                        <div className="text-center text-red-500 p-4">
                            <p>Error: {error}</p>
                            <p>Please check your API connection and try again.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-8 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-4 xl:grid-cols-5 gap-4 text-start">
                            {filteredProducts.length > 0 ? (
                                filteredProducts.map((product) => (
                                    <div key={product.productId}
                                         className="bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                                        <div className="h-40 bg-gray-100 relative flex items-center justify-center">
                                            <img
                                                src={product.ProductImage || `/api/placeholder/160/160`}
                                                alt={product.productName}
                                                className="max-w-full max-h-full object-contain"
                                            />
                                        </div>
                                        <div className="p-4">
                                            <h3 className="font-semibold text-gray-800">{product.productName}</h3>
                                            <p className="text-sm text-gray-500 mb-2">Category: {product.productCategory}</p>
                                            <div className="text-xs text-gray-500 mb-2">
                                                <p>Quantity: {product.quantity}</p>
                                                <p>Warranty: {product.WarrantyPeriod}</p>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="font-semibold text-green-700">LKR {parseFloat(product.productValue).toFixed(2)}</span>
                                            </div>
                                        </div>
                                        <button
                                            className="relative w-27 h-8 bg-green-50 flex items-center justify-center shadow-sm hover:bg-green-500 hover:text-white transition-colors duration-300">
                                            Add to cart
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-full text-center py-8 text-gray-500">
                                    No products found in this category.
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </motion.div>
            <Footer />
        </>
    );
};

export default HomeInventory;