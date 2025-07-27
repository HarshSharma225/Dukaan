import React from 'react'

function Payment() {
  return (
    <div>
        <div className="bg-[#f5efe8] flex flex-col justify-center items-center min-h-screen text-gray-900 px-6 md:px-20 py-10">
           
            <section className="flex flex-col md:flex-row items-center md:items-start gap-10 mb-16">
                <div className="md:w-2/3">
                    <h2 className="text-5xl font-bold mb-6"></h2>
                    <p className="text-gray-600 leading-relaxed mb-6">
                        Thank you for showing interest in shopping from <span className='text-orange-500 font-bold'>Dukaan</span> . But the payment methods are not integrated yet.
                    </p>
                </div>
            </section>

        </div>
    </div>
  )
}

export default Payment;