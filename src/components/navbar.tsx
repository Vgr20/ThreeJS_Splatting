import React from "react";
import InstructionModal from "./instructions";
import ComingSoonModal from "./comingsoon";

export default function Navbar() {
  const [isInstructionModalOpen, setIsInstructionModalOpen] =
    React.useState(false);
  const [isComingSoonModalOpen, setIsComingSoonModalOpen] =
    React.useState(false);
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
                className="cursor-pointer px-4 py-2 mt-2 text-m font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                href="#"
                onClick={(e) => {
                  e.preventDefault(); // Prevents the jump to top
                  window.scrollBy({
                    top: window.innerHeight,
                    behavior: "smooth",
                  });
                }}
              >
                Explore
              </a>
              <a
                className="px-4 py-2 mt-2 text-m font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                onClick={() => setIsInstructionModalOpen(true)}
                href="#"
              >
                Guide
              </a>
              <InstructionModal
                isOpen={isInstructionModalOpen}
                onClose={() => setIsInstructionModalOpen(false)}
              >
                <button
                  className="mt-4 px-4 py-2 bg-cyan-600 text-white rounded-lg"
                  onClick={() => setIsInstructionModalOpen(false)}
                >
                  Close
                </button>
              </InstructionModal>
              <a
                className="px-4 py-2 mt-2 text-m font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                onClick={() => setIsComingSoonModalOpen(true)}
                href="#"
              >
                Try Yours
              </a>
              <ComingSoonModal
                isOpen={isComingSoonModalOpen}
                onClose={() => setIsComingSoonModalOpen(false)}
              >
                <button
                  className="mt-4 px-4 py-2 bg-cyan-600 text-white rounded-lg"
                  onClick={() => setIsComingSoonModalOpen(false)}
                >
                  Close
                </button>
              </ComingSoonModal>
              <a
                className="px-4 py-2 mt-2 text-m font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                href="#"
                onClick={(e) => {
                  e.preventDefault(); // Prevents the jump to top
                  window.scrollBy({
                    top: window.innerHeight * 3,
                    behavior: "smooth",
                  });
                }}
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
