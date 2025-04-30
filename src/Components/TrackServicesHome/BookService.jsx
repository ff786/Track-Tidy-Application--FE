import React from "react";

const BookService = () => {

    return (
        <div className="max-w-auto mx-auto p-8 px-4 py-16 bg-green-50 border-lg shadow-sm rounded-[16px]">
            {/* Header */}
            <h2 className="text-4xl font-bold mb-14 text-left">
                Book your services{" "}
                <span className="text-gray-900 font-bold">
                      instantly ↗
                  </span>
            </h2>

            {/* Grid Layout */}
            <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {/* Trusted Reliability */}
                <div className="text-left">
                    <div
                        className="w-16 h-16 flex items-center justify-center bg-white rounded-full shadow-md border mb-6">
                        <span className="text-xl">⚡</span>
                    </div>
                    <h3 className="text-lg font-semibold mb-3">Trusted Reliability</h3>
                    <p className="text-gray-600 leading-relaxed">
                        All QH Service Partners are verified, tested, and trained to ensure you get a safe and smooth
                        service experience.
                    </p>
                </div>

                {/* On-demand Convenience */}
                <div className="text-left">
                    <div
                        className="w-16 h-16 flex items-center justify-center bg-white rounded-full shadow-md border mb-6">
                        <span className="text-xl">⭐</span>
                    </div>
                    <h3 className="text-lg font-semibold mb-3">On-demand Convenience</h3>
                    <p className="text-gray-600 leading-relaxed">
                        With an average lead time of 1.5 hours, we ensure your Service Partner is ready to serve you,
                        when you want them!
                    </p>
                </div>

                {/* Guaranteed Service */}
                <div className="text-left">
                    <div
                        className="w-16 h-16 flex items-center justify-center bg-white rounded-full shadow-md border mb-6">
                        <span className="text-xl">🏆</span>
                    </div>
                    <h3 className="text-lg font-semibold mb-3">Guaranteed Service</h3>
                    <p className="text-gray-600 leading-relaxed">
                        Post job headaches? Not a chance! Every* job is covered by a 30-day service warranty. Peace of
                        mind, Guaranteed!
                    </p>
                </div>
            </div>
        </div>


    );
}

export default BookService;
