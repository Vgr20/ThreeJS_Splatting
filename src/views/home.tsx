import Navbar from "../components/navbar";
import VideoPlayer from "../components/videoplayer";
import InfoCard from "../components/infocard";
import FancyGreeting from "../components/greeting";
// import TeamSection from "../components/teamsection";
import Footer from "../components/footer";

export default function Home() {
  const cardData = [
    {
      id: 1,
      title: "Independence Memorial Museum",
      description:
        "Located beneath the Independence Memorial Hall in Colombo, the Independence Memorial Museum honors national heroes who played key roles in Sri Lanka’s struggle for independence. This simple 3D/VR experience lets you explore the main gallery, which features busts and displays of political leaders, clergy, and patriots.",
      imageSrc: "/thumbnails/independence_square.JPG", // Replace with your actual image path
      imageOnRight: true,
      buttonLink: "/viewer_independence_square",
      buttonLinkXR: "/viewer_independence_square_XR",
    },
    {
      id: 2,
      title: "Hatch Works Auditorium",
      description:
        "Looking for a creative and well-equipped venue in the heart of Colombo? The Hatchery at Hatch Works offers a cozy, tiered-seating auditorium ideal for talks, screenings, workshops, or small events. With built-in projection facilities, and modern lighting, this space combines functionality with a casual, collaborative vibe. Perfect for teams, startups, and community meetups.",
      imageSrc: "/thumbnails/hatch_works.JPG", // Replace with your actual image path
      imageOnRight: false,
      buttonLink: "/viewer_hatch_works",
      buttonLinkXR: "/viewer_hatch_works_XR",
    },
    {
      id: 3,
      title: "Ganeshism Studio Gallery",
      description:
        "Step into the Ganeshism Studio Gallery, a serene space dedicated to Indian spiritual art. This collection features deeply symbolic and inspirational works rooted in tradition, mindfulness, and devotion. Whether you’re visiting to admire the art or looking to order a meaningful piece, the gallery offers a peaceful setting to connect with the spirit of creativity and culture.",
      imageSrc: "/thumbnails/ganeshism.JPG", // Replace with your actual image path
      imageOnRight: true,
      buttonLink: "/viewer_ganeshism",
      buttonLinkXR: "/viewer_ganeshism_XR",
    },
    {
      id: 4,
      title: "Ganeshism Gallery Lobby",
      description:
        "A peaceful entry space surrounded by nature, the Ganeshism Gallery Lobby blends art and ambiance. With an indoor garden view, soft lighting, and a cozy living area, it offers a quiet setting where artwork gently comes to life — perfect for reflection or relaxed conversation.",
      imageSrc: "/thumbnails/ganeshism_lobby.JPG", // Replace with your actual image path
      imageOnRight: false,
      buttonLink: "/viewer_ganeshism_lobby",
      buttonLinkXR: "/viewer_ganeshism_lobby_XR",
    },
    // Add more cards as needed
  ];

  return (
    <div className="flex flex-col bg-sky-100 min-h-screen">
      <Navbar />
      <VideoPlayer
        videoSrc="/fetchseed_website_cropped.mp4"
        posterSrc="https://www.w3schools.com/html/pic.jpg"
        height="640px"
        objectFit="cover"
        muted={true}
        loop={true}
        controls={false}
      />
      <FancyGreeting />
      {/* Info Cards Section */}
      <section className="py-8">
        {cardData.map((card) => (
          <InfoCard
            key={card.id}
            title={card.title}
            description={card.description}
            imageSrc={card.imageSrc}
            imageAlt={`Project ${card.id}`}
            imageOnRight={card.imageOnRight}
            // buttonText={card.buttonText}
            buttonLink={card.buttonLink}
            buttonLinkXR={card.buttonLinkXR}
          />
        ))}
      </section>
      {/* <TeamSection /> */}
      <Footer />
    </div>
  );
}
