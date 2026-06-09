import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { AnalysisInput } from '@/types/analysis';

export const maxDuration = 60; // Allow up to 60 seconds
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const input: AnalysisInput = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: 'GEMINI_API_KEY is not set in environment variables.' }, { status: 500 });
    }

    const ai = new GoogleGenAI({ apiKey });

    // Construct the prompt to demand the specific JSON schema
    const prompt = `You are an expert competitive intelligence analyst and management consultant.
You must perform a deep competitive analysis for the company: "${input.companyName}" (${input.companyWebsite}).
Their industry is: "${input.industry}".
Their target market is: "${input.targetMarket}".
Their main competitors are: ${input.competitors.join(", ")}.

Your task is to generate a comprehensive, data-driven analysis with real facts, actual product names, real features, known pricing (if public), and recent news.
Do NOT use generic placeholders like "Competitor A" or "Feature X". Use real names, real features, and real market positioning.

CRITICAL INSTRUCTION: Keep all text fields extremely concise (maximum 1-2 short sentences per string). If you write too much, the system will crash. Focus on raw data and bullet-point brevity.

OUTPUT FORMAT REQUIREMENTS:
You MUST return ONLY valid JSON matching the exact schema below. Do not include markdown code blocks or any other text before or after the JSON.

{
  "overview": { "summary": "string", "businessModel": "string", "targetAudience": "string" },
  "executiveSummary": { "marketPosition": "string", "keyStrengths": ["string"], "keyWeaknesses": ["string"], "biggestOpportunities": ["string"], "majorThreats": ["string"], "recommendedNextActions": ["string"], "marketSizeEstimate": "string", "marketSaturationIndex": 0-100, "aiConfidenceScore": 0-100 },
  "healthScores": { "overall": 0-100, "competitive": 0-100, "innovation": 0-100, "seo": 0-100, "marketing": 0-100, "customerExperience": 0-100, "revenueGrowthPotential": 0-100, "risk": 0-100, "explanations": { "overall": "string", "competitive": "string" } },
  "marketShare": { "myCompany": { "share": 0-100, "trend": "up" | "down" | "flat" }, "competitors": [ { "name": "string", "share": 0-100, "trend": "up"| "down"| "flat" } ], "others": 0-100, "explanation": "string", "insights": "string", "confidence": "High" | "Medium" | "Low" },
  "positioning": { "myCompany": { "presence": 0-100, "innovation": 0-100 }, "competitors": [ { "name": "string", "presence": 0-100, "innovation": 0-100 } ], "quadrantInsights": { "leaders": "string", "challengers": "string", "visionaries": "string", "nichePlayers": "string" } },
  "swot": { "strengths": [ {"text": "string", "impactScore": 0-100, "priority": "High"} ], "weaknesses": [], "opportunities": [], "threats": [], "aiConfidence": 0-100 },
  "trends": { "historical": [ {"month": "string", "industry": 0-100, "myCompany": 0-100, "competitorAvg": 0-100} ], "forecast": [ {"year": "string", "projectedRevenue": 0-100, "industryAverage": 0-100} ] },
  "battleCards": [ { "name": "string", "overview": "string", "strengths": ["string"], "weaknesses": ["string"], "pricing": "string", "keyCustomers": ["string"], "techStack": ["string"], "marketPosition": "string", "winLossStrategy": { "howToWin": ["string"], "whyWeLose": ["string"] } } ],
  "liveFeed": [ { "id": "string", "competitor": "string", "type": "News", "content": "string", "date": "string", "impact": "High" } ],
  "multiPerspective": { "ceo": { "insights": ["string"], "risks": ["string"], "opportunities": ["string"] }, "marketing": { "insights": [], "risks": [], "opportunities": [] }, "sales": { "insights": [], "risks": [], "opportunities": [] }, "customer": { "insights": [], "risks": [], "opportunities": [] }, "investor": { "insights": [], "risks": [], "opportunities": [] } },
  "comparisonData": { "features": [ { "category": "string", "myCompany": true, "c1": "string" } ], "radarMetrics": [ { "metric": "string", "myCompany": 0-100, "c1": 0-100 } ], "pricing": [ { "tier": "string", "myCompany": "string", "c1": "string" } ] },
  "marketGaps": { "missingFeatures": ["string"], "untappedSegments": ["string"], "pricingOpportunities": ["string"], "industryTrends": ["string"], "competitorWeaknesses": ["string"] },
  "dynamicRecommendations": { "product": [ { "title": "string", "explanation": "string", "reasoning": "string", "expectedImpact": "string", "implementationDifficulty": "High", "estimatedROI": "string", "priorityLevel": "High", "actionPlan": ["string"] } ], "marketing": [], "seo": [], "sales": [], "customerExperience": [], "revenue": [] }
}

Ensure that EVERY FIELD in the schema is provided, especially 'battleCards', 'swot', 'comparisonData', and 'dynamicRecommendations'. 
Ensure that 'comparisonData.features' and 'comparisonData.pricing' use the actual names of the competitors as keys (e.g., "${input.competitors[0] || 'competitor1'}": true).
`;

    // Try generating content stream
    const stream = await ai.models.generateContentStream({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        temperature: 0.2,
        tools: [{ googleSearch: {} }]
      }
    });

    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            if (chunk.text) {
              controller.enqueue(new TextEncoder().encode(chunk.text));
            }
          }
          controller.close();
        } catch (err) {
          controller.error(err);
        }
      }
    });

    return new Response(readable, {
      headers: { 'Content-Type': 'text/plain' }
    });

  } catch (error: any) {
    console.error("API Analyze Error:", error);
    return NextResponse.json({ error: error.message || 'Failed to generate analysis' }, { status: 500 });
  }
}
