import Image from "next/image";

const achievementData = [
  {
    title: "Student Showcase",
    img: "/images/achievements/achievement-1.avif",
    delay: "0s",
  },
  {
    title: "Design Awards",
    img: "/images/achievements/achievement-2.avif",
    delay: "0.2s",
  },
  {
    title: "Creative Expo",
    img: "/images/achievements/achievement-3.avif",
    delay: "0.4s",
  },
  {
    title: "Fashion Fest",
    img: "/images/achievements/achievement-4.avif",
    delay: "0.6s",
  },
];

export default function AchievementsPage() {
  return (
    <section className="py-12 bg-[#FBF6EE]">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-heading text-center text-[#4A2511] mb-8">
          Our Achievements
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
          {achievementData.map((item, i) => (
            <div
              key={i}
              className="achievement-card"
              style={{ "--delay": item.delay } as React.CSSProperties}
            >
              <div className="relative p-6">
                <h3 className="font-heading text-xl text-[#4A2511] mb-4">
                  {item.title}
                </h3>
                <Image
                  src={item.img}
                  alt={item.title}
                  width={640}
                  height={480}
                  className="rounded-lg object-cover w-full h-auto"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
