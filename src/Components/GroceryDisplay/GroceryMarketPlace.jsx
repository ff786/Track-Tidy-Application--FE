import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, ArrowRight } from 'lucide-react';
import TopHeader from "../common/TopHeader/TopHeader.jsx";
import Footer from "../common/Footer/Footer.jsx";
import { useAuth } from "../../service/AuthContext.jsx";

const TrackTidyGrocery = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cart, setCart] = useState([]);
    const [showCart, setShowCart] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [packageInfo, setPackageInfo] = useState(null);
    const [remainingBudget, setRemainingBudget] = useState(0);
    const [budgetExceeded, setBudgetExceeded] = useState(false);
    const { user } = useAuth();

    // Slider content
    const sliderContent = [
    {
        title: "Fresh Grocery Delivered to Your Doorstep",
        description: "Get the freshest produce and pantry staples at competitive prices",
        buttonText: "Shop now",
        bgGradient: "from-green-700 to-green-500",
        image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    },
    {
        title: "Summer Specials - Up to 50% Off",
        description: "Stock up on seasonal favorites at discounted prices",
        bgGradient: "from-yellow-600 to-yellow-400",
        image: 'https://images.unsplash.com/photo-1584093092919-3d551a9c5055?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
        title: "Organic & Locally Sourced",
        description: "Support local farmers with our premium selection",
        bgGradient: "from-emerald-700 to-emerald-500",
        image: 'https://images.unsplash.com/photo-1624720114708-0cbd6ee41f4e?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
];

    // Fetch user's package information
    useEffect(() => {
        if (user?.email) {
            const fetchPackageInfo = async () => {
                try {
                    const response = await fetch(`http://localhost:8080/api/track-tidy/package/getAll?userId=${user.userId}`);

                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }

                    const data = await response.json();
                    /*console.log("Fetched data from package API:", data); // ✅ Log full response*/

                    if (Array.isArray(data)) {
                        const matchedPackage = data.find(pkg => pkg.email === user.userId);
                        /*console.log("Matched package for user:", matchedPackage); // ✅ Log matched package*/

                        setPackageInfo(matchedPackage);

                        if (matchedPackage?.groceryValue) {
                            /*console.log("Inventory Value:", matchedPackage.inventoryValue); // ✅ Log inventory value*/
                            setRemainingBudget(parseFloat(matchedPackage.groceryValue));
                        }
                    }

                } catch (err) {
                    console.error("Error fetching package info:", err);
                }
            };

            fetchPackageInfo();
        }
    }, [user]);

    // Calculate remaining budget whenever cart changes
    useEffect(() => {
        if (packageInfo && packageInfo.groceryValue) {
            const cartTotal = cart.reduce((total, item) =>
                total + (parseFloat(item.price) * item.cartQuantity), 0);

            const remaining = parseFloat(packageInfo.groceryValue) - cartTotal;
            setRemainingBudget(remaining);
            setBudgetExceeded(remaining < 0);
        }
    }, [cart, packageInfo]);

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
                const response = await fetch('http://localhost:8080/api/track-tidy/grocery/getAll');

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

   const categories = [
    { 
        name: 'Fruits', 
        image: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80' 
    },
    { 
        name: 'Party Snacks', 
        image: 'https://images.unsplash.com/photo-1620663858647-89b695e62d45?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' 
    },
    { 
        name: 'Nuts', 
        image: 'https://images.unsplash.com/photo-1543158181-1274e5362710?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' 
    },
    { 
        name: 'Vegetables', 
        image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80' 
    },
    { 
        name: 'Bakery', 
        image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80' 
    },
];

    // Add to cart function
    const addToCart = (product) => {
        // Check if product has available quantity
        if (product.quantity <= 0) {
            alert("Sorry, this product is out of stock!");
            return;
        }

        // Update products array with reduced quantity
        setProducts(prevProducts =>
            prevProducts.map(p =>
                p.id === product.id
                    ? {...p, quantity: p.quantity - 1}
                    : p
            )
        );

        // Check if product is already in cart
        const existingProduct = cart.find(item => item.id === product.id);

        if (existingProduct) {
            // Update quantity if already in cart
            setCart(prevCart =>
                prevCart.map(item =>
                    item.id === product.id
                        ? {...item, cartQuantity: item.cartQuantity + 1}
                        : item
                )
            );
        } else {
            // Add new product to cart
            setCart(prevCart => [...prevCart, {...product, cartQuantity: 1}]);
        }
    };

    // Remove from cart function
    const removeFromCart = (productId) => {
        // Find the product in the cart
        const cartItem = cart.find(item => item.id === productId);

        if (!cartItem) return;

        // Update products array to restore quantity
        setProducts(prevProducts =>
            prevProducts.map(p =>
                p.id === productId
                    ? {...p, quantity: p.quantity + cartItem.cartQuantity}
                    : p
            )
        );

        // Remove from cart
        setCart(prevCart => prevCart.filter(item => item.id !== productId));
    };

    // Adjust quantity in cart
    const adjustQuantity = (productId, amount) => {
        const product = products.find(p => p.id === productId);
        const cartItem = cart.find(item => item.id === productId);

        if (!product || !cartItem) return;

        if (amount > 0 && product.quantity <= 0) {
            alert("Sorry, no more stock available for this product!");
            return;
        }

        // Update products array
        setProducts(prevProducts =>
            prevProducts.map(p =>
                p.id === productId
                    ? {...p, quantity: p.quantity - amount}
                    : p
            )
        );

        // Update cart
        const newCartQuantity = cartItem.cartQuantity + amount;

        if (newCartQuantity <= 0) {
            // Remove from cart if quantity becomes 0 or negative
            removeFromCart(productId);
        } else {
            setCart(prevCart =>
                prevCart.map(item =>
                    item.id === productId
                        ? {...item, cartQuantity: newCartQuantity}
                        : item
                )
            );
        }
    };

    // Calculate cart total
    const cartTotal = cart.reduce((total, item) =>
        total + (parseFloat(item.price) * item.cartQuantity), 0);

    // Submit order
    const submitOrder = async () => {
        if (budgetExceeded) {
            alert("Your request exceeds the available budget. Please adjust your cart.");
            return;
        }
        try {
            for (const item of cart) {
                const formData = new FormData();
                formData.append("itemImage", item.itemImage);
                formData.append("itemName", item.itemName);
                formData.append("productId", item.productId);
                formData.append("quantity", item.quantity);
                formData.append("price", item.price);

                const response = await fetch("http://localhost:8080/api/track-tidy/grocery/request/create", {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${sessionStorage.getItem("access_token")}`,
                    },
                    body: formData,
                });

                if (!response.ok) {
                    throw new Error(`Failed to submit item ${item.itemName}`);
                }
            }

            alert("Inventory request submitted successfully!");
            setCart([]);
            setShowCart(false);

        } catch (error) {
            console.error("Error submitting inventory request:", error);
            alert("There was an error submitting the inventory request. Please try again.");
        }
    };

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
                {/* Cart Button */}
                <div className="fixed top-20 right-4 z-50">
                    <button
                        onClick={() => setShowCart(true)}
                        className="bg-green-800 hover:bg-green-700 text-white rounded-full p-3 shadow-lg flex items-center"
                    >
                        <ShoppingCart className="h-5 w-5" />
                        <span className="ml-1 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                            {cart.reduce((total, item) => total + item.cartQuantity, 0)}
                        </span>
                    </button>
                </div>

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
                                className={`flex-shrink-0 w-full h-full relative bg-gradient-to-r ${slide.bgGradient}`}
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
                                        <button className="bg-white hover:bg-gray-100 text-green-800 max-w-max font-semibold py-2 px-6 rounded-md transition duration-300">
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
                        <h2 className="text-4xl font-bold mb-4 text-white">Our Categories</h2>
                        <p className="text-gray-200 mb-8">Explore our wide range of fresh groceries and pantry essentials</p>
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
                                    src={category.image}
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
                        <div className="grid grid-cols-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                            {products.length > 0 ? (
                                products.map((product) => (
                                    <div 
                                        key={product.id}
                                        className="bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col h-full"
                                    >
                                        {/* Image Container */}
                                        <div className="h-48 w-full bg-gray-100 relative flex items-center justify-center">
                                            {product.productImageBase64 ? (
                                                <img
                                                    src={product.productImageBase64}
                                                    alt={product.name}
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                <div className="flex items-center justify-center h-full w-full text-gray-400">
                                                    No Image
                                                </div>
                                            )}
                                            {/* Stock indicator */}
                                            {product.quantity <= 0 && (
                                                <div className="absolute top-0 right-0 bg-red-500 text-white text-xs px-2 py-1">
                                                    Out of Stock
                                                </div>
                                            )}
                                        </div>

                                        {/* Product Details */}
                                        <div className="p-4 flex-grow flex flex-col">
                                            <h3 className="font-semibold text-gray-800 text-lg mb-2">{product.itemName}</h3>
                                            <div className="text-sm text-gray-500 mb-2">
                                                <p>Quantity: {product.quantity} {product.unit || 'units'}</p>
                                                {product.weight && <p>Weight: {product.weight}</p>}
                                            </div>
                                            <div className="mt-auto">
                                                <div className="flex justify-between items-center mb-2">
                                                    {product.price ? (
                                                        <>
                                                            <span className="ml-2 font-bold text-green-700">
                                                                LKR {parseFloat(product.price).toFixed(2)}
                                                            </span>
                                                        </>
                                                    ) : (
                                                        <span className="font-bold text-green-700">
                                                            LKR {parseFloat(product.price).toFixed(2)}
                                                        </span>
                                                    )}
                                                </div>
                                                <button
                                                    onClick={() => addToCart(product)}
                                                    disabled={product.quantity <= 0}
                                                    className={`w-full py-1.5 px-3 rounded text-sm ${
                                                        product.quantity <= 0
                                                            ? 'bg-gray-300 cursor-not-allowed'
                                                            : 'bg-green-600 hover:bg-green-700 text-white'
                                                    } transition-colors duration-300 flex items-center justify-center`}
                                                >
                                                    <ShoppingCart className="h-4 w-4 mr-1" />
                                                    Add to cart
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-full text-center py-8 text-gray-500">
                                    No products available.
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Cart Modal */}
                {showCart && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                        <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-90vh overflow-auto">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-2xl font-bold">Your Shopping Cart</h2>
                                <button
                                    onClick={() => setShowCart(false)}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {/* Budget Information */}
                            <div className={`mb-4 p-3 rounded-lg ${budgetExceeded ? 'bg-red-100' : 'bg-green-100'}`}>
                                <div className="flex justify-between items-center">
                                    <span className="font-medium">Package Budget:</span>
                                    <span className="font-bold">
                                        LKR {packageInfo ? parseFloat(packageInfo.groceryValue).toFixed(2) : '0.00'}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="font-medium">Cart Total:</span>
                                    <span className="font-bold">LKR {cartTotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="font-medium">Remaining Budget:</span>
                                    <span className={`font-bold ${budgetExceeded ? 'text-red-600' : 'text-green-600'}`}>
                                        LKR {remainingBudget.toFixed(2)}
                                    </span>
                                </div>
                                {budgetExceeded && (
                                    <p className="text-red-600 text-sm mt-2">
                                        Warning: Your cart total exceeds your available budget.
                                    </p>
                                )}
                            </div>

                            {cart.length === 0 ? (
                                <div className="text-center py-8 text-gray-500">
                                    Your cart is empty. Add some products to get started!
                                </div>
                            ) : (
                                <>
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full bg-white">
                                            <thead>
                                            <tr className="bg-gray-100">
                                                <th className="py-2 px-4 text-left">Product</th>
                                                <th className="py-2 px-4 text-left">Price</th>
                                                <th className="py-2 px-4 text-left">Quantity</th>
                                                <th className="py-2 px-4 text-left">Subtotal</th>
                                                <th className="py-2 px-4 text-left">Action</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {cart.map((item) => (
                                                <tr key={item.id} className="border-b">
                                                    <td className="py-2 px-4">
                                                        <div className="flex items-center">
                                                            <img
                                                                src={item.productImageBase64 || `/api/placeholder/50/50`}
                                                                alt={item.name}
                                                                className="w-12 h-12 object-cover mr-3"
                                                            />
                                                            <div>
                                                                <p className="font-medium">{item.name}</p>
                                                                <p className="text-xs text-gray-500">{item.category}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="py-2 px-4">
                                                        ${parseFloat(item.price).toFixed(2)}
                                                    </td>
                                                    <td className="py-2 px-4">
                                                        <div className="flex items-center">
                                                            <button
                                                                onClick={() => adjustQuantity(item.id, -1)}
                                                                className="bg-gray-200 px-2 py-1 rounded-l"
                                                            >
                                                                -
                                                            </button>
                                                            <span className="px-4">{item.cartQuantity}</span>
                                                            <button
                                                                onClick={() => adjustQuantity(item.id, 1)}
                                                                className="bg-gray-200 px-2 py-1 rounded-r"
                                                                disabled={products.find(p => p.id === item.id)?.quantity <= 0}
                                                            >
                                                                +
                                                            </button>
                                                        </div>
                                                    </td>
                                                    <td className="py-2 px-4">
                                                        ${(parseFloat(item.price) * item.cartQuantity).toFixed(2)}
                                                    </td>
                                                    <td className="py-2 px-4">
                                                        <button
                                                            onClick={() => removeFromCart(item.id)}
                                                            className="text-red-500 hover:text-red-700"
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                            </svg>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="mt-6 flex justify-between items-center">
                                        <button
                                            onClick={() => setShowCart(false)}
                                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded transition-colors duration-300"
                                        >
                                            Continue Shopping
                                        </button>
                                        <button
                                            onClick={submitOrder}
                                            disabled={cart.length === 0}
                                            className={`py-2 px-6 rounded font-medium ${
                                                cart.length === 0
                                                    ? 'bg-gray-300 cursor-not-allowed'
                                                    : 'bg-green-600 hover:bg-green-700 text-white'
                                            } transition-colors duration-300`}
                                        >
                                            Submit Order
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </motion.div>
            <Footer />
        </>
    );
};

export default TrackTidyGrocery;