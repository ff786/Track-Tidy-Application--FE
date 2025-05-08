import React from 'react';
import {motion} from "framer-motion";
import {Home} from "lucide-react";

function Footer() {
    return (
        <motion.footer
            initial={{opacity: 0}}
            whileInView={{opacity: 1}}
            viewport={{once: true}}
            transition={{duration: 0.8}}
            className="bg-gray-900"
        >
            <div className="max-w-auto mx-auto py-12 px-4 items-center">
                <div className="grid grid-cols-2 gap-5 md:grid-cols-2 text-start">
                    {[{
                        title: "Company",
                        links: [
                            { label: "About", url: "/about-us" },
                            { label: "Team", url: "/team" }
                        ]
                    }, {
                        title: "Legal",
                        links: [
                            { label: "Privacy", url: "/privacy-policy" },
                            { label: "Terms & Conditions", url: "/terms-&-conditions" },
                        ]
                    }].map((section, index) => (
                        <motion.div
                            key={index}
                            initial={{y: 20, opacity: 0}}
                            whileInView={{y: 0, opacity: 1}}
                            transition={{delay: index * 0.1}}
                            viewport={{once: true}}
                        >
                            <h3 className="text-sm font-semibold text-gray-400 pl-8 tracking-wider uppercase">{section.title}</h3>
                            <ul className="mt-4 space-y-4">
                                {section.links.map((link, linkIndex) => (
                                    <motion.li key={linkIndex} whileHover={{x: 5}}>
                                        <a href={link.url} className="text-base text-gray-300 hover:text-white">{link.label}</a>
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
                <motion.div
                    className="mt-8 border-t border-gray-700 pt-8 flex items-center justify-between"
                    initial={{opacity: 0}}
                    whileInView={{opacity: 1}}
                    viewport={{once: true}}
                    transition={{delay: 0.4}}
                >
                    <div className="flex items-center">
                        <Home className="h-8 w-8 text-green-600"/>
                        <span className="ml-2 text-xl font-bold text-white">TrackTidy</span>
                    </div>
                    <p className="text-base text-gray-400">
                        &copy; 2025 TrackTidy. All rights reserved.
                    </p>
                </motion.div>
            </div>
        </motion.footer>
    );
}
export default Footer;