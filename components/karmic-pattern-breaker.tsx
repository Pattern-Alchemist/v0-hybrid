"use client"

import { useState } from "react"
import { Loader, ExternalLink } from "lucide-react"

interface AnalysisData {
  id?: string
  pattern: string
  area: string
  analysis: string
  actionPlan: string
  timestamp?: Date
}

export default function KarmicPatternBreaker() {
  const [pattern, setPattern] = useState("")
  const [lifeArea, setLifeArea] = useState("Relationships")
  const [analysisResult, setAnalysisResult] = useState<string | null>(null)
  const [actionPlanText, setActionPlanText] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("Describe your pattern to begin analysis.")
  const [isError, setIsError] = useState(false)
  const [sources, setSources] = useState<Array<{ uri?: string; title?: string }>>([])

  const analyzeKarmicPattern = async () => {
    setIsLoading(true)
    setAnalysisResult(null)
    setActionPlanText(null)
    setSources([])
    setMessage("")
    setIsError(false)

    if (!pattern) {
      setMessage("Describe your pattern to begin analysis.")
      setIsError(true)
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch("/api/analyze-karma", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pattern, lifeArea }),
      })

      const data = await response.json()

      if (!response.ok) {
        setMessage(data.error || "An error occurred during analysis. Please try again.")
        setIsError(true)
      } else {
        setAnalysisResult(data.analysis)
        setActionPlanText(data.actionPlan)
        setSources(data.sources || [])
        setMessage("Analysis complete. Focus on your 3-Step Action Plan.")
      }
    } catch (error) {
      setMessage("An error occurred during analysis. Please try again.")
      setIsError(true)
      console.error("Analysis error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const formatActionPlan = (planText: string | null) => {
    if (!planText) return null
    return planText
      .split("\n")
      .filter((line) => line.trim() !== "")
      .map((line, index) => (
        <p key={index} className="flex items-start text-gray-100 text-sm">
          <span className="text-cyan-400 mr-2 font-bold">•</span>
          <span>{line.trim().replace(/^\s*[-*]\s*/, "")}</span>
        </p>
      ))
  }

  return (
    <section id="pattern-breaker" className="relative mt-16 sm:mt-24 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Form Section */}
          <div className="glass glow rounded-3xl p-6 lg:col-span-1">
            <h3 className="font-cinzel title-tight text-2xl font-semibold text-cyan-300">Karmic Pattern Breaker</h3>
            <p className="text-sm text-white/70 mt-2">Uncover the spiritual roots of your recurring patterns.</p>

            <div className="mt-6 space-y-4 text-sm">
              <div>
                <label htmlFor="patternInput" className="mb-2 block text-sm font-medium text-white/80">
                  Describe your recurring pattern:
                </label>
                <textarea
                  id="patternInput"
                  rows={4}
                  className="glass focus-ring w-full rounded-xl bg-transparent px-3 py-2 text-white placeholder-gray-400 resize-none"
                  placeholder="e.g., 'I always choose partners who are emotionally unavailable.'"
                  value={pattern}
                  onChange={(e) => setPattern(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              <div>
                <label htmlFor="lifeArea" className="mb-2 block text-sm font-medium text-white/80">
                  Area of Life affected:
                </label>
                <select
                  id="lifeArea"
                  className="glass focus-ring w-full rounded-xl bg-transparent px-3 py-2 text-white"
                  value={lifeArea}
                  onChange={(e) => setLifeArea(e.target.value)}
                  disabled={isLoading}
                >
                  <option value="Relationships">Relationships</option>
                  <option value="Career">Career/Work</option>
                  <option value="Finance">Finance/Money</option>
                  <option value="Health">Health/Wellbeing</option>
                  <option value="Family">Family/Home</option>
                  <option value="General">General Self-Sabotage</option>
                </select>
              </div>

              <button
                className="btn w-full justify-center text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={analyzeKarmicPattern}
                disabled={isLoading || !pattern}
              >
                {isLoading ? (
                  <>
                    <Loader className="h-4 w-4 animate-spin" strokeWidth={1.5} />
                    <span>Analyzing Karma...</span>
                  </>
                ) : (
                  <span>Break the Pattern</span>
                )}
              </button>
            </div>

            {message && (
              <div className={`mt-4 text-center text-sm font-medium ${isError ? "text-red-400" : "text-cyan-300"}`}>
                {message}
              </div>
            )}
          </div>

          {/* Analysis Results Section */}
          <div className="glass glow rounded-3xl p-6 lg:col-span-2">
            <h4 className="font-cinzel title-tight font-semibold text-xl text-cyan-300">Your Karmic Revelation</h4>
            <p className="text-sm text-white/70 mt-1">
              A spiritual interpretation of your pattern and actionable guidance.
            </p>

            {analysisResult && actionPlanText ? (
              <div className="mt-6 space-y-4">
                {/* Analysis Card */}
                <div className="p-5 rounded-xl border border-cyan-400/50 bg-slate-800/40 shadow-xl">
                  <p className="text-sm font-semibold text-cyan-300 mb-3">The Underlying Karmic Lesson:</p>
                  <p className="text-gray-100 leading-relaxed text-sm">{analysisResult}</p>
                </div>

                {/* Action Plan Card */}
                <div className="p-5 rounded-xl border border-teal-400/50 bg-slate-800/40 shadow-xl">
                  <p className="text-sm font-semibold text-teal-300 mb-3">Your 3-Step Action Plan (The Dharma Path):</p>
                  <div className="space-y-3">{formatActionPlan(actionPlanText)}</div>
                </div>

                {/* Sources */}
                {sources.length > 0 && (
                  <div className="mt-4 text-xs text-white/50 pt-4 border-t border-white/10">
                    <p className="mb-2 font-medium text-white/70">Sources Consulted:</p>
                    <div className="flex flex-wrap gap-2">
                      {sources.map((s, index) => (
                        <a
                          key={index}
                          href={s.uri}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 hover:underline"
                        >
                          <ExternalLink className="h-3 w-3" strokeWidth={1.5} />
                          {s.title}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="mt-6 rounded-xl border border-white/10 bg-gradient-to-r from-cyan-500/5 via-fuchsia-500/5 to-teal-500/5 p-8 text-center">
                <p className="text-sm text-white/70">
                  ✧ Fill in your pattern details and tap "Break the Pattern" to begin your karmic analysis. ✧
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
