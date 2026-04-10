import { useState, useEffect, useCallback, useRef } from 'react'
import { getAICounter } from '../utils/api'

// ── Timer hook ───────────────────────────────────────────────────
export function useTimer(initialSeconds = 167) {
  const [seconds, setSeconds] = useState(initialSeconds)
  const [running, setRunning] = useState(true)
  const intervalRef = useRef(null)

  useEffect(() => {
    if (!running || seconds <= 0) return
    intervalRef.current = setInterval(() => {
      setSeconds(s => Math.max(0, s - 1))
    }, 1000)
    return () => clearInterval(intervalRef.current)
  }, [running, seconds])

  const reset = useCallback((s = initialSeconds) => {
    setSeconds(s)
    setRunning(true)
  }, [initialSeconds])

  const pause  = useCallback(() => setRunning(false), [])
  const resume = useCallback(() => setRunning(true), [])

  const formatted = `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`

  return { seconds, formatted, running, pause, resume, reset }
}

// ── XP toast hook ─────────────────────────────────────────────────
export function useXPToast() {
  const [toast, setToast] = useState({ visible: false, message: '', key: 0 })

  const show = useCallback((message) => {
    setToast(prev => ({ visible: true, message, key: prev.key + 1 }))
    setTimeout(() => setToast(prev => ({ ...prev, visible: false })), 2400)
  }, [])

  return { toast, showToast: show }
}

// ── Debate state hook ─────────────────────────────────────────────
export function useDebate(initialDebate) {
  const [debate, setDebate]       = useState(initialDebate)
  const [userInput, setUserInput] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [action, setAction]       = useState(null)
  const timer                     = useTimer(initialDebate?.timeSeconds ?? 167)

  const submitArgument = useCallback((text) => {
    setUserInput(text)
    setSubmitted(true)
  }, [])

  const handleAction = useCallback((type) => {
    setAction(type)
    setTimeout(() => setAction(null), 800)
  }, [])

  return {
    debate, setDebate,
    userInput, setUserInput,
    submitted, submitArgument,
    action, handleAction,
    timer,
  }
}

// ── Score bar animation hook ──────────────────────────────────────
export function useScoreAnimation(targetValue, delay = 0) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    const timeout = setTimeout(() => {
      const start    = performance.now()
      const duration = 900

      const animate = (now) => {
        const elapsed  = now - start
        const progress = Math.min(elapsed / duration, 1)
        const eased    = 1 - Math.pow(1 - progress, 3)
        setValue(Math.round(eased * targetValue))
        if (progress < 1) requestAnimationFrame(animate)
      }
      requestAnimationFrame(animate)
    }, delay)
    return () => clearTimeout(timeout)
  }, [targetValue, delay])

  return value
}

// ── AI preview hook (real API) ────────────────────────────────────
//
//  trigger(text) — call on every textarea change.
//  Debounces 800ms, requires >=16 chars before hitting the API.
//  Exposes: response (string|null), loading (bool), error (bool)
//
export function useAIPreview() {
  const [response, setResponse] = useState(null)
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState(false)
  const debounceRef             = useRef(null)
  const latestText              = useRef('')

  const trigger = useCallback((text) => {
    latestText.current = text

    if (!text || text.trim().length < 16) {
      clearTimeout(debounceRef.current)
      setResponse(null)
      setLoading(false)
      setError(false)
      return
    }

    setLoading(true)
    setError(false)

    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(async () => {
      if (!latestText.current || latestText.current.trim().length < 16) {
        setLoading(false)
        return
      }

      const result = await getAICounter(latestText.current.trim())

      if (result === null) {
        setError(true)
        setResponse(null)
      } else {
        setError(false)
        setResponse(result)
      }
      setLoading(false)
    }, 800)
  }, [])

  useEffect(() => {
    return () => clearTimeout(debounceRef.current)
  }, [])

  const reset = useCallback(() => {
    clearTimeout(debounceRef.current)
    setResponse(null)
    setLoading(false)
    setError(false)
    latestText.current = ''
  }, [])

  return { response, loading, error, trigger, reset }
}
