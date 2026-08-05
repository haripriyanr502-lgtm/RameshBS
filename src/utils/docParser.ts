import { SectionKey, CategorizedParagraph, PortfolioData } from '../types/portfolio';

// Keyword rules for intelligent section classification
const KEYWORDS: Record<SectionKey, string[]> = {
  about: [
    'biography', 'bio', 'vision', 'mission', 'about', 'background', 'philosophy', 
    'values', 'overview', 'introduction', 'who is', 'highlights', 'born', 'education', 
    'personal statement', 'summary', 'doctor', 'dr.', 'champion'
  ],
  lionistic: [
    'lion', 'lions', 'lionistic', 'district governor', 'council chairperson', 
    'international director', 'lcif', 'melvin jones', 'we serve', 'leo club', 
    'sightfirst', 'humanitarian', 'charity drive', 'service mission', 'district 300',
    'ambassador of goodwill', 'motto', 'fellowship'
  ],
  services: [
    'services', 'service', 'advisory', 'consulting', 'keynote', 'speaking', 
    'governance', 'board member', 'strategy', 'expertise', 'capabilities', 
    'solutions', 'mentorship', 'workshops', 'csr strategy', 'executive coaching'
  ],
  hobbies: [
    'hobby', 'hobbies', 'passion', 'passions', 'golf', 'art', 'collecting', 
    'music', 'horology', 'sailing', 'mountaineering', 'reading', 'personal life', 
    'sports', 'interests', 'leisure', 'travel', 'photography'
  ],
  career: [
    'career', 'experience', 'position', 'designation', 'ceo', 'president', 
    'director', 'managing director', 'work history', 'employment', 'responsibilities', 
    'achievements', 'awards', 'certificates', 'resume', 'cv', 'vanguard', 'helvetia',
    'tenure', 'corporate', 'company', 'company name', 'honors'
  ]
};

export function classifyTextParagraph(paragraphText: string): { suggestedSection: SectionKey; confidence: number; heading?: string } {
  const clean = paragraphText.trim().toLowerCase();
  if (!clean) {
    return { suggestedSection: 'about', confidence: 0 };
  }

  // Detect potential heading line
  let heading: string | undefined;
  if (paragraphText.length < 80 && !paragraphText.endsWith('.')) {
    heading = paragraphText.trim();
  }

  const scores: Record<SectionKey, number> = {
    about: 0,
    lionistic: 0,
    services: 0,
    hobbies: 0,
    career: 0
  };

  for (const [section, words] of Object.entries(KEYWORDS) as [SectionKey, string[]][]) {
    for (const word of words) {
      const regex = new RegExp(`\\b${word}\\b`, 'gi');
      const matches = clean.match(regex);
      if (matches) {
        // Direct title matches get higher weight
        scores[section] += matches.length * (word.length > 5 ? 2.5 : 1.5);
      }
    }
  }

  // Find section with highest score
  let maxScore = 0;
  let bestSection: SectionKey = 'about'; // default fallback

  for (const [sec, score] of Object.entries(scores) as [SectionKey, number][]) {
    if (score > maxScore) {
      maxScore = score;
      bestSection = sec;
    }
  }

  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);
  const confidence = totalScore > 0 ? Math.min(100, Math.round((maxScore / totalScore) * 100)) : 40;

  return {
    suggestedSection: bestSection,
    confidence,
    heading
  };
}

export function parseAndCategorizeDocument(fullText: string): CategorizedParagraph[] {
  // Split into double-newline or single-line blocks
  const paragraphs = fullText
    .split(/\n\s*\n/)
    .map(p => p.trim())
    .filter(p => p.length > 0);

  return paragraphs.map(p => {
    const classification = classifyTextParagraph(p);
    return {
      text: p,
      suggestedSection: classification.suggestedSection,
      confidence: classification.confidence,
      extractedHeading: classification.heading
    };
  });
}

export function applyParsedContentToPortfolio(
  currentData: PortfolioData,
  categorized: CategorizedParagraph[]
): PortfolioData {
  const updated = JSON.parse(JSON.stringify(currentData)) as PortfolioData;

  const aboutParagraphs: string[] = [];
  const lionisticParagraphs: string[] = [];
  const servicesParagraphs: string[] = [];
  const hobbiesParagraphs: string[] = [];
  const careerParagraphs: string[] = [];

  for (const item of categorized) {
    switch (item.suggestedSection) {
      case 'about':
        aboutParagraphs.push(item.text);
        break;
      case 'lionistic':
        lionisticParagraphs.push(item.text);
        break;
      case 'services':
        servicesParagraphs.push(item.text);
        break;
      case 'hobbies':
        hobbiesParagraphs.push(item.text);
        break;
      case 'career':
        careerParagraphs.push(item.text);
        break;
    }
  }

  if (aboutParagraphs.length > 0) {
    updated.about.biography = aboutParagraphs;
  }
  if (lionisticParagraphs.length > 0) {
    updated.lionisticJourney.overview = lionisticParagraphs.join('\n\n');
  }
  if (servicesParagraphs.length > 0) {
    updated.services.description = servicesParagraphs.join('\n\n');
  }
  if (hobbiesParagraphs.length > 0) {
    updated.hobbies.description = hobbiesParagraphs.join('\n\n');
  }
  if (careerParagraphs.length > 0) {
    updated.career.subheading = careerParagraphs[0];
  }

  return updated;
}
