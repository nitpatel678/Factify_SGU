// AboutUs.jsx
import React from "react";

export default function AboutUs() {
  return (
    <section id="about" className="bg-gray-900 text-white py-16 px-6 md:px-20">
      <div className="max-w-5xl mx-auto text-center">
        <h2 id="subheading" className="text-4xl font-bold mb-6">About Factify</h2>
        <p id="paragraph" className="text-lg text-gray-300 leading-relaxed">
          Factify is your trusted companion in the fight against misinformation. Our platform leverages cutting-edge AI and real-time web search to verify the authenticity of claims and news articles. 
        </p>
        <p id="paragraph" className="text-lg text-gray-300 leading-relaxed mt-4">
          With an easy-to-use interface and deep API integrations, Factify empowers users to make informed decisions by separating facts from fiction — one claim at a time.
        </p>
      </div>
    </section>
  );
}
