"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import TypewriterText from "@/components/typewriter-text"
import type { GameState } from "@/app/page"
import { Trophy, Star, Shield, BookOpen, User, Hash } from "lucide-react"
import { useEffect, useState } from "react"
import { SoundManager } from "@/lib/sound-manager"
import KnowledgeBook from "@/components/knowledge-book"
import { motion } from "framer-motion"

interface WinSceneProps {
  gameState: GameState
  onRestart: () => void
}

export default function WinScene({ gameState, onRestart }: WinSceneProps) {
  const [showKnowledgeBook, setShowKnowledgeBook] = useState(false)

  useEffect(() => {
    SoundManager.playSuccess()
  }, [])


  return (
    <div className="relative min-h-screen flex items-center justify-center p-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="/cyberpunk-city-skyline-at-dawn-with-bright-lights-.jpg"
          alt="Victory"
          className="w-full h-full object-cover scale-105 blur-sm brightness-[0.45]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80 backdrop-blur-sm" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: [1, 0], y: -200 }}
            transition={{ duration: 4, delay: i * 0.1, repeat: Infinity }}
            className="absolute w-2 h-2 rounded-full"
            style={{
              backgroundColor: Math.random() > 0.5 ? "#00ffff" : "#ff00c8",
              left: `${Math.random() * 100}%`,
              bottom: 0,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-4xl w-full space-y-10">
        {/* Title */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="text-center space-y-4"
        >
          <Trophy className="w-28 h-28 text-neon-cyan mx-auto drop-shadow-[0_0_20px_#00ffff]" />
          <h1 className="text-7xl md:text-8xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-white to-neon-magenta drop-shadow-[0_0_25px_#00ffff]">
            CHIẾN THẮNG
          </h1>
          <div className="h-1 w-80 mx-auto bg-gradient-to-r from-neon-magenta via-white to-neon-cyan rounded-full" />
        </motion.div>

        {/* Player Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid md:grid-cols-2 gap-6"
        >
          {[
            {
              icon: <User className="w-6 h-6 text-neon-cyan" />,
              label: "Tên Sinh Viên",
              value: gameState.playerName,
              color: "text-neon-cyan",
            },
            {
              icon: <Hash className="w-6 h-6 text-neon-magenta" />,
              label: "MSSV",
              value: gameState.mssv || "Chưa cập nhật",
              color: "text-neon-magenta",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 bg-black/40 backdrop-blur-lg rounded-xl border border-white/10 p-5 shadow-lg hover:border-neon-cyan/50 transition-all"
            >
              {item.icon}
              <div>
                <p className="text-xs uppercase tracking-wider text-gray-400">{item.label}</p>
                <p className={`text-xl font-bold ${item.color}`}>{item.value}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Story */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-black/40 backdrop-blur-lg border border-white/10 rounded-2xl p-8 space-y-5 shadow-xl"
        >
          <TypewriterText
            text={`Chúc mừng ${gameState.playerName}! Bạn đã giải cứu Linh thành công và giúp cô ấy thoát khỏi những cạm bẫy lừa đảo trực tuyến.`}
            className="text-xl md:text-2xl text-center text-white font-medium leading-relaxed"
            speed={35}
          />
          <TypewriterText
            text="Nhờ vào kiến thức và sự thận trọng của bạn, cả hai đã an toàn rời khỏi khách sạn bí ẩn. Linh đã học được bài học quý giá về an toàn mạng."
            className="text-base md:text-lg text-center text-gray-300"
            speed={30}
          />
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="grid md:grid-cols-3 gap-6"
        >
          <Card className="bg-black/40 border border-neon-magenta/40 backdrop-blur-lg text-center p-6 rounded-2xl shadow-lg">
            <Shield className="w-8 h-8 text-neon-magenta mx-auto mb-1" />
            <div className="text-4xl font-bold text-neon-magenta">{gameState.completedLevels.length}/4</div>
            <div className="text-sm text-gray-400">Tầng Hoàn Thành</div>
          </Card>
          <Card className="bg-black/40 border border-neon-green/40 backdrop-blur-lg text-center p-6 rounded-2xl shadow-lg">
            <Trophy className="w-8 h-8 text-neon-green mx-auto mb-1" />
            <div className="text-4xl font-bold text-neon-green">{gameState.lives}</div>
            <div className="text-sm text-gray-400">Mạng Còn Lại</div>
          </Card>
        </motion.div>

        {/* Completion Message */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
          className="bg-gradient-to-r from-neon-cyan/10 via-black/40 to-neon-magenta/10 border border-white/10 rounded-2xl p-8 shadow-2xl"
        >
          <div className="flex items-center gap-6">
            <Star
              className="w-16 h-16 text-neon-cyan drop-shadow-[0_0_20px_currentColor] animate-spin-slow"
            />
            <div>
              <h3 className="text-3xl font-extrabold text-neon-cyan">Bạn là chiến binh bảo vệ mạng thực thụ!</h3>
              <p className="text-gray-300 mt-2">
                Bạn đã hoàn thành tất cả 4 tầng với kiến thức và sự thận trọng vượt bậc.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="flex flex-col sm:flex-row justify-center gap-5"
        >
          <Button
            onClick={() => setShowKnowledgeBook(true)}
            className="bg-gradient-to-r from-neon-magenta to-neon-cyan hover:brightness-125 text-black font-bold text-lg px-8 py-6 rounded-xl shadow-[0_0_25px_#00ffffaa] transition-all"
          >
            <BookOpen className="w-5 h-5 mr-2" />
            XEM S��CH KIẾN THỨC
          </Button>
          <Button
            onClick={onRestart}
            className="bg-neon-green hover:bg-neon-green/80 text-black font-bold text-lg px-8 py-6 rounded-xl shadow-[0_0_20px_#00ff77aa]"
          >
            CHƠI LẠI
          </Button>
        </motion.div>
      </div>

      {showKnowledgeBook && <KnowledgeBook onClose={() => setShowKnowledgeBook(false)} />}
    </div>
  )
}
