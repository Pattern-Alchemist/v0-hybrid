import { type NextRequest, NextResponse } from "next/server"

const MODEL_NAME = "gemini-2.5-flash-preview-09-2025"
const API_URL_BASE = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent`

async function fetchWithRetry(url: string, options: RequestInit, maxRetries = 3, delay = 1000) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url, options)
      if (!response.ok) {
        if (response.status === 429 && i < maxRetries - 1) {
          await new Promise((resolve) => setTimeout(resolve, delay))
          delay *= 2
          continue
        }
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return response
    } catch (error) {
      if (i === maxRetries - 1) throw error
      await new Promise((resolve) => setTimeout(resolve, delay))
      delay *= 2
    }
  }
  throw new Error("Failed after retries")
}

function parseAnalysis(text: string) {
  const parts = text.split("---")
  let analysis = "No clear analysis provided."
  let actionPlan = "No clear action plan provided."

  if (parts.length >= 2) {
    analysis = parts[0].trim()
    actionPlan = parts.slice(1).join("---").trim()
  } else {
    analysis = text.trim()
  }

  return { analysis, actionPlan }
}

export async function POST(request: NextRequest) {
  try {
    const { pattern, lifeArea } = await request.json()

    if (!pattern || !lifeArea) {
      return NextResponse.json({ error: "Pattern and lifeArea are required" }, { status: 400 })
    }

    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      console.error("[v0] GEMINI_API_KEY is not configured")
      return NextResponse.json(
        { error: "Gemini API key is not configured. Please add GEMINI_API_KEY to your environment variables." },
        { status: 500 },
      )
    }

    const systemPrompt = `You are Astro Kalki's specialized Karmic Guide. Your purpose is to analyze a user's described recurring life pattern through the lens of spiritual, psychological, and astrological concepts. The pattern is occurring in the area of "${lifeArea}". Provide two things in your response, separated by the delimiter "---" on a new line:
1. A concise, empathetic interpretation of the underlying karmic lesson or theme (maximum 3 sentences).
2. A 3-step, actionable 'Karma-Breaking Action Plan' tailored to the pattern, using a bulleted or numbered list. Suggestions should include practices like mantras, meditation focus, and lifestyle shifts.`

    const userQuery = `My recurring pattern in the area of ${lifeArea} is: "${pattern}"`

    const payload = {
      contents: [{ parts: [{ text: userQuery }] }],
      systemInstruction: { parts: [{ text: systemPrompt }] },
    }

    const response = await fetchWithRetry(`${API_URL_BASE}?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })

    const result = await response.json()
    const candidate = result.candidates?.[0]

    if (candidate && candidate.content?.parts?.[0]?.text) {
      const rawText = candidate.content.parts[0].text
      const { analysis, actionPlan } = parseAnalysis(rawText)

      return NextResponse.json({
        success: true,
        analysis,
        actionPlan,
        sources: [],
      })
    } else {
      console.error("[v0] Unexpected API response:", result)
      return NextResponse.json({ error: "Unable to parse response from Gemini API" }, { status: 500 })
    }
  } catch (error) {
    console.error("[v0] Karma analysis error:", error)
    return NextResponse.json({ error: "An error occurred during analysis" }, { status: 500 })
  }
}
