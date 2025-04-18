export async function getGoogleFactCheck(claim) {
    try {
      const res = await fetch(`https://factchecktools.googleapis.com/v1alpha1/claims:search?key=AIzaSyAFSwDTYB2rsP3hX2F7PMLghRts68f-h_4&query=${encodeURIComponent(claim)}`);
      const data = await res.json();
  
      if (data?.claims?.length > 0) {
        const claimReview = data.claims[0].claimReview?.[0];
        return {
          verdict: claimReview.textualRating || 'Possibly True',
          confidence: 80,
          explanation: claimReview.title,
          related: [{
            title: claimReview.publisher.name,
            url: claimReview.url
          }]
        };
      }
  
      return null;
    } catch (error) {
      console.error('Google Fact Check error:', error);
      return null;
    }
  }
  