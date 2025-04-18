const mistralai_api_key = "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";
const deepseek_api_key = "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";

export const verifyClaim = async (claim, options = {}) => {
  const {
    originalUrl = null,
    fullContent = "",
    relatedArticles = []
  } = options;

  const extractedClaimFromUrl = extractClaimFromUrl(originalUrl);
  const finalClaim = extractedClaimFromUrl || claim;

  const newsContext = buildNewsContext(relatedArticles);
  const urlContext = originalUrl ? `Claim Source URL: ${originalUrl}\n\n` : "";
  let contentContext = "";

  if (fullContent && fullContent.length > 0) {
    const trimmedContent = fullContent.length > 5000
      ? fullContent.substring(0, 5000) + "... (content truncated)"
      : fullContent;
    contentContext = `Extracted Content:\n"${trimmedContent}"\n\n`;
  }

  const systemPrompt = `You are a professional fact-checking assistant using real-time web data to assess truthfulness.
Evaluate the claim using logic, reasoning, and relevant news. Give output in strict JSON.`;

  const userPrompt = `${urlContext}${contentContext}${newsContext}
Fact-check the following claim based on recent and credible information:

"${finalClaim}"

Format the response strictly as:
{
  "verdict": "Likely True" | "Likely False" | "Unclear",
  "confidence": 0-100,
  "explanation": "Detailed reasoning with sources or logical analysis."
}
`;

  const deepSeekResponse = await queryDeepSeek(systemPrompt, userPrompt);

  if (deepSeekResponse.verdict === "Unclear" || deepSeekResponse.confidence < 60) {
    const mixtralResponse = await queryMixtral(systemPrompt, userPrompt);
    return { ...mixtralResponse, model: "Mixtral (Fallback)", searchedWith: finalClaim };
  }

  return { ...deepSeekResponse, model: "DeepSeek V3", searchedWith: finalClaim };
};

const extractClaimFromUrl = (url) => {
  try {
    const urlObj = new URL(url);
    const segments = urlObj.pathname
      .split('/')
      .filter(seg => seg.length > 3 && !/^\d+$/.test(seg));
    const raw = segments.join(' ');
    const claim = raw.replace(/[-_]/g, ' ').trim();
    return claim.length > 10 ? claim : '';
  } catch {
    return '';
  }
};

const queryDeepSeek = async (systemPrompt, userPrompt) => {
  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${deepseek_api_key}`,
        "HTTP-Referer": window.location.origin,
        "X-Title": "Factify"
      },
      body: JSON.stringify({
        model: "deepseek-ai/deepseek-coder-v1.5",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        temperature: 0.2,
        max_tokens: 1500
      })
    });

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";

    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      const parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : JSON.parse(content);
      return {
        verdict: parsed.verdict || "Unclear",
        confidence: parsed.confidence || 50,
        explanation: parsed.explanation || content,
        rawOutput: content
      };
    } catch (e) {
      return {
        verdict: "Unclear",
        confidence: 50,
        explanation: `Could not parse DeepSeek output. Raw: ${content}`
      };
    }
  } catch (err) {
    return {
      verdict: "Unclear",
      confidence: 0,
      explanation: `DeepSeek request failed: ${err.message}`
    };
  }
};

const queryMixtral = async (systemPrompt, userPrompt) => {
  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${mistralai_api_key}`,
        "HTTP-Referer": window.location.origin,
        "X-Title": "Factify"
      },
      body: JSON.stringify({
        model: "mistralai/mixtral-8x7b-instruct",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        temperature: 0.2,
        max_tokens: 1500
      })
    });

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";

    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      const parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : JSON.parse(content);
      return {
        verdict: parsed.verdict || "Unclear",
        confidence: parsed.confidence || 50,
        explanation: parsed.explanation || content,
        rawOutput: content
      };
    } catch (e) {
      return {
        verdict: "Unclear",
        confidence: 50,
        explanation: `Could not parse Mixtral output. Raw: ${content}`
      };
    }
  } catch (err) {
    return {
      verdict: "Unclear",
      confidence: 0,
      explanation: `Mixtral request failed: ${err.message}`
    };
  }
};

const buildNewsContext = (articles) => {
  if (!articles?.length) return "";
  return "Related News Articles:\n\n" + articles.map((a, i) => (
    `${i + 1}. "${a.title}" from ${a.source || 'Unknown'}\n` +
    (a.description ? `   Summary: ${a.description}\n` : '') +
    `   URL: ${a.link || a.url}\n` +
    (a.publishedAt ? `   Published: ${a.publishedAt}\n` : '')
  )).join("\n");
};
