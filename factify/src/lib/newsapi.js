const apikey = "ritogad461@mobilesm.com";
export async function getNewsApiArticles(claim) {
    try {
      const res = await fetch(`https://newsapi.org/v2/everything?q=${encodeURIComponent(claim)}&apiKey=${apikey}`);
      const data = await res.json();
  
      if (data?.articles?.length > 0) {
        return {
          articles: data.articles.slice(0, 3).map(article => ({
            title: article.title,
            url: article.url,
            source: article.source?.name || 'Unknown',
            description: article.description,
            publishedAt: article.publishedAt
          }))
        };
      }
  
      return null;
    } catch (error) {
      console.error('NewsAPI error:', error);
      return null;
    }
  }