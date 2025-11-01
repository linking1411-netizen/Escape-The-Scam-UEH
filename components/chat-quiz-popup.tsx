"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import type { Question } from "@/lib/level-data"

interface ChatQuizPopupProps {
  question: Question
  onAnswer: (correct: boolean) => void
  avatarUrl?: string
}

interface Message {
  id: number
  sender: "villain" | "linh" | "system"
  text: string
  icon: string
}

export default function ChatQuizPopup({ question, onAnswer, avatarUrl }: ChatQuizPopupProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [showAnswers, setShowAnswers] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)

  useEffect(() => {
    // Clear previous messages when question changes
    setMessages([])
    setSelectedAnswer(null)
    setShowExplanation(false)
    setShowAnswers(false)

    // Track timeout IDs for cleanup
    const timeoutIds: NodeJS.Timeout[] = []

    // Initial messages sequence
    const sequence = [
      {
        id: 1,
        sender: "villain" as const,
        text: question.scenario,
        icon: question.villainIcon,
        delay: 500,
      },
    ]

    // Randomly add Linh's cry for help (30% chance)
    if (Math.random() < 0.3) {
      sequence.push({
        id: 2,
        sender: "linh" as const,
        text: "Giúp tôi với! Tôi đang bị giam ở đây... Hãy trả lời đúng!",
        icon: "👧",
        delay: 2000,
      })
    }

    sequence.push({
      id: 3,
      sender: "system" as const,
      text: question.title,
      icon: "⚠️",
      delay: sequence.length > 1 ? 3500 : 2000,
    })

    // Add messages with delays
    sequence.forEach((msg) => {
      const timeoutId = setTimeout(() => {
        setMessages((prev) => [...prev, msg])
      }, msg.delay)
      timeoutIds.push(timeoutId)
    })

    // Show answers after all messages
    const showAnswersTimeoutId = setTimeout(
      () => {
        setShowAnswers(true)
      },
      sequence[sequence.length - 1].delay + 1000,
    )
    timeoutIds.push(showAnswersTimeoutId)

    // Cleanup: clear all timeouts when question changes
    return () => {
      timeoutIds.forEach((id) => clearTimeout(id))
    }
  }, [question])

  const handleAnswerClick = (index: number) => {
    setSelectedAnswer(index)
    setShowExplanation(true)

    // Show explanation for 3 seconds, then close
    setTimeout(() => {
      onAnswer(index === question.correctAnswer)
    }, 4000)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-md p-2 xs:p-3 sm:p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-xs xs:max-w-sm sm:max-w-md lg:max-w-2xl h-auto max-h-[90vh]"
      >
        {/* Chat container */}
        <div className="glass-panel rounded-lg overflow-hidden border-2 border-primary/50 shadow-2xl">
          {/* Header */}
          <div className="bg-gradient-to-r from-danger-red/20 to-neon-magenta/20 border-b border-primary/30 p-2 xs:p-3 sm:p-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-7 h-7 xs:w-8 xs:h-8 sm:w-10 sm:h-10 rounded-full bg-danger-red/30 flex items-center justify-center text-base xs:text-lg sm:text-2xl overflow-hidden flex-shrink-0">
                {avatarUrl ? (
                  <img src={avatarUrl} alt="avatar" className="w-full h-full object-cover" />
                ) : (
                  <div>{question.villainIcon}</div>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-bold text-xs xs:text-sm sm:text-base text-foreground truncate">Kẻ Lừa Đảo</div>
                <div className="text-xs text-neon-green">● Hoạt động</div>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="bg-background/50 p-2 xs:p-3 sm:p-4 space-y-2 sm:space-y-3 max-h-[50vh] sm:max-h-[500px] overflow-y-auto overflow-x-hidden">
            <AnimatePresence>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2 sm:gap-3 ${msg.sender === "system" ? "justify-center" : msg.sender === "linh" ? "justify-start" : "justify-end"}`}
                >
                  {msg.sender !== "system" && msg.sender === "linh" && (
                    <div className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 rounded-full bg-neon-cyan/30 flex items-center justify-center text-xs xs:text-base sm:text-lg flex-shrink-0">
                      {msg.icon}
                    </div>
                  )}

                  {msg.sender === "villain" && avatarUrl && (
                    <div className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 rounded-full bg-danger-red/30 flex items-center justify-center text-xs xs:text-base sm:text-lg flex-shrink-0 overflow-hidden">
                      <img src={avatarUrl} alt="villain-avatar" className="w-full h-full object-cover" />
                    </div>
                  )}

                  <div
                    className={`rounded-lg xs:rounded-xl sm:rounded-2xl px-2.5 py-1.5 xs:px-3 xs:py-2 sm:px-4 sm:py-3 break-words max-w-[85%] xs:max-w-[75%] sm:max-w-none ${
                      msg.sender === "villain"
                        ? "bg-danger-red/20 border border-danger-red/30"
                        : msg.sender === "linh"
                          ? "bg-neon-cyan/20 border border-neon-cyan/30"
                          : "bg-neon-magenta/20 border border-neon-magenta/30 text-center"
                    }`}
                  >
                    {msg.sender === "system" && (
                      <div className="text-[10px] xs:text-xs font-bold mb-1">
                        {msg.icon} CẢNH BÁO
                      </div>
                    )}
                    <p className="text-[10px] xs:text-xs sm:text-sm text-foreground/90 leading-relaxed">{msg.text}</p>
                  </div>

                  {msg.sender === "villain" && !avatarUrl && (
                    <div className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 rounded-full bg-danger-red/30 flex items-center justify-center text-xs xs:text-base sm:text-lg flex-shrink-0">
                      {msg.icon}
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Answer buttons */}
            {showAnswers && !showExplanation && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-1.5 xs:space-y-2 pt-2 xs:pt-3 sm:pt-4">
                <div className="text-center text-[10px] xs:text-xs sm:text-sm font-bold text-neon-green mb-1.5 xs:mb-2 sm:mb-3">
                  Chọn câu trả lời:
                </div>
                {question.answers.map((answer, index) => (
                  <Button
                    key={index}
                    onClick={() => handleAnswerClick(index)}
                    className="w-full h-auto py-3 px-3 sm:py-4 sm:px-4 bg-primary/10 hover:bg-primary/20 border border-primary/30 hover:border-primary/50 transition-all text-left rounded-xl flex items-start gap-2 sm:gap-3 whitespace-normal"
                  >
                    <span className="font-bold text-neon-cyan text-xs sm:text-sm flex-shrink-0 mt-0.5">
                      {String.fromCharCode(65 + index)}.
                    </span>
                    <span className="text-foreground/90 text-xs sm:text-sm leading-relaxed text-wrap">
                      {answer}
                    </span>
                  </Button>
                ))}
              </motion.div>
            )}

            {/* Explanation */}
            {showExplanation && selectedAnswer !== null && (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="pt-2 xs:pt-3 sm:pt-4">
                <div
                  className={`rounded-lg xs:rounded-xl sm:rounded-2xl p-2.5 xs:p-3 sm:p-4 border-2 ${
                    selectedAnswer === question.correctAnswer
                      ? "bg-neon-green/20 border-neon-green/50"
                      : "bg-danger-red/20 border-danger-red/50"
                  }`}
                >
                  <div className="flex items-center gap-1.5 xs:gap-2 mb-1.5 xs:mb-2 sm:mb-3">
                    <div className="text-xl xs:text-2xl sm:text-3xl flex-shrink-0">
                      {selectedAnswer === question.correctAnswer ? "✅" : "��"}
                    </div>
                    <div className="font-bold text-sm xs:text-base sm:text-lg">
                      {selectedAnswer === question.correctAnswer ? "Chính xác!" : "Sai rồi!"}
                    </div>
                  </div>
                  <div className="text-[10px] xs:text-xs sm:text-sm text-foreground/90 leading-relaxed">
                    {question.explanation}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
