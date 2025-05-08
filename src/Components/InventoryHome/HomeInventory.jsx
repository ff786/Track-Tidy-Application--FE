import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import TopHeader from "../common/TopHeader/TopHeader.jsx";
import Footer from "../common/Footer/Footer.jsx";
import bgCategory from "../../assets/bgCategory.png";
import HOME from "../../assets/HOME.png";
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

    // Sample data
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

    const products = [
        {
            id: 1,
            name: 'BrewMaster Pro',
            brand: 'Elettra',
            price: 129.99,
            rating: 4.8,
            image: '/placeholder-coffee-maker.jpg',
            onSale: true,
            colors: ['#333', '#d4d4d4', '#c87f0a'],
            category: 'Kitchen'
        },
        {
            id: 2,
            name: 'BlendTech Max',
            brand: 'HomeGenius',
            price: 89.99,
            rating: 4.5,
            image: '/placeholder-blender.jpg',
            onSale: false,
            colors: ['#333', '#e74c3c'],
            category: 'Kitchen'
        },
        {
            id: 3,
            name: 'PureAir 3000',
            brand: 'CleanHome',
            price: 199.99,
            rating: 4.9,
            image: '/placeholder-air-purifier.jpg',
            onSale: true,
            colors: ['#fff', '#333'],
            category: 'Living Room'
        },
        {
            id: 4,
            name: 'ThermoSense',
            brand: 'SmartLiving',
            price: 149.99,
            rating: 4.7,
            image: '/placeholder-thermostat.jpg',
            onSale: false,
            colors: ['#333', '#d4d4d4'],
            category: 'Smart Home'
        },
        {
            id: 5,
            name: 'CleanRobo Plus',
            brand: 'TechHome',
            price: 299.99,
            rating: 4.6,
            image: '/placeholder-vacuum.jpg',
            onSale: true,
            colors: ['#333', '#fff'],
            category: 'Living Room'
        },
        {
            id: 6,
            name: 'CoolSmart XL',
            brand: 'FrostTech',
            price: 1299.99,
            rating: 4.9,
            image: '/placeholder-refrigerator.jpg',
            onSale: false,
            colors: ['#d4d4d4', '#333'],
            category: 'Kitchen'
        },
        {
            id: 7,
            name: 'SoundSphere',
            brand: 'AudioMax',
            price: 179.99,
            rating: 4.7,
            image: '/placeholder-speaker.jpg',
            onSale: true,
            colors: ['#333', '#3498db', '#e74c3c'],
            category: 'Living Room'
        },
        {
            id: 8,
            name: 'StyleDry Pro',
            brand: 'BeautyTech',
            price: 89.99,
            rating: 4.5,
            image: '/placeholder-hairdryer.jpg',
            onSale: false,
            colors: ['#e74c3c', '#333', '#d4d4d4'],
            category: 'Bathroom'
        },
        {
            id: 9,
            name: 'LumiBright',
            brand: 'HomeLight',
            price: 59.99,
            rating: 4.4,
            image: '/placeholder-lamp.jpg',
            onSale: true,
            colors: ['#d4d4d4', '#333'],
            category: 'Bedroom'
        },
        {
            id: 10,
            name: 'DentalCare Pro',
            brand: 'SmileTech',
            price: 79.99,
            rating: 4.8,
            image: '/placeholder-toothbrush.jpg',
            onSale: false,
            colors: ['#3498db', '#e74c3c', '#333'],
            category: 'Bathroom'
        }
    ];

    const brands = [
        {name: 'Elettra', label: 'NEW', logo: '/placeholder-brand1.jpg'},
        {name: 'HomeGenius', label: 'TOP', logo: '/placeholder-brand2.jpg'},
        {name: 'SmartLiving', label: 'BEST', logo: '/placeholder-brand3.jpg'},
        {name: 'CleanHome', label: 'TOP', logo: '/placeholder-brand4.jpg'},
        {name: 'TechHome', label: 'NEW', logo: '/placeholder-brand5.jpg'}
    ];

    // Filter products based on active tab
    const filteredProducts = activeTab === 'All'
        ? products
        : products.filter(product => product.category === activeTab);

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

                                {/* Dark overlay
                                <div className="absolute inset-0 bg-black z-10 opacity-50"></div>*/}

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



                {/* Weekly Bestsellers */}
                <div className="mb-12">
                    <h2 className="text-4xl text-center font-bold mb-4 text-gray-900">Our Products</h2>

                    <div className="flex border-b border-gray-200 mb-6">
                        {['All', 'Kitchen', 'Bathroom', 'Bedroom', 'Living Room', 'Laundry', 'Smart Home', 'Home Office', 'Outdoor'].map((tab) => (
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

                    <div className="grid grid-cols-9 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {filteredProducts.map((product) => (
                            <div key={product.id}
                                 className="bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                                <div className="h-40 bg-gray-100 relative flex items-center justify-center">
                                    <img
                                        src={product.image || `/api/placeholder/160/160`}
                                        alt={product.name}
                                        className="max-w-full max-h-full object-contain"
                                    />
                                    <button
                                        className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-green-500 hover:text-white transition-colors duration-300">
                                        ♡
                                    </button>
                                </div>
                                <div className="p-4">
                                    <h3 className="font-semibold text-gray-800">{product.name}</h3>
                                    <p className="text-sm text-gray-500 mb-2">{product.brand}</p>
                                    {product.onSale && (
                                        <span
                                            className="bg-green-500 text-white text-xs py-1 px-2 rounded inline-block mb-2">
                    Sale
                  </span>
                                    )}
                                    <div className="flex justify-between items-center">
                                        <span
                                            className="font-semibold text-green-700">${product.price.toFixed(2)}</span>
                                        <span
                                            className="flex items-center text-amber-400 text-sm">{product.rating} ★</span>
                                    </div>
                                    <div className="flex gap-1 mt-2">
                                        {product.colors.map((color, index) => (
                                            <div
                                                key={index}
                                                className="w-4 h-4 rounded-full cursor-pointer hover:scale-125 transition-transform duration-200"
                                                style={{
                                                    backgroundColor: color,
                                                    border: color === '#fff' ? '1px solid #ddd' : 'none'
                                                }}
                                            ></div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Shopping by Brands
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Shopping by brands</h2>
                <p className="text-gray-500 mb-6">Discover top products from your favorite brands</p>

                <div className="grid grid-cols-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {brands.map((brand, index) => (
                        <div key={index}
                             className="relative h-36 bg-white rounded-lg shadow-md flex items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                                <span
                                    className="absolute top-3 left-3 bg-green-500 text-white text-xs font-semibold py-1 px-3 rounded-full">
                                  {brand.label}
                                </span>
                            <img
                                src={brand.logo || `/api/placeholder/150/80`}
                                alt={brand.name}
                                className="max-w-4/5 max-h-4/5 object-contain"
                            />
                        </div>
                    ))}
                </div>*/}
            </motion.div>
            <Footer />
        </>
    );
};

export default HomeInventory;