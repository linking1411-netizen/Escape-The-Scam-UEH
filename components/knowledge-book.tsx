"use client"

import React, { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

// Responsive, accessible quiz modal that scales well on mobile & desktop.
// Features added:
// - full question set (provided by user)
// - keyboard support (Esc to close, Arrow keys to navigate, Enter to select)
// - focus trap basics so keyboard users stay inside modal
// - scroll-safe content area with max-height (no overflow sweeping the whole page)
// - progress bar, improved visual feedback, color-safe classes
// - semantic accessibility attributes (role, aria-live, aria-pressed)
// - Tailwind utility responsive sizing

interface Question {
  title: string
  scenario: string
  answers: string[]
  correctAnswer: number
  explanation: string
}

const questionData: Question[] = [
  {
    title:
      "CÂU HỎI 1: Sau khi bị lừa chiếm đoạt tài sản, bạn nhìn thấy quảng cáo 'đòi lại tiền bị lừa đảo'...",
    scenario:
      'Quảng cáo: "Hỗ trợ lấy lại tiền bị lừa đảo. Đã được ủy quyền bởi Viện Kiểm Sát"',
    answers: [
      "A. Là thật, công ty Luật thì sẽ uy tín.",
      "B. Là lừa đảo, tiền đã mất không thể lấy lại.",
      "C. Là lừa đảo, Viện Kiểm sát không ủy quyền cho bất kỳ cơ quan nào lấy lại tiền bị lừa.",
      "D. Là thật, bà hàng xóm đã lấy lại được tiền bị lừa.",
    ],
    correctAnswer: 2,
    explanation:
      'Hiện nay, không có cơ quan hoặc công ty luật nào được Viện Kiểm sát “ủy quyền” để lấy lại tiền cho người bị lừa đảo. Người dân chỉ nên gửi đơn tố cáo trực tiếp đến Công an hoặc cơ quan chức năng có thẩm quyền. (Nguồn: Cục An toàn thông tin – Bộ TT&TT, 2024).',
  },
  {
    title:
      "CÂU HỎI 2: Một người lạ có ngoại hình thu hút gửi lời mời kết bạn...",
    scenario:
      'Người đó nhờ bạn bấm vào link để cùng nhận phần thưởng.',
    answers: [
      "A. Họ nói năng chân thành, nên có thể tin tưởng.",
      "B. Liên kết được gửi kèm là link lạ, không xác thực.",
      "C. Người này có vẻ ngoài thu hút nên đáng tin hơn.",
      "D. Vì đã quen nhau một thời gian nên có thể giúp.",
    ],
    correctAnswer: 1,
    explanation:
      'Tin nhắn kèm link lạ là dấu hiệu phổ biến của lừa đảo trực tuyến; không bấm link từ người quen mới quen qua mạng. (Nguồn: Cục An toàn thông tin – Bộ TT&TT, 2024).',
  },
  {
    title: "CÂU HỎI 3: Tin nhắn trúng thưởng iPhone 15 từ Shopee",
    scenario:
      'Số điện thoại gửi đường link "shopeepv.com" yêu cầu xác nhận trong 5 phút',
    answers: [
      "A. Là thật, Shopee thường có khuyến mãi bất ngờ.",
      "B. Là lừa đảo, tên miền có ký tự lạ và không chính thống.",
      "C. Là thật, vì có logo Shopee trên giao diện.",
      "D. Là thật, vì bạn từng mua hàng trên Shopee.",
    ],
    correctAnswer: 1,
    explanation:
      'Tên miền không chính thống (ví dụ: shopeepv.com) là dấu hiệu của trang giả mạo. Không truy cập hoặc điền thông tin. (Nguồn: NCSC, 2024).',
  },
  {
    title: "CÂU HỎI 4: Email hối thúc thanh toán hóa đơn điện tử",
    scenario:
      'Email: “Hóa đơn điện tử: Yêu cầu thanh toán gấp – Tài khoản sẽ bị khóa” kèm link và file.',
    answers: [
      "A. Nhấn vào link và thanh toán ngay.",
      "B. Mở file đính kèm rồi mới quyết định.",
      "C. Không bấm link, kiểm tra trực tiếp trên website/app chính thức hoặc gọi để xác minh.",
      "D. Chuyển tiếp email cho bạn bè nhờ họ kiểm tra.",
    ],
    correctAnswer: 2,
    explanation:
      'Đây là phishing; xác minh trực tiếp qua kênh chính thức. Mở link hoặc file có thể dẫn tới mã độc. (Nguồn: Cục An toàn thông tin; NCSC, 2024).',
  },
  {
    title:
      'CÂU HỎI 5: “Chuyên viên tư vấn pháp lý” gọi điện, yêu cầu chuyển 1 triệu phí dịch vụ',
    scenario:
      'Người gọi nói hồ sơ khiếu nại đang xử lý và yêu cầu chuyển tiền để "bảo vệ quyền lợi"',
    answers: [
      "A. Chuyển ngay vì số tiền nhỏ.",
      "B. Gửi thông tin cá nhân để họ kiểm tra.",
      "C. Hỏi giấy phép hành nghề và xác minh qua website chính thức của Bộ Tư pháp.",
      "D. Tin tưởng vì họ nói giọng chuyên nghiệp.",
    ],
    correctAnswer: 2,
    explanation:
      'Người hành nghề luật hợp pháp phải có giấy phép; không yêu cầu chuyển tiền qua điện thoại. Kiểm tra tại Cổng thông tin Bộ Tư pháp hoặc Đoàn luật sư. (Căn cứ Luật Luật sư).',
  },
  {
    title:
      'CÂU HỎI 6: “Nhân viên ngân hàng” yêu cầu cài app bảo mật và nhập OTP',
    scenario:
      'Người gọi hướng dẫn cài app qua link rồi yêu cầu nhập OTP',
    answers: [
      "A. Cài theo và nhập OTP.",
      "B. Hỏi thêm thông tin rồi làm theo nếu họ giải thích rõ.",
      "C. Từ chối, cúp máy và gọi lại ngân hàng theo hotline trên website để xác minh.",
      "D. Chuyển tiền thử xem tính năng hoạt động.",
    ],
    correctAnswer: 2,
    explanation:
      'Ngân hàng không yêu cầu khách hàng nhập OTP cho người khác; xác minh với hotline/channels chính thức. (Nguồn: Ngân hàng Nhà nước / NCSC, 2024).',
  },
  {
    title:
      'CÂU HỎI 7: Gọi giả danh “công an” yêu cầu chuyển tiền vào tài khoản tạm giữ để xác minh',
    scenario:
      'Người gọi nói bạn liên quan đến đường dây rửa tiền và yêu cầu cung cấp CCCD, tài khoản, chuyển tiền',
    answers: [
      "A. Làm theo hướng dẫn.",
      "B. Gửi thông tin để chứng minh mình vô tội.",
      "C. Giữ bình tĩnh, không cung cấp thông tin, cúp máy và liên hệ công an chính thức/113.",
      "D. Ghi âm rồi chuyển tiền.",
    ],
    correctAnswer: 2,
    explanation:
      'Công an không bao giờ yêu cầu chuyển tiền qua điện thoại; báo ngay cơ quan công an địa phương hoặc gọi 113. (Nguồn: Bộ Công an).',
  },
  {
    title:
      'CÂU HỎI 8: Bài đăng Facebook thông báo “Học bổng quốc tế 10 triệu” yêu cầu phí xét duyệt 200.000đ',
    scenario:
      'Bài viết có nhiều bình luận khoe đã nhận học bổng',
    answers: [
      "A. Chuyển khoản ngay.",
      "B. Gửi thông tin cá nhân và chờ xác nhận.",
      "C. Kiểm tra nguồn học bổng, tìm website chính thức và tuyệt đối không chuyển phí xét duyệt.",
      "D. Nhờ bạn bè cùng chuyển.",
    ],
    correctAnswer: 2,
    explanation:
      'Đa số học bổng chính thống không yêu cầu phí; kiểm tra website/cổng thông tin chính thức. (Nguồn: Cục An toàn thông tin).',
  },
  {
    title:
      'CÂU HỎI 9: Video call thấy “em trai” khóc, yêu cầu chuyển 10 triệu gấp',
    scenario:
      'Người gọi trông giống em trai nhưng giọng khác',
    answers: [
      "A. Chuyển tiền ngay.",
      "B. Gọi lại số khác để thương lượng.",
      "C. Giữ bình tĩnh, cúp máy và gọi điện trực tiếp cho em trai để xác minh.",
      "D. Ghi lại cuộc gọi rồi nhờ người khác chuyển tiền.",
    ],
    correctAnswer: 2,
    explanation:
      'Có thể là bắt cóc ảo bằng deepfake; xác minh kênh liên lạc chính thức trước khi hành động. (Nguồn: Cục An ninh mạng).',
  },
  {
    title:
      'CÂU HỎI 10: Email thông báo ngân hàng có giao dịch bất thường, yêu cầu bấm link để xác minh',
    scenario: 'Email có logo và chữ ký giống ngân hàng thật',
    answers: [
      "A. Bấm ngay vào link.",
      "B. Trả lời email để hỏi thêm chi tiết.",
      "C. Không bấm link, liên hệ tổng đài hoặc website chính thức để xác minh.",
      "D. Chụp màn hình email gửi bạn bè hỏi.",
    ],
    correctAnswer: 2,
    explanation:
      'Ngân hàng không yêu cầu xác minh hoặc nhập OTP qua email. Xác minh bằng tổng đài hoặc app chính thức. (Nguồn: Cục An toàn thông tin).',
  },
  {
    title:
      'CÂU HỎI 11: "Shipper" gọi yêu cầu chuyển 50.000đ để xác nhận đơn hàng',
    scenario:
      'Shipper nói đơn hàng sẽ bị hủy nếu không chuyển tiền',
    answers: [
      "A. Chuyển tiền ngay.",
      "B. Hỏi lại mã đơn hàng và xác nhận trên ứng dụng mua sắm chính thức.",
      "C. Cung cấp địa chỉ và số để giao nhanh hơn.",
      "D. Tin tưởng vì shipper lịch sự.",
    ],
    correctAnswer: 1,
    explanation:
      'Shipper chính thức không yêu cầu chuyển khoản; kiểm tra app hoặc hotline sàn để xác thực. (Nguồn: Cục An toàn thông tin).',
  },
  {
    title:
      'CÂU HỎI 12: "Chuyên gia tài chính" mời tham gia dự án đầu tư cam kết lợi nhuận 20%/ngày',
    scenario:
      'Người này gửi sao kê giả để chứng minh uy tín',
    answers: [
      "A. Tham gia ngay.",
      "B. Hỏi thêm cách nạp tiền.",
      "C. Kiểm tra thông tin dự án trên trang web cơ quan quản lý tài chính hoặc Bộ Công an.",
      "D. Chuyển số nhỏ trước để kiểm tra độ uy tín.",
    ],
    correctAnswer: 2,
    explanation:
      'Cam kết lợi nhuận cao là dấu hiệu lừa đảo; kiểm tra thông tin tại cơ quan quản lý hoặc Bộ Công an. (Nguồn: Bộ Công an).',
  },
]

export default function KnowledgeBook({ onClose }: { onClose?: () => void }) {
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [showResult, setShowResult] = useState<boolean>(false)
  const [isOpen, setIsOpen] = useState<boolean>(true)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const firstFocusable = useRef<HTMLButtonElement | null>(null)
  const lastFocusable = useRef<HTMLButtonElement | null>(null)

  const q = questionData[currentPage]
  const isCorrect = selected === q.correctAnswer
  const total = questionData.length

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!isOpen) return
      if (e.key === "Escape") {
        handleClose()
      }
      if (e.key === "ArrowRight") {
        nextPage()
      }
      if (e.key === "ArrowLeft") {
        prevPage()
      }
      if (e.key === "Enter" && document.activeElement?.getAttribute("data-answer") === "true") {
        const idx = Number(document.activeElement?.getAttribute("data-index"))
        handleSelect(idx)
      }
      // basic focus trap: keep tab cycling inside modal
      if (e.key === "Tab" && containerRef.current) {
        const focusable = containerRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        if (focusable.length === 0) return
        const first = focusable[0] as HTMLElement
        const last = focusable[focusable.length - 1] as HTMLElement
        if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        }
      }
    }

    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [isOpen, currentPage, selected])

  useEffect(() => {
    // prevent body scroll when modal open
    document.body.style.overflow = isOpen ? "hidden" : "auto"
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  const handleClose = () => {
    setIsOpen(false)
    onClose?.()
  }

  const handleSelect = (index: number) => {
    setSelected(index)
    setShowResult(true)
  }

  const nextPage = () => {
    setSelected(null)
    setShowResult(false)
    setCurrentPage((p) => (p + 1 < total ? p + 1 : p))
    // scroll top of modal content when page changes
    containerRef.current?.scrollTo({ top: 0, behavior: "smooth" })
  }
  const prevPage = () => {
    setSelected(null)
    setShowResult(false)
    setCurrentPage((p) => (p > 0 ? p - 1 : p))
    containerRef.current?.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          aria-modal="true"
          role="dialog"
        >
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={handleClose}
            aria-hidden="true"
          />

          <motion.div
            className="relative w-full max-w-3xl mx-auto rounded-2xl shadow-2xl bg-gradient-to-br from-slate-900 to-gray-800 text-white overflow-hidden"
            initial={{ y: 30, scale: 0.98, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 20, scale: 0.98, opacity: 0 }}
            transition={{ type: "spring", damping: 14 }}
            role="document"
            aria-label="Bản kế hoạch Chặng Game Online - Quiz"
          >
            <div className="flex items-start justify-between gap-3 p-4 md:p-6">
              <div>
                <h1 className="text-lg md:text-2xl font-extrabold leading-tight">
                  📘 BẢN KẾ HOẠCH CHẶNG GAME ONLINE
                </h1>
                <p className="text-xs md:text-sm text-gray-300 mt-1 max-w-xl">
                  CHƯƠNG TRÌNH HỖ TRỢ TÂN SINH VIÊN K51 “KQM LEGAL - NET ALERT”
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleClose}
                  className="p-2 rounded-md hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400"
                  aria-label="Đóng">
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* progress bar */}
            <div className="px-4 md:px-6">
              <div className="w-full bg-white/8 rounded-full h-2 overflow-hidden">
                <div
                  className="h-2 rounded-full transition-all duration-400"
                  style={{ width: `${((currentPage + 1) / total) * 100}%` }}
                />
              </div>
              <div className="flex items-center justify-between mt-2 text-xs text-gray-300">
                <span> Câu hỏi {currentPage + 1} / {total}</span>
                <span> {Math.round(((currentPage + 1) / total) * 100)}% </span>
              </div>
            </div>

            {/* content area */}
            <div
              ref={containerRef}
              className="px-4 md:px-6 pt-4 pb-6 max-h-[70vh] md:max-h-[75vh] overflow-y-auto scrollbar-thin scrollbar-thumb-white/20"
            >
              <h2 className="text-lg md:text-xl font-semibold mb-2">{q.title}</h2>
              <p className="text-sm md:text-base text-gray-300 italic mb-4">{q.scenario}</p>

              <div className="grid gap-3 mb-4">
                {q.answers.map((answer, idx) => {
                  const isSelected = selected === idx
                  const isAnswerCorrect = showResult && idx === q.correctAnswer
                  const isAnswerWrong = showResult && isSelected && !isCorrect
                  return (
                    <button
                      key={idx}
                      data-answer="true"
                      data-index={idx}
                      onClick={() => handleSelect(idx)}
                      className={`w-full text-left p-3 rounded-lg border transition-shadow focus:outline-none focus:ring-2 focus:ring-offset-2
                        ${isAnswerCorrect ? "bg-emerald-600/80 border-emerald-400 shadow-lg" : "bg-white/3 border-white/6"}
                        ${isAnswerWrong ? "bg-red-600/80 border-red-400 shadow-lg" : ""}
                        ${!showResult && isSelected ? "ring-2 ring-indigo-400" : ""}`}
                      aria-pressed={isSelected}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 flex-shrink-0 text-sm font-bold">{String.fromCharCode(65 + idx)}.</div>
                        <div className="flex-1 text-sm md:text-base">{answer.replace(/^\s*[A-D]\.\s*/, "")}</div>
                      </div>
                    </button>
                  )
                })}
              </div>

              <AnimatePresence>
                {showResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`p-3 rounded-md mb-4 ${isCorrect ? "bg-emerald-700/20" : "bg-rose-700/20"}`}
                    aria-live="polite"
                  >
                    <div className="font-semibold mb-1">{isCorrect ? "🎉 Chính xác!" : "❌ Chưa đúng!"}</div>
                    <div className="text-sm text-gray-200 whitespace-pre-line">{q.explanation}</div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Legal and source block (collapsed on small screens) */}
              <div className="mt-2 text-xs text-gray-400">
                <details className="bg-white/2 p-3 rounded-md">
                  <summary className="cursor-pointer">Nguồn & Căn cứ pháp lý (mở để xem)</summary>
                  <div className="mt-2 text-xs leading-relaxed">
                    Nội dung trích theo thông báo công khai của Cục An toàn thông tin, NCSC, Bộ Công an, Ngân hàng Nhà nước và các văn bản pháp luật có liên quan (năm 2024–2025). Hướng dẫn mang tính thông tin, không thay thế tư vấn pháp lý chính thức.
                  </div>
                </details>
              </div>
            </div>

            {/* footer actions */}
            <div className="flex items-center justify-between gap-3 px-4 md:px-6 py-3 border-t border-white/6">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  onClick={prevPage}
                  disabled={currentPage === 0}
                >
                  <ChevronLeft size={16} className="mr-1" /> Trước
                </Button>

                <Button
                  variant="outline"
                  onClick={nextPage}
                  disabled={currentPage === total - 1}
                >
                  Tiếp <ChevronRight size={16} className="ml-1" />
                </Button>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-300 hidden sm:inline">Bạn đã trả lời: </span>
                <span className="text-sm font-mono bg-white/4 px-2 py-1 rounded">{selected !== null ? String.fromCharCode(65 + selected) : "—"}</span>
                <Button onClick={() => { setSelected(null); setShowResult(false); }} variant="ghost">Xoá chọn</Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
