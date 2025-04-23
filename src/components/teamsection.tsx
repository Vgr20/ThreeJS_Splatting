import { useState, useEffect, useRef } from "react";

export default function TeamSection() {
  // State to control which team member is currently visible/fading in
  const [visibleIndex, setVisibleIndex] = useState(-1);

  // State to track if section is in viewport
  const [isVisible, setIsVisible] = useState(false);

  // Reference to the team section container
  const sectionRef = useRef(null);

  // Team members data - replace with your actual team data
  const teamMembers = [
    {
      name: "Vishagar Arunan",
      role: "Team Lead",
      image: "src/assets/team_members/vgr.png",
    },
    {
      name: "Saeedha Nazar",
      role: "XR Developer",
      image: "src/assets/team_members/sae.png",
    },
    {
      name: "Hashiru Pramuditha",
      role: "Software Developer",
      image: "src/assets/team_members/hash.png",
    },
    {
      name: "Vinasirajan Viruthshaan",
      role: "Research Analyst",
      image: "src/assets/team_members/viru.png",
    },
  ];

  // Set up intersection observer to detect when section is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // When section becomes visible
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Once we've detected it's visible, we can stop observing
          observer.disconnect();
        }
      },
      {
        // Start animation when at least 20% of the section is visible
        threshold: 0.2,
      }
    );

    // Start observing the section element
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Clean up observer on unmount
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      if (sectionRef.current) {
        observer.disconnect();
      }
    };
  }, []);

  // Start the animation sequence only when section becomes visible
  useEffect(() => {
    // Only proceed if section is visible
    if (!isVisible) return;

    // Reset visible index
    setVisibleIndex(-1);

    // Set interval to show each team member one at a time
    const interval = setInterval(() => {
      setVisibleIndex((prevIndex) => {
        // Only increment if we haven't shown all members yet
        if (prevIndex < teamMembers.length - 1) {
          return prevIndex + 1;
        }
        // Clear the interval once all members are visible
        clearInterval(interval);
        return prevIndex;
      });
    }, 600); // Show a new team member every 600ms

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, [isVisible, teamMembers.length]);

  return (
    <div
      ref={sectionRef}
      className="py-12 bg-gradient-to-b from-cyan-50 to-sky-100"
    >
      <div className="max-w-6xl mx-auto px-4">
        {/* Section heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-sky-800 mb-2">Our Team</h2>
          <div className="w-24 h-1 bg-cyan-500 mx-auto"></div>
          <p className="mt-4 text-sky-700">
            Meet the talented people behind this project
          </p>
        </div>

        {/* Team members grid */}
        <div className="flex flex-wrap justify-center gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className={`flex flex-col items-center transition-all duration-1000 ease-in-out ${
                index <= visibleIndex
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              {/* Circular image with cyan border */}
              <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-cyan-400 shadow-lg mb-4">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Member details */}
              <h3 className="text-xl font-semibold text-sky-800">
                {member.name}
              </h3>
              <p className="text-cyan-600 mt-1">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
