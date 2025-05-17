import React, { useEffect, useRef, useState } from "react";

/**
 * InfoCard Component with Scroll Animation
 *
 * A reusable component that displays content and an image in an alternating layout.
 * Animates in when scrolled into view.
 *
 * Props:
 * - title: String - The card title
 * - description: String - The card description text
 * - imageSrc: String - Path to the image
 * - imageAlt: String - Alt text for the image
 * - buttonText: String - Text for the call-to-action button
 * - buttonLink: String - Link for the button
 * - imageOnRight: Boolean - Whether to display the image on the right side (default: false)
 */
interface InfoCardProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt?: string;
  buttonText?: string;
  buttonLink?: string;
  imageOnRight?: boolean;
  buttonTextXR?: string;
  buttonLinkXR?: string;
}

const InfoCard: React.FC<InfoCardProps> = ({
  title,
  description,
  imageSrc,
  imageAlt = "Project image",
  buttonText = "View in Browser",
  buttonTextXR = "View in XR",
  buttonLink = "#",
  buttonLinkXR = "#",
  imageOnRight = false,
}) => {
  const cardRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Create an Intersection Observer instance
    const observer = new IntersectionObserver(
      ([entry]) => {
        // When the card enters the viewport, set isVisible to true
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Once it's visible, we don't need to observe it anymore
          if (cardRef.current) {
            observer.unobserve(cardRef.current);
          }
        }
      },
      {
        // Card will start animating when it's 10% in view
        threshold: 0.1,
        // Start observing slightly before the element comes into view
        rootMargin: "0px 0px -50px 0px",
      }
    );

    // Start observing the card element
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    // Clean up observer on component unmount
    return () => {
      if (cardRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  // Define animation classes based on layout and visibility
  const contentAnimationClass = isVisible
    ? `opacity-100 ${imageOnRight ? "translate-x-0" : "translate-x-0"}`
    : `opacity-0 ${imageOnRight ? "-translate-x-full" : "translate-x-full"}`;

  const imageAnimationClass = isVisible
    ? `opacity-100 ${imageOnRight ? "translate-x-0" : "translate-x-0"}`
    : `opacity-0 ${imageOnRight ? "translate-x-full" : "-translate-x-full"}`;

  return (
    <div
      ref={cardRef}
      className="container mx-auto py-12 px-4 md:px-8 overflow-hidden"
    >
      <div
        className={`flex flex-col ${
          imageOnRight ? "md:flex-row" : "md:flex-row-reverse"
        } gap-8 items-center`}
      >
        {/* Content Section with animation */}
        <div
          className={`w-full md:w-1/2 space-y-4 transition-all duration-1000 ease-out ${contentAnimationClass}`}
        >
          <h2 className="text-3xl font-bold text-cyan-950">{title}</h2>
          <p className="text-gray-600 text-lg leading-relaxed">{description}</p>
          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href={buttonLink}
              className="inline-block px-6 py-2 bg-cyan-700 text-white rounded-lg shadow-cyan-800 shadow-md hover:shadow-lg hover:shadow-cyan-800 hover:bg-cyan-900 transition-colors"
            >
              {buttonText}
            </a>
            <a
              href={buttonLinkXR}
              className="inline-block px-6 py-2 bg-cyan-700 text-white rounded-lg shadow-cyan-800 shadow-md hover:shadow-lg hover:shadow-cyan-800 hover:bg-cyan-900 transition-colors"
            >
              {buttonTextXR}
            </a>
          </div>
        </div>

        {/* Image Section with animation */}
        <div
          className={`w-full md:w-1/2 transition-all duration-1000 ease-out ${imageAnimationClass}`}
        >
          <img
            src={imageSrc}
            alt={imageAlt}
            className="w-10/12 h-auto rounded-xl shadow-sky-800 shadow-lg hover:shadow-xl transition-shadow duration-300"
          />
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
