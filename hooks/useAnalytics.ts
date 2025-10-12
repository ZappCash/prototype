"use client"

import { usePostHog } from "posthog-js/react"
import { useCallback } from "react"

/**
 * Custom hook for analytics tracking
 * Provides type-safe event tracking methods
 */
export function useAnalytics() {
  const posthog = usePostHog()

  const trackEvent = useCallback(
    (eventName: string, properties?: Record<string, any>) => {
      if (posthog) {
        posthog.capture(eventName, properties)
      }
    },
    [posthog]
  )

  const identifyUser = useCallback(
    (userId: string, properties?: Record<string, any>) => {
      if (posthog) {
        posthog.identify(userId, properties)
      }
    },
    [posthog]
  )

  const resetUser = useCallback(() => {
    if (posthog) {
      posthog.reset()
    }
  }, [posthog])

  // Predefined event trackers
  const trackPayment = useCallback(
    (amount: number, currency: string, method: string) => {
      trackEvent("payment_sent", {
        amount,
        currency,
        method,
        timestamp: new Date().toISOString(),
      })
    },
    [trackEvent]
  )

  const trackReceive = useCallback(
    (amount: number, currency: string, method: string) => {
      trackEvent("payment_received", {
        amount,
        currency,
        method,
        timestamp: new Date().toISOString(),
      })
    },
    [trackEvent]
  )

  const trackPageView = useCallback(
    (pageName: string, properties?: Record<string, any>) => {
      trackEvent("page_viewed", {
        page: pageName,
        ...properties,
      })
    },
    [trackEvent]
  )

  const trackButtonClick = useCallback(
    (buttonName: string, location?: string) => {
      trackEvent("button_clicked", {
        button_name: buttonName,
        location,
      })
    },
    [trackEvent]
  )

  return {
    trackEvent,
    identifyUser,
    resetUser,
    trackPayment,
    trackReceive,
    trackPageView,
    trackButtonClick,
  }
}
