import { useEffect, useState } from "react";

/**
 * FancyGreeting Component
 *
 * A visually appealing greeting section with animations
 * that invites users to start exploring the website.
 */
const FancyGreeting = () => {
  // State for controlling animations
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    // Set a small delay before starting animations
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    // Start the continuous animation after initial animation
    const animationTimer = setTimeout(() => {
      setHasAnimated(true);
    }, 2000);

    return () => {
      clearTimeout(timer);
      clearTimeout(animationTimer);
    };
  }, []);

  return (
    <div className="relative py-20 bg-gradient-to-r from-sky-900 via-gray-800 to-gray-900 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          {/* Animated circles */}
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`absolute rounded-full bg-gradient-to-r from-cyan-500 to-cyan-700 opacity-20 
                ${hasAnimated ? "animate-pulse" : ""}`}
              style={{
                width: `${Math.random() * 300 + 50}px`,
                height: `${Math.random() * 300 + 50}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`,
                transform: "translate(-50%, -50%)",
              }}
            />
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="relative container mx-auto px-6 flex flex-col items-center justify-center z-10">
        {/* Main heading with animation */}
        <h1
          className={`text-4xl md:text-6xl font-bold text-white mb-8 text-center
            transition-all duration-1000 ease-out
            ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-12"
            }`}
        >
          <span className="inline-block">Start</span>
          <span className="inline-block mx-4 relative">
            Exploring
            <span
              className="absolute bottom-0 left-0 w-full h-1 bg-cyan-500 
              transform origin-left transition-transform duration-1000 ease-out 
              ${isVisible ? 'scale-x-100' : 'scale-x-0'}"
            ></span>
          </span>
        </h1>

        {/* Subtitle with animation */}
        <p
          className={`text-lg md:text-xl text-gray-300 max-w-xl text-center mb-12
            transition-all duration-1000 delay-300 ease-out
            ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-12"
            }`}
        >
          Discover our collection of unique designs and innovative solutions
          tailored to your needs
        </p>

        {/* CTA button with animation */}
        <button
          onClick={() =>
            window.scrollBy({ top: window.innerHeight, behavior: "smooth" })
          }
          className={`px-8 py-3 bg-cyan-600 text-white rounded-full font-semibold
            hover:bg-cyan-800 transform hover:scale-105 active:scale-95
            transition-all duration-500 ease-out
            ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-50"}`}
          style={{ transitionDelay: "600ms" }}
        >
          <div className="flex items-center space-x-2">
            <span>Browse Scenes</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </button>

        {/* Scroll indicator */}
        <div
          className={`absolute bottom-6 left-1/2 transform -translate-x-1/2
            transition-all duration-1000 delay-1000 ease-out
            ${
              isVisible
                ? "opacity-70 translate-y-0"
                : "opacity-0 translate-y-12"
            }`}
        >
          {/* <div className="animate-bounce">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default FancyGreeting;
