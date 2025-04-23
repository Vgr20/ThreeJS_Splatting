export default function Navbar() {
  return (
    <div className="min-s-screen">
      <div className="antialiased bg-gray-400 dark-mode:bg-gray-900">
        <div className="w-full text-gray-200 bg-cyan-700 dark-mode:text-gray-200 dark-mode:bg-gray-800">
          <div className="flex flex-col max-w-screen-xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8">
            <div className="flex flex-row items-center justify-between p-4">
              <a
                href="#"
                className="text-2xl font-semibold tracking-widest text-gray-200 uppercase rounded-lg dark-mode:text-white focus:outline-none focus:shadow-outline"
              >
                SplatVista
              </a>
            </div>

            {/* Navigation links */}
            <nav
              className={`flex-col flex-grow pb-4 md:pb-0 md:flex md:justify-end md:flex-row`}
            >
              <a
                className="px-4 py-2 mt-2 text-m font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                href="#"
              >
                Explore
              </a>
              <a
                className="px-4 py-2 mt-2 text-m font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                href="#"
              >
                Guide
              </a>
              <a
                className="px-4 py-2 mt-2 text-m font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                href="#"
              >
                Try yours
              </a>
              <a
                className="px-4 py-2 mt-2 text-m font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                href="#"
              >
                Contact Us
              </a>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
