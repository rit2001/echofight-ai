const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

/**
 * Call the EchoFight backend to generate an AI counter-argument.
 * @param {string} argument - The user's debate opinion
 * @returns {Promise<string>} The AI's counter-argument text
 */
export async function getAICounter(argument) {
  try {
    const res = await fetch(`${API_URL}/api/counter`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ argument }),
    })

    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      throw new Error(err.detail || `HTTP ${res.status}`)
    }

    const data = await res.json()
    return data.ai_response
  } catch (err) {
    console.error('[EchoFight] AI counter error:', err.message)
    return null   // caller decides how to render the error
  }
}
