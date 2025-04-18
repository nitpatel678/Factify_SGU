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
    <div className="text-center bg-gray-900 text-white pt-32 px-4">
      <h2 id="subheading" className="text-2xl sm:text-4xl font-bold mb-4">
        <div className="inline-block w-full max-w-[30ch] break-words mx-auto">
          {showHeading ? (
            <span className="typing-text block">
              Instant News And Fact Score<br />Check With AI
            </span>
          ) : (
            <span className="invisible">
              Instant News And Fact Score<br />Check With AI
            </span>
          )}
        </div>
      </h2>
      <p className="text-base sm:text-xl">
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
