import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, ArrowRight } from 'lucide-react';
import TopHeader from "../common/TopHeader/TopHeader.jsx";
import Footer from "../common/Footer/Footer.jsx";


const TrackTidyGrocery = () => {
    const [favorites, setFavorites] = useState([]);

    const toggleFavorite = (id) => {
        setFavorites(prev =>
            prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
        );
    };

    const categories = [
        { id: 1, name: 'Snacks', icon: '🍰' },
        { id: 2, name: 'Fruits', icon: '🍓' },
        { id: 3, name: 'Party Snaks', icon: '🍗' },
        { id: 4, name: 'Almonds', icon: '🍤' },
        { id: 5, name: 'Vegetables', icon: '🥗' },
        { id: 6, name: 'Biscuits', icon: '🍪' },
    ];

    const bestSellers = [
        { id: 1, name: 'Infant Formula', price: 32.00, originalPrice: 52.00, discount: '38%', image: '/api/placeholder/200/200' },
        { id: 2, name: 'Maoam Max', price: 32.00, originalPrice: 52.00, discount: '38%', image: '/api/placeholder/200/200' },
        { id: 3, name: 'Milk Bottles', price: 32.00, originalPrice: 52.00, discount: '38%', image: '/api/placeholder/200/200' },
        { id: 4, name: 'Fresh Groceries', price: 32.00, originalPrice: 52.00, discount: '38%', image: '/api/placeholder/200/200' },
    ];

    return (
        <>
            <TopHeader />
            <div className="relative mx-auto px-4 py-6 bg-gradient-to-b from-green-50 to-green-100">
                {/* Main Banner */}
                <div className="grid grid-cols-3 md:grid-cols-3 gap-4 mb-8">
                    <div className="md:col-span-2 bg-green-500 text-white rounded-lg p-6 relative overflow-hidden">
                        <div className="relative text-start z-10">
                            <h2 className="text-2xl font-bold mb-1">Make Healthy Life</h2>
                            <h2 className="text-2xl font-bold mb-1">With <span className="text-2xl font-bold mb-4 ">Fresh Grocery</span> </h2>
                            <h2 className="text-2xl font-bold mb-4">Products</h2>

                            <div className="mb-2">
                                <span className="mr-2">Sale up to</span>
                                <span className="bg-red-500 text-white px-2 py-1 rounded-md">30% OFF</span>
                            </div>

                            <p className="mb-6">Free shipping on all your order.</p>

                            <button className="bg-white text-green-600 px-4 py-2 rounded-lg flex items-center">
                                DISCOVER MORE
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </button>
                        </div>
                        <div className="absolute right-0 bottom-0 w-1/2">
                            <img
                                src="/api/placeholder/300/300"
                                alt="Fruits"
                                className="object-contain"
                            />
                        </div>

                        {/* Slide indicators */}
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-1">
                            <div className="h-2 w-2 bg-white rounded-full opacity-50"></div>
                            <div className="h-2 w-2 bg-white rounded-full"></div>
                            <div className="h-2 w-2 bg-white rounded-full opacity-50"></div>
                        </div>
                    </div>

                    {/* Side Banners */}
                    <div className="flex flex-col gap-4">
                        <div className="bg-red-700 text-white rounded-lg p-4 relative overflow-hidden">
                            <div>
                                <h3 className="font-medium">SUMMER SALE</h3>
                                <h2 className="text-3xl font-bold mb-1">75% OFF</h2>
                                <p className="text-sm mb-3">Lorem Ipsum is simply dummy text industry.</p>
                                <button className="text-sm flex items-center">
                                    Shop Now
                                    <ArrowRight className="ml-1 h-4 w-4" />
                                </button>
                            </div>
                            <img
                                src="/api/placeholder/150/150"
                                alt="Summer fruits"
                                className="absolute right-0 bottom-0 w-1/3"
                            />
                        </div>

                        <div className="bg-gray-400 text-white rounded-lg p-4 relative overflow-hidden">
                            <div>
                                <h3 className="font-medium">SALE</h3>
                                <p className="text-sm mb-3">Lorem Ipsum is simply dummy text industry.</p>
                                <button className="text-sm flex items-center">
                                    Shop Now
                                    <ArrowRight className="ml-1 h-4 w-4" />
                                </button>
                            </div>
                            <img
                                src="/api/placeholder/150/150"
                                alt="Vegetables"
                                className="absolute right-0 bottom-0 w-1/3"
                            />
                        </div>
                    </div>
                </div>

                {/* Category Navigation */}
                <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar">
                    {categories.map(category => (
                        <div key={category.id} className="flex items-center bg-white rounded-lg px-4 py-2 shadow-sm cursor-pointer">
                            <span className="mr-2 text-xl">{category.icon}</span>
                            <span className="text-sm font-medium">{category.name}</span>
                        </div>
                    ))}
                </div>

                {/* Best Sellers Section */}
                <h2 className="text-xl font-bold mb-4">Best Seller</h2>
                <div className="grid grid-cols-5 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {bestSellers.map(product => (
                        <div key={product.id} className="bg-white rounded-xl overflow-hidden shadow-sm">
                            <div className="p-4 relative">
                                <button
                                    onClick={() => toggleFavorite(product.id)}
                                    className="absolute top-2 right-2 p-1 rounded-full bg-white shadow-sm"
                                >
                                    <Heart
                                        className={`h-5 w-5 ${favorites.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
                                    />
                                </button>
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="mx-auto h-32 object-contain mb-4"
                                />
                            </div>

                            <div className="p-4">
                                <div className="flex justify-between mb-2">
                                    <div>
                                        <span className="text-gray-400 line-through text-sm">${product.originalPrice.toFixed(2)}</span>
                                        <span className="ml-2 font-bold">${product.price.toFixed(2)}</span>
                                    </div>
                                </div>

                                <p className="text-gray-500 text-sm mb-4">Lorem Ipsum is simply dummy</p>

                                <div className="flex justify-between">
                                    <span className="text-red-500 font-medium">{product.discount}Off</span>
                                    <button className="bg-white text-blue-600 border border-blue-600 px-3 py-1 rounded text-sm">
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {/* CSS for hiding scrollbar but allowing scroll */}
                <style jsx>{`
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
            </div>
            <Footer />
        </>
    );
};

export default TrackTidyGrocery;