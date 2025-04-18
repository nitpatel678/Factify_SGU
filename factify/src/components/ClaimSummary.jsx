import { ChevronDown, ChevronRight, Loader2, Search } from 'lucide-react';
import { useState } from 'react';
import { getNewsApiArticles } from '../lib/newsapi.js';
import { getGoogleFactCheck } from '../lib/googleFactCheck.js';
import { verifyClaim } from '../lib/factVerfication.js';

export default function ClaimSummary() {
  const [expanded, setExpanded] = useState(false);
  const [verdict, setVerdict] = useState('Unclear');
  const [confidence, setConfidence] = useState(0);
  const [biasVisible, setBiasVisible] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [explanation, setExplanation] = useState('');
  const [relatedArticles, setRelatedArticles] = useState([]);

  const handleSearch = async () => {
    setLoading(true);
    setConfidence(0);
    setVerdict('Unclear');
    setExplanation('');
    setRelatedArticles([]);
    setBiasVisible(false);

    let allRelated = [];

    try {
      // Only using Google Fact Check and NewsAPI
      const [googleResult, newsApiResult] = await Promise.all([
        getGoogleFactCheck(input),
        getNewsApiArticles(input)
      ]);

      if (googleResult?.related) allRelated.push(...googleResult.related);
      if (newsApiResult?.articles) allRelated.push(...newsApiResult.articles);

      // Deduplicate articles by URL
      allRelated = allRelated.filter((article, index, self) => 
        index === self.findIndex(a => a.url === article.url)
      );

      const factCheckResult = await verifyClaim(input, {
        relatedArticles: allRelated
      });

      setVerdict(factCheckResult.verdict || 'Unclear');
      setConfidence(factCheckResult.confidence || 0);
      setExplanation(factCheckResult.explanation || 'No explanation available.');
      setRelatedArticles(allRelated);

      if (/politic|government|party|minister|president|election/i.test(input)) {
        setBiasVisible(true);
      }
    } catch (error) {
      console.error("Error during fact-checking:", error);
      setExplanation(`Error during fact-checking: ${error.message}`);
    }

    setExpanded(true);
    setLoading(false);
  };

  return (
<div className=" bg-gray-900 overflow-hidden">

    <div className="border ml-5 mr-5 mt-20  bg-gray-800 rounded-lg overflow-hidden">
      <div className="p-4 flex justify-between items-center">
        <h3 id='subheading' className="text-2xl text-white font-semibold">Claim</h3>
      </div>

      <div className="px-4 pb-4 flex gap-2">
        <input
          type="text"
          placeholder="Paste a statement or article below"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 dark:text-white"
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          className="bg-white hover:bg-gray-200 text-black p-3 rounded-2xl flex items-center justify-center w-12"
        >
          {loading ? <Loader2 className="animate-spin" size={20} /> : <Search size={20} />}
        </button>
      </div>

      <div className="border-t border-gray-300 dark:border-gray-700 p-4">
        <div className="flex items-start mb-6">
          <div className={`text-white rounded-full p-1 mr-3 mt-1 ${verdict === 'Likely True' ? 'bg-green-500' : verdict === 'Likely False' ? 'bg-red-500' : 'bg-yellow-500'}`}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <div>
            <h4 className="text-2xl font-semibold mb-1 dark:text-white">{verdict}</h4>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-600 pt-4 mb-4">
          <div className="flex items-start mb-2">
            <div className="bg-teal-500 text-white rounded-full p-1 mr-3 mt-1">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
              </svg>
            </div>
            <h4 id='subheading' className="text-xl text-white font-semibold">Confidence score</h4>
          </div>

          <div className="flex justify-between items-center mb-6">
            <div className="relative">
              <p className="mb-2 text-white">{confidence}%</p>
              <div className="h-2 w-64 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden relative">
                <div
                  className="absolute top-[-6px] w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[10px] border-b-black dark:border-b-white"
                  style={{ left: `${(confidence / 100) * 256}px` }}
                ></div>
                <div className="bg-white h-full" style={{ width: `${confidence}%` }}></div>
              </div>
            </div>

            {biasVisible && (
              <div className="text-center">
                <p id='paragraph' className="text-lg font-semibold mb-2 text-white gap-2">Bias<span className="font-semibold">Meter</span></p>
                <div className="relative inline-block">
                  <div className="w-32 h-32 rounded-full border-12 border-blue-100 dark:border-gray-600 flex items-center justify-center">
                    <div className="relative flex items-center justify-center">
                      <svg viewBox="0 0 100 100" className="w-32 h-32 absolute">
                        <circle
                          cx="50" cy="50" r="45"
                          fill="none"
                          stroke="#ffffff"
                          strokeWidth="10"
                          strokeDasharray="283"
                          strokeDashoffset={`${(100 - confidence) * 2.83}`}
                          transform="rotate(-90 50 50)"
                        />
                      </svg>
                      <span className="text-3xl font-bold text-white">{confidence}%</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-600 pt-4 mb-4">
          <h4 id='subheading' className="text-xl font-semibold mb-4 text-white">Related News</h4>
          <div className="space-y-3">
            {relatedArticles.length > 0 ? (
              relatedArticles.slice(0, 5).map((article, idx) => (
                <div key={idx} className="flex items-start">
                  <div className="text-blue-500 mr-2">
                    <ChevronRight size={20} />
                  </div>
                  <a href={article.url || article.link || '#'} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                    {article.title || 'Related article'}
                  </a>
                </div>
              ))
            ) : (
              <p className="text-white">No related articles found.</p>
            )}
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
          <button id='subheading'
            className="flex justify-between items-center w-full text-xl font-semibold text-white"
            onClick={() => setExpanded(!expanded)}
          >
            <span>AI Explanation</span>
            {expanded ? <ChevronDown size={24} /> : <ChevronRight size={24} />}
          </button>
          {expanded && (
            <div className="pt-4 text-white">
              <p>{explanation}</p>
            </div>
          )}
        </div>
      </div>
    </div>
    </div>  
  );
}
