import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { urls } = body;

    if (!urls || !Array.isArray(urls) || urls.length < 2) {
      return NextResponse.json(
        { error: 'Please provide at least 2 URLs for comparison.' },
        { status: 400 }
      );
    }

    let analysisData;
    let usedMockData = false;

    // Check if the API key is present
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === "your_api_key_here") {
      console.warn("No valid GEMINI_API_KEY found. Falling back to mock data for demonstration.");
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate delay
      analysisData = getMockData(urls);
      usedMockData = true;
    } else {
      try {
        const ai = new GoogleGenAI({});
        const prompt = `
          Perform a comprehensive competitor analysis for the following companies based on their URLs:
          ${urls.join(", ")}
          
          Return a JSON response containing the following structure:
          {
            "executiveSummary": "A 2-paragraph summary comparing these companies, identifying the leader, and pointing out market gaps.",
            "strengths": ["...", "...", "..."],
            "weaknesses": ["...", "...", "..."],
            "opportunities": ["...", "...", "..."],
            "threats": ["...", "...", "..."],
            "marketPositionScore": 85,
            "recommendations": [
              {"category": "Product", "action": "..."},
              {"category": "Marketing", "action": "..."}
            ]
          }
          Only return valid JSON without markdown blocks.
        `;

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
          config: {
            responseMimeType: "application/json",
          }
        });

        const text = response.text || "{}";
        analysisData = JSON.parse(text);
      } catch (aiError) {
        console.error("AI Generation Error, falling back to mock data:", aiError);
        analysisData = getMockData(urls);
        usedMockData = true;
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        analysisId: `analysis_${Math.random().toString(36).substring(7)}`,
        urlsAnalyzed: urls,
        analysis: analysisData,
        usedMockData: usedMockData,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: 'Internal Server Error.' },
      { status: 500 }
    );
  }
}

// Helper to return structured mock data so the dashboard always works
function getMockData(urls: string[]) {
  const company1 = urls[0].replace("https://", "").split(".")[0];
  const company2 = urls[1].replace("https://", "").split(".")[0];
  
  return {
    executiveSummary: `Based on our simulated analysis, **${company1}** is currently positioned as a strong challenger against **${company2}**. While ${company2} holds a larger overall market share, ${company1} leads in innovation and feature velocity. There is a clear market gap in the mid-tier pricing segment that ${company1} can exploit to accelerate growth.`,
    strengths: [
      "Intuitive, modern user interface",
      "Robust AI capabilities integrated natively",
      "Competitive pricing for entry-level tier"
    ],
    weaknesses: [
      "Limited integrations with legacy CRM systems",
      "Brand recognition is lower than top competitor"
    ],
    opportunities: [
      "Expansion into European markets",
      "Partnership with digital marketing agencies",
      "Launch of enterprise-specific features"
    ],
    threats: [
      `${company2} releasing a similar feature set`,
      "Economic downturn affecting software budgets"
    ],
    marketPositionScore: 82,
    recommendations: [
      {
        category: "Product Strategy",
        action: `Develop native CRM integrations to close the enterprise gap with ${company2}.`
      },
      {
        category: "Marketing & SEO",
        action: "Double down on specialized long-tail keywords where you currently have a slight lead."
      },
      {
        category: "Pricing Strategy",
        action: `Introduce a mid-tier plan to capture users churning from ${company2}'s high price jumps.`
      }
    ]
  };
}
