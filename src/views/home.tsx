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
        "As you step into the outer grounds of the Department of Electronic and Telecommunication, you're greeted with a harmonious blend of modern architecture and serene landscapes. This space isn't just a backdrop — it’s a symbol of progress, a place where cutting-edge research begins in the calm of nature and curiosity thrives before you even walk through the doors.",
      imageSrc: "/thumbnails/independence_square.JPG", // Replace with your actual image path
      imageOnRight: true,
      buttonText: "View Prototype",
      buttonLink: "/viewer_independence_square",
    },
    {
      id: 2,
      title: "Hatch Works Auditorium",
      description:
        "Welcome to the vibrant lobby of the department — a space that captures the spirit of collaboration and ambition. With clean architectural lines, open space, and a sense of movement, this is more than just a waiting area. It's where students, faculty, and visionaries converge, where hallway conversations become the seeds of innovation, and where every corridor leads to a new possibility.",
      imageSrc: "/thumbnails/hatch_works.JPG", // Replace with your actual image path
      imageOnRight: false,
      buttonText: "View Prototype",
      buttonLink: "/viewer_hatch_works",
    },
    {
      id: 3,
      title: "Ganeshism Studio Gallery",
      description:
        "Enter the Mobitel Lab — a dynamic ecosystem of technology, ideas, and transformation. This high-performance computing space has witnessed countless student breakthroughs, prototypes, and problem-solving marathons. Equipped with cutting-edge hardware and a forward-thinking atmosphere, the lab is more than a room — it’s a launchpad for the next generation of digital pioneers",
      imageSrc: "/thumbnails/ganeshism.JPG", // Replace with your actual image path
      imageOnRight: true,
      buttonText: "View Prototype",
      buttonLink: "/viewer_ganeshism",
    },
    {
      id: 4,
      title: "Ganeshism Gallery Lobby",
      description:
        "Enter the Mobitel Lab — a dynamic ecosystem of technology, ideas, and transformation. This high-performance computing space has witnessed countless student breakthroughs, prototypes, and problem-solving marathons. Equipped with cutting-edge hardware and a forward-thinking atmosphere, the lab is more than a room — it’s a launchpad for the next generation of digital pioneers",
      imageSrc: "/thumbnails/ganeshism_lobby.JPG", // Replace with your actual image path
      imageOnRight: false,
      buttonText: "View Prototype",
      buttonLink: "/viewer_ganeshism_lobby",
    },
    {
      id: 5,
      title: "Ganeshism Gallery Lobby - XR",
      description:
        "Enter the Mobitel Lab — a dynamic ecosystem of technology, ideas, and transformation. This high-performance computing space has witnessed countless student breakthroughs, prototypes, and problem-solving marathons. Equipped with cutting-edge hardware and a forward-thinking atmosphere, the lab is more than a room — it’s a launchpad for the next generation of digital pioneers",
      imageSrc: "/thumbnails/ganeshism_lobby.JPG", // Replace with your actual image path
      imageOnRight: false,
      buttonText: "View Prototype",
      buttonLink: "/viewer_ganeshism_lobby_XR",
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
            buttonText={card.buttonText}
            buttonLink={card.buttonLink}
          />
        ))}
      </section>
      {/* <TeamSection /> */}
      <Footer />
    </div>
  );
}
