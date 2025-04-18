import React from "react";
// import "./Team.css"; // Optional: for hover effect styles

const teamMembers = [
  {
    name: "Nitin Sengar",
    role: "Frontend Developer",
    image: "https://github.com/nitpatel678/Factify_SGU/blob/main/factify/src/lib/images/nitinsengar.jpg?raw=true",
  },
  {
    name: "Nitin Patel",
    role: "API & Workflow Management",
    image: "https://github.com/nitpatel678/Factify_SGU/blob/main/factify/src/lib/images/nitinpatel.jpg?raw=true",
  },
  {
    name: "Naman Dixit",
    role: "AI Researcher",
    image: "https://github.com/nitpatel678/Factify_SGU/blob/main/factify/src/lib/images/namadixit.jpg?raw=true",
  },
  {
    name: "Palak Chauhan",
    role: "UI/UX Designer",
    image: "https://github.com/nitpatel678/Factify_SGU/blob/main/factify/src/lib/images/palakchauhan.jpg?raw=true",
  },
];

export default function Team() {
  return (
    <section className="bg-gray-900 py-16 px-6 md:px-20">
      <div className="max-w-6xl mx-auto text-center text-white">
        <h2 id="subheading" className="text-4xl font-bold mb-12">Meet Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-xl p-6 hover:shadow-lg transition-all"
            >
              <img
                src={member.image}
                alt={member.name}
                className="img-hover-effect w-32 h-32 mx-auto rounded-full object-cover border-4 border-white mb-4"
              />
              <h4 id="paragraph" className="text-xl font-semibold">{member.name}</h4>
              <p id="paragraph" className="text-gray-400">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
