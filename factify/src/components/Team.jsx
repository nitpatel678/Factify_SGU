import React from "react";

const teamMembers = [
  {
    name: "Nitin Sengar",
    role: "Frontend Developer",
    image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg", // Pexels URL
  },
  {
    name: "Nitin Patel",
    role: "API & Workflow Management",
    image: "https://randomuser.me/api/portraits/men/75.jpg", // Web image
  },
  {
    name: "Naman Dixit",
    role: "AI Researcher",
    image: "https://images.unsplash.com/photo-1603415526960-f7e0328ddcdd", // Unsplash
  },
  {
    name: "Palak Chauhan",
    role: "UI/UX Designer",
    image: "https://ibb.co/TGLD2yc", // Another web image
  },
];

export default function Team() {
  return (
    <section className="bg-gray-800 py-16 px-6 md:px-20">
      <div className="max-w-6xl mx-auto text-center text-white">
        <h2 className="text-4xl font-bold mb-12">Meet Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-gray-700 rounded-xl p-6 hover:shadow-lg transition-all"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-32 h-32 mx-auto rounded-full object-cover border-4 border-white mb-4"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/team/default-avatar.png"; // fallback local image
                }}
              />
              <h4 className="text-xl font-semibold">{member.name}</h4>
              <p className="text-gray-300">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

