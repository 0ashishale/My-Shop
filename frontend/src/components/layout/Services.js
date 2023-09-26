import React from 'react'

const Services = () => {
    return (
        <div className='mt-20'>
            <div class="flex flex-col items-center justify-center bg-gray-100 py-8">
                <h1 class="text-4xl font-bold mb-8">Our Services</h1>
                <div class="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div class=" bg-gray-100 rounded-lg shadow-lg p-8" >
                        <h2 class="text-xl font-bold mb-4">Real Estate Listings</h2>
                        <p class="text-gray-700 leading-relaxed mb-6">We offer a comprehensive database of real estate listings, updated regularly and searchable by a variety of criteria. Whether you're looking to buy or rent, our listings can help you find your dream home.</p>
                        <a href="#" class="inline-block bg-sky-400 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors duration-300">View Listings</a>
                    </div>
                    <div class=" bg-gray-100 rounded-lg shadow-lg p-8" >
                        <h2 class="text-xl font-bold mb-4">Property Management</h2>
                        <p class="text-gray-700 leading-relaxed mb-6">Our team of experienced property managers can help you maximize the value of your investment properties. From tenant screening to rent collection to maintenance and repairs, we handle everything so you don't have to.</p>
                        <a href="#" class="inline-block bg-sky-400 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors duration-300">Learn More</a>
                    </div>
                    <div class=" bg-gray-100 rounded-lg shadow-lg p-8" >
                        <h2 class="text-xl font-bold mb-4">Real Estate Consulting</h2>
                        <p class="text-gray-700 leading-relaxed mb-6">Our team of real estate experts can provide you with advice and guidance on everything from buying and selling properties to investing in real estate. We can help you make informed decisions and achieve your real estate goals.</p>
                        <a href="#" class="inline-block bg-sky-400 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors duration-300">Get in Touch</a>
                    </div>
                    <div class="bg-white rounded-lg shadow-lg p-8" >
                        <h2 class="text-xl font-bold mb-4">Real Estate Financing</h2>
                        <p class="text-gray-700 leading-relaxed mb-6">We offer a variety of financing options to help you purchase or refinance your real estate investments. Our team of lending experts can work with you to find the best loan product for your needs.</p>
                        <a href="#" class="inline-block bg-sky-400 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors duration-300">Learn More</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Services
