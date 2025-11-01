"use client"

import { Button } from "@/components/ui/button"
import { AudioManager } from "@/lib/audio-manager"

interface StorySceneProps {
  onContinue: () => void
}

export default function StoryScene({ onContinue }: StorySceneProps) {
  const story = [
    "Ba ngày trước, Linh nhận được một email từ 'Khách sạn Paradise' thông báo cô đã trúng một kỳ nghỉ miễn phí.",
    "Cô ấy đã click vào link trong email và điền thông tin cá nhân. Kể từ đó, không ai liên lạc được với cô ấy.",
    "Bạn đã theo dõi dấu vết và tìm thấy địa chỉ khách sạn. Nhưng khi đến nơi, bạn phát hiện đây là một cái bẫy tinh vi.",
    "Bây giờ, bạn bị mắc kẹt trong khách sạn này. Để thoát ra và cứu Linh, bạn phải vượt qua các thử thách về lừa đảo trực tuyến.",
  ]

  const handleContinue = () => {
    AudioManager.playClick()
    onContinue()
  }

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-background">
      {/* Background */}
      <img
        src="/dark-mysterious-hotel-lobby-with-flickering-lights.jpg"
        alt="Hotel lobby"
        className="absolute inset-0 w-full h-full object-cover opacity-30"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/90 to-background" />

      {/* Main content */}
      <div className="relative z-10 w-full max-w-2xl px-6 py-10 text-center">
        {/* Title */}
        <div className="mb-8">
          <span className="inline-block px-4 py-1 border border-primary/40 rounded-full text-xs font-mono tracking-wider text-primary uppercase">
            Chương 1: Bí Ẩn Bắt Đầu
          </span>
        </div>

        {/* Story paragraphs */}
        <div className="space-y-6 text-base sm:text-lg md:text-xl leading-relaxed text-foreground/90">
          {story.map((paragraph, index) => (
            <p key={index} className="fade-in">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Continue button */}
        <div className="mt-10">
          <Button
            onClick={handleContinue}
            className="bg-primary hover:bg-primary/80 text-primary-foreground font-semibold text-base sm:text-lg px-10 py-5 rounded-xl shadow-lg transition-all duration-200"
          >
            BẮT ĐẦU THÁCH THỨC
          </Button>
        </div>
      </div>

      {/* Fade animation */}
      <style jsx>{`
        .fade-in {
          animation: fadeIn 0.8s ease-in both;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}
