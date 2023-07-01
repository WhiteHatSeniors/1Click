import { Link } from "react-router-dom";

function Home() {

  return (
  <div className="bg-gray-100">
  <section className="bg-gray-900 text-white py-16">
        <div className="container mx-auto text-center">
          <img src="/path/to/your/logo.png" alt="Event Registration Platform" className="mx-auto mb-8" />

          <h1 className="text-4xl font-bold mb-4">One-Click Event Registration</h1>
          <p className="text-lg mb-8">Register for events in just one click. No hassle, no long forms.</p>

          <Link to="/signup" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded">
            Register Now
          </Link>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Why Choose 1-Click Registration?</h2>

          <div className="flex justify-center">
            <div className="max-w-md">
              <div className="mb-8">
                <svg className="w-12 h-12 text-blue-500 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0 1a9 9 0 100-18 9 9 0 000 18zM9 6a1 1 0 012 0v4.586l1.707-1.707a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 111.414-1.414L9 10.586V6z" clipRule="evenodd" />
                </svg>
                <h3 className="text-xl font-semibold mb-2">Save Time</h3>
                <p className="text-gray-700">Skip the lengthy registration forms and save time. With 1-click registration, you can quickly sign up for events without any hassle.</p>
              </div>

              <div className="mb-8">
                <svg className="w-12 h-12 text-blue-500 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M9.707 6.293a1 1 0 00-1.414 0L3 10.586V3a1 1 0 00-2 0v14a1 1 0 001 1h14a1 1 0 100-2H5.414l4.293-4.293a1 1 0 10-1.414-1.414L2.586 13H3a1 1 0 100 2h14a1 1 0 001-1V7.414l-4.293 4.293a1 1 0 01-1.414-1.414L17.414 11H17a1 1 0 100-2h.414l-4.293-4.293z" clipRule="evenodd" />
                </svg>
                <h3 className="text-xl font-semibold mb-2">Streamlined Process</h3>
                <p className="text-gray-700">Enjoy a seamless and streamlined registration process. Just click the registration button and you're all set to attend the event.</p>
              </div>

              <div>
                <svg className="w-12 h-12 text-blue-500 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M14 13a1 1 0 11-2 0 1 1 0 012 0zm0-8a1 1 0 11-2 0 1 1 0 012 0zm2 2a1 1 0 11-2 0 1 1 0 012 0zM8 13a1 1 0 11-2 0 1 1 0 012 0zm0-8a1 1 0 11-2 0 1 1 0 012 0zm2 2a1 1 0 11-2 0 1 1 0 012 0zM3 8a1 1 0 112 0 1 1 0 01-2 0zm14 0a1 1 0 112 0 1 1 0 01-2 0zM8 18a1 1 0 11-2 0 1 1 0 012 0zm4-8a1 1 0 11-2 0 1 1 0 012 0z" clipRule="evenodd" />
                </svg>
                <h3 className="text-xl font-semibold mb-2">Easy Access</h3>
                <p className="text-gray-700">Access your event registrations easily from your account. No need to remember different passwords or fill in details every time.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home