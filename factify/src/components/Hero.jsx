import React, { useEffect, useState } from 'react';

export default function Hero() {
  const [showHeading, setShowHeading] = useState(false);
  const [showParagraph, setShowParagraph] = useState(false);

  useEffect(() => {
    const headingTimer = setTimeout(() => {
      setShowHeading(true);
    }, 100); 

    const paragraphTimer = setTimeout(() => {
      setShowParagraph(true);
    }, 2500); 
    return () => {
      clearTimeout(headingTimer);
      clearTimeout(paragraphTimer);
    };
  }, []);

  return (
    <div className="text-center bg-gray-900 text-white pt-32">
      <h2 id="subheading" className="text-4xl font-bold mb-4">
        <div className="inline-block w-[35ch] mx-auto">
          {showHeading ? (
            <span className="typing-text block">
              Instant News And Fact Credibility<br />Check With AI
            </span>
          ) : (
            <span className="invisible">
              Instant News And Fact Credibility<br />Check With AI
            </span>
          )}
        </div>
      </h2>
      <p className="text-xl">
        {showParagraph ? (
          <span className="slide-down block">
            Fact-check any article or statement using<br />GPT-powered analysis
          </span>
        ) : (
          <span className="invisible">
            Fact-check any article or statement using<br />GPT-powered analysis
          </span>
        )}
      </p>
    </div>
  );
}
