import React, { useState, useEffect, useRef } from 'react';
import { Smartphone, Coffee, Home, Settings, ShoppingCart, Clipboard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const TrackTidyHomePage = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you for subscribing with: ${email}`);
    setEmail('');
  };

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const totalItems = 6;
  const itemsToShow = 3;
  const maxIndex = totalItems - itemsToShow;
  const autoScrollInterval = 3000; // Increased interval for better UX
  const carouselRef = useRef(null);
  const containerRef = useRef(null);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } }
  };

  const slideInFromLeft = {
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.6 } }
  };

  const slideInFromRight = {
    hidden: { x: 100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.6 } }
  };

  const scaleUp = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } }
  };

  // Features data with navigation paths
  const features = [
    {
      icon: Smartphone,
      title: "Electronics Tracking",
      description: "Catalog all your electronic devices with purchase dates, warranty information, and service history.",
      path: "/electronics"
    },
    {
      icon: Coffee,
      title: "Home Appliances",
      description: "Track kitchen appliances, laundry machines, and other home essentials with maintenance schedules.",
      path: "/appliances"
    },
    {
      icon: Home,
      title: "Furniture Inventory",
      description: "Manage your furniture collection with details on materials, dimensions, and care instructions.",
      path: "/furniture"
    },
    {
      icon: Settings,
      title: "Service Connections",
      description: "Find and book qualified service providers for repairs and maintenance with just a few clicks.",
      path: "/services"
    },
    {
      icon: ShoppingCart,
      title: "Grocery Shopping",
      description: "Browse and order grocery items directly from our platform with quick delivery options.",
      path: "/groceries"
    },
    {
      icon: Clipboard,
      title: "Maintenance Reminders",
      description: "Get timely notifications for warranty expirations, regular maintenance, and service requirements.",
      path: "/reminders"
    }
  ];

  // Handle navigation to feature page
  const navigateToFeature = (path) => {
    navigate(path);
  };

  // Auto scroll logic
  useEffect(() => {
    if (isHovering || isDragging) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex >= maxIndex ? 0 : prevIndex + 1));
    }, autoScrollInterval);
    
    return () => clearInterval(interval);
  }, [isHovering, maxIndex, isDragging]);

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  // Handle card click
  const handleCardClick = (index) => {
    if (isDragging) return; // Prevent navigation if user was dragging
    let newIndex = index - 1; // Attempt to center the clicked card
    if (newIndex < 0) newIndex = 0;
    if (newIndex > maxIndex) newIndex = maxIndex;
    setCurrentIndex(newIndex);
  };

  // Drag to scroll functionality
  const startDrag = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const duringDrag = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Adjust scroll speed
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const endDrag = () => {
    setIsDragging(false);
    // Update currentIndex based on scroll position
    const scrollPosition = containerRef.current.scrollLeft;
    const itemWidth = containerRef.current.scrollWidth / totalItems;
    const newIndex = Math.round(scrollPosition / itemWidth);
    setCurrentIndex(Math.min(newIndex, maxIndex));
  };

  // Update scroll position when currentIndex changes
  useEffect(() => {
    if (containerRef.current) {
      const itemWidth = containerRef.current.scrollWidth / totalItems;
      containerRef.current.scrollTo({
        left: currentIndex * itemWidth,
        behavior: 'smooth'
      });
    }
  }, [currentIndex, totalItems]);

  // Intersection Observer for scroll animations
  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [featuresRef, featuresInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [categoriesRef, categoriesInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [servicesRef, servicesInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [testimonialsRef, testimonialsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 overflow-x-hidden">
      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
        className="bg-white shadow-sm sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <Home className="h-8 w-8 text-green-800" />
                <span className="ml-2 text-xl font-bold text-gray-900">TrackTidy</span>
              </div>
              <div className="sm:ml-6 sm:flex sm:space-x-8">
                <a href="#" className="border-green-800 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Home
                </a>
                <a href="#" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Shop
                </a>
                <a href="/add-in" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Inventory
                </a>
                <a href="#" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Services
                </a>
                <a href="#" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Packages
                </a>
                <a href="#" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Grocery
                </a>
              </div>
            </div>
            <div className="flex items-center">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 text-sm font-medium text-white bg-green-800 rounded-md hover:bg-green-700"
              >
                Get Started
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.div 
        ref={heroRef}
        initial="hidden"
        animate={heroInView ? "visible" : "hidden"}
        variants={containerVariants}
        className="bg-white py-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <motion.div 
              variants={slideInFromLeft}
              className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left"
            >
              <h1>
                <span className="block text-sm font-semibold uppercase tracking-wide text-green-800">
                  Introducing TrackTidy
                </span>
                <span className="mt-1 block text-4xl tracking-tight font-extrabold sm:text-5xl xl:text-6xl">
                  <span className="block text-gray-900">Home Inventory Management</span>
                  <span className="block text-green-800">Made Simple</span>
                </span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                Track, organize, and service your home items in one place. 
                Manage electronics, appliances, furniture, and find service providers
                when you need maintenance or repairs.
              </p>
              <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
                <form onSubmit={handleSubmit} className="mt-3 sm:flex">
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="px-4 py-3 placeholder-gray-400 text-gray-900 rounded-md w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                    placeholder="Enter your email"
                  />
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    type="submit"
                    className="mt-3 w-full px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-800 shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 sm:mt-0 sm:ml-3 sm:flex-shrink-0"
                  >
                    Get Started Free
                  </motion.button>
                </form>
                <p className="text-xs text-gray-500 mt-3">
                  No credit card required. Start organizing your home today.
                </p>
              </div>
            </motion.div>
            <motion.div 
              variants={slideInFromRight}
              className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center"
            >
              <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md overflow-hidden">
                <motion.div 
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.8 }}
                  className="relative block w-full bg-white rounded-lg overflow-hidden"
                >
                  <img 
                    src="https://images.pexels.com/photos/1743227/pexels-photo-1743227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                    alt="Smart home devices" 
                    className="w-full h-64 object-cover"
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Features Section */}
      <motion.div 
        ref={featuresRef}
        initial="hidden"
        animate={featuresInView ? "visible" : "hidden"}
        variants={containerVariants}
        className="py-16 bg-gray-50 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={itemVariants} className="text-center">
            <h2 className="text-base font-semibold text-green-800 tracking-wide uppercase">Features</h2>
            <p className="mt-1 text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Everything you need to manage your home items
            </p>
            <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
              Keep track of your possessions, find service providers, and shop for groceries all in one place.
            </p>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="mt-12 relative"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            ref={carouselRef}
          >
            <div 
              ref={containerRef}
              className="flex overflow-x-hidden select-none cursor-grab active:cursor-grabbing"
              onMouseDown={startDrag}
              onMouseMove={duringDrag}
              onMouseUp={endDrag}
              onMouseLeave={endDrag}
              onTouchStart={(e) => startDrag(e.touches[0])}
              onTouchMove={(e) => duringDrag(e.touches[0])}
              onTouchEnd={endDrag}
              style={{ 
                scrollSnapType: 'x mandatory',
                scrollBehavior: 'smooth',
                WebkitOverflowScrolling: 'touch'
              }}
            >
              {features.map((feature, index) => (
                <motion.div 
                  key={index} 
                  className="w-1/3 flex-shrink-0 px-2 scroll-snap-align-start"
                  onClick={() => handleCardClick(index)}
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="pt-6 h-full">
                    <div 
                      className="flow-root bg-white rounded-lg px-6 pb-8 h-full shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer"
                      onClick={() => navigateToFeature(feature.path)}
                    >
                      <div className="-mt-6">
                        <motion.div 
                          className="inline-flex items-center justify-center p-3 bg-green-800 rounded-md shadow-lg cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigateToFeature(feature.path);
                          }}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <feature.icon className="h-6 w-6 text-white" />
                        </motion.div>
                        <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">{feature.title}</h3>
                        <p className="mt-5 text-base text-gray-500">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Navigation dots */}
            <motion.div 
              className="flex justify-center mt-6 space-x-2"
              variants={itemVariants}
            >
              {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`h-2 rounded-full focus:outline-none ${
                    currentIndex === index ? 'w-6 bg-green-800' : 'w-2 bg-gray-300'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Product Categories */}
      <motion.div 
        ref={categoriesRef}
        initial="hidden"
        animate={categoriesInView ? "visible" : "hidden"}
        variants={containerVariants}
        className="bg-white py-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-base font-semibold text-green-800 tracking-wide uppercase">Our Categories</h2>
            <p className="mt-1 text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Everything for your home
            </p>
          </motion.div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Electronics",
                description: "TVs, computers, phones, and more",
                image: "https://images.pexels.com/photos/20694722/pexels-photo-20694722/free-photo-of-a-modern-home-desk-setup-with-a-computer-and-a-tablet.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              },
              {
                title: "Appliances",
                description: "Kitchen, laundry, and cleaning appliances",
                image: "https://images.pexels.com/photos/17183470/pexels-photo-17183470/free-photo-of-beautiful-kitchen-with-morning-light.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              },
              {
                title: "Furniture",
                description: "Living room, bedroom, and office furniture",
                image: "https://images.pexels.com/photos/8135121/pexels-photo-8135121.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              },
              {
                title: "Groceries",
                description: "Fresh produce, pantry items, and essentials",
                image: "https://images.pexels.com/photos/9070106/pexels-photo-9070106.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              }
            ].map((category, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="relative rounded-lg overflow-hidden"
              >
                <img src={category.image} alt={category.title} className="w-full h-64 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black opacity-70"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-xl font-bold text-white">{category.title}</h3>
                  <p className="text-sm text-gray-300 mt-1">{category.description}</p>
                  <motion.a 
                    href="#" 
                    className="mt-3 inline-flex items-center text-white font-medium"
                    whileHover={{ x: 5 }}
                  >
                    Shop now
                    <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Services Section */}
      <motion.div 
        ref={servicesRef}
        initial="hidden"
        animate={servicesInView ? "visible" : "hidden"}
        variants={containerVariants}
        className="bg-gray-50 py-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
            <motion.div variants={slideInFromLeft}>
              <h2 className="text-base font-semibold text-green-800 tracking-wide uppercase">Services</h2>
              <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Connecting you with quality service providers
              </p>
              <p className="mt-4 text-lg text-gray-500">
                When your home items need repair or maintenance, we make it easy to find
                and book qualified service professionals. From electronics repair to appliance 
                servicing and furniture restoration.
              </p>
              <div className="mt-6">
                {[
                  "Vetted and qualified service providers",
                  "Online booking and scheduling",
                  "Service history tracking",
                  "Verified reviews and ratings"
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-center mt-2"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <svg className="h-5 w-5 text-green-800" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <p className="ml-2 text-gray-600">{item}</p>
                  </motion.div>
                ))}
              </div>
              <motion.div 
                className="mt-8"
                whileHover={{ scale: 1.02 }}
              >
                <a href="#" className="text-base font-medium text-green-800 hover:text-green-700">
                  Learn more about our service options <span aria-hidden="true">&rarr;</span>
                </a>
              </motion.div>
            </motion.div>
            <motion.div 
              variants={slideInFromRight}
              className="mt-10 lg:mt-0"
            >
              <motion.img 
                src="https://images.pexels.com/photos/4792517/pexels-photo-4792517.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Service technician" 
                className="rounded-lg shadow-lg"
                whileHover={{ scale: 1.02 }}
              />
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Testimonials */}
      <motion.div 
        ref={testimonialsRef}
        initial="hidden"
        animate={testimonialsInView ? "visible" : "hidden"}
        variants={containerVariants}
        className="bg-white py-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={itemVariants} className="text-center">
            <h2 className="text-base font-semibold text-green-800 tracking-wide uppercase">Testimonials</h2>
            <p className="mt-1 text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Trusted by homeowners everywhere
            </p>
          </motion.div>
          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            {[
              {
                quote: "TrackTidy has completely changed how I manage my home. I can easily track all my electronics and appliances, and find service providers when needed.",
                author: "Sarah J.",
                role: "Homeowner"
              },
              {
                quote: "As a busy professional, I don't have time to keep track of warranty dates and maintenance schedules. TrackTidy does it all for me.",
                author: "Michael T.",
                role: "Apartment Owner"
              },
              {
                quote: "The grocery shopping feature saves me so much time each week. I can quickly order everything I need without having to visit multiple stores.",
                author: "David R.",
                role: "Family of Four"
              }
            ].map((testimonial, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="bg-gray-50 rounded-lg px-6 py-8 text-center"
              >
                <p className="text-gray-600 italic">"{testimonial.quote}"</p>
                <div className="mt-6">
                  <p className="font-medium text-gray-900">{testimonial.author}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-green-800"
      >
        <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            <span className="block">Ready to organize your home items?</span>
          </h2>
          <p className="mt-4 text-lg leading-6 text-green-100">
            Start your free 14-day trial today. No credit card required.
          </p>
          <div className="mt-8 flex justify-center">
            <motion.div 
              className="inline-flex rounded-md shadow"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a
                href="#"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-green-800 bg-white hover:bg-gray-50"
              >
                Get started
              </a>
            </motion.div>
            <motion.div 
              className="ml-3 inline-flex"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a
                href="#"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-900 hover:bg-green-700"
              >
                Learn more
              </a>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Footer */}
      <motion.footer 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-gray-800"
      >
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-4 gap-8 md:grid-cols-4">
            {[
              {
                title: "Company",
                links: ["About", "Team", "Blog", "Careers"]
              },
              {
                title: "Shop",
                links: ["Electronics", "Appliances", "Furniture", "Groceries"]
              },
              {
                title: "Services",
                links: ["Repairs", "Maintenance", "Installation", "Packages"]
              },
              {
                title: "Legal",
                links: ["Privacy", "Terms", "Cookie Policy", "Contact"]
              }
            ].map((section, index) => (
              <motion.div 
                key={index}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">{section.title}</h3>
                <ul className="mt-4 space-y-4">
                  {section.links.map((link, linkIndex) => (
                    <motion.li 
                      key={linkIndex}
                      whileHover={{ x: 5 }}
                    >
                      <a href="#" className="text-base text-gray-300 hover:text-white">{link}</a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
          <motion.div 
            className="mt-8 border-t border-gray-700 pt-8 flex items-center justify-between"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center">
              <Home className="h-8 w-8 text-green-600" />
              <span className="ml-2 text-xl font-bold text-white">TrackTidy</span>
            </div>
            <p className="text-base text-gray-400">
              &copy; 2025 TrackTidy. All rights reserved.
            </p>
          </motion.div>
        </div>
      </motion.footer>
    </div>
  );
};

export default TrackTidyHomePage;