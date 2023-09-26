import React from 'react'

const Blog = () => {
  return (
    <div className='mt-10 flex justify-center items-center'>
      <div className=" bg-gray-100">
        <div className="max-w-7xl mx-auto py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {/* Blog post 1 */}
            <div className=" bg-gray-100 overflow-hidden shadow-xl rounded-lg" >
              <div className="p-5">
                <h3 className="text-lg font-medium text-gray-900">Blog post 1</h3>
                <p className="mt-2 text-sm text-gray-500">Attentive: We are attentive to your needs and requirements, ensuring that we meet them to the best of our abilities.
                  Experienced: With years of experience in the real estate industry, our team has the expertise to handle all your real estate needs.
                  Honest: We operate with utmost honesty and transparency, ensuring that our clients trust us completely.
                  Knowledgeable: Our team is highly knowledgeable in the real estate industry, and we use this expertise to provide the best advice to our clients.
                  Listening: We listen to our clients' needs and requirements, ensuring that we provide personalized services that meet their specific needs.
                  Professional: We maintain the highest level of professionalism in all our dealings, ensuring that we provide exceptional service to our clients.
                  Reliable: Our team is reliable, and we always deliver on our promises.
                  Service: We are in the service industry, and we always put our clients' needs first.
                  Trustworthy: Our team is trustworthy, and we always operate with utmost honesty and transparency.
                  Value: We provide value to our clients, ensuring that we offer the best deals and opportunities in the real estate industry..</p>
                <a href="#" className="mt-2 text-base font-medium text-blue-600 hover:text-blue-500">Read more &rarr;</a>
              </div>
            </div>

            {/* Blog post 2 */}
            <div className=" bg-gray-100 overflow-hidden shadow-xl rounded-lg" >
              <div className="p-5">
                <h3 className="text-lg font-medium text-gray-900">Blog post 2</h3>
                <p className="mt-2 text-sm text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nec lorem euismod, blandit sapien eu, volutpat quam. Nam euismod nibh sit amet nibh vestibulum, nec malesuada libero eleifend. Sed eget faucibus risus. Nullam sit amet ultrices ex, nec bibendum sem. Aliquam erat volutpat.</p>
                <a href="#" className="mt-2 text-base font-medium text-blue-600 hover:text-blue-500">Read more &rarr;</a>
              </div>
            </div>

            {/* Blog post 3 */}
            <div className=" bg-gray-100 overflow-hidden shadow-xl rounded-lg" >
              <div className="p-5">
                <h3 className="text-lg font-medium text-gray-900">Blog post 3</h3>
                <p className="mt-2 text-sm text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nec lorem euismod, blandit sapien eu, volutpat quam. Nam euismod nibh sit amet nibh vestibulum, nec malesuada libero eleifend. Sed eget faucibus risus. Nullam sit amet ultrices ex, nec bibendum sem. Aliquam erat volutpat.</p>
                <a href="#" className="mt-2 text-base font-medium text-blue-600 hover:text-blue-500">Read more &rarr;</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Blog
