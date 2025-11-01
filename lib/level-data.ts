export interface Question {
  title: string
  scenario: string
  answers: string[]
  correctAnswer: number
  explanation: string
  villainIcon: string
}

export interface Decoration {
  x: number
  y: number
  width: number
  height: number
  type: string
  emoji: string
  color: string
  glow?: boolean
}

export interface Chest {
  x: number
  y: number
  width: number
  height: number
  type: "life" | "data" | "power"
  collected: boolean
}

export interface PatrolEnemy {
  id: string
  x: number
  y: number
  width: number
  height: number
  type: "drone" | "quiet_drone" | "firewall" | "splitter" | "shooter" | "rope-crawler"
  patrolStart: number
  patrolEnd: number
  patrolSpeed: number
  patrolDirection?: number
  animationOffset?: number
  // legacy properties removed: splits, shootCooldown, ropeX, ropeLength
}

export interface LevelData {
  name: string
  theme: string
  backgroundImage: string
  platforms: { x: number; y: number; width: number; height: number }[]
  enemies: {
    x: number
    y: number
    type: "laptop" | "camera" | "robot"
    questionId: number
  }[]
  patrolEnemies?: PatrolEnemy[]
  portal: { x: number; y: number; width: number; height: number }
  questions: Question[]
  decorations: Decoration[]
  chests: Chest[]
}

export const levelData: LevelData[] = [
  // Level 1: Phishing Lobby
  {
    name: "Tầng 1: Nhận diện tin nhắn & đường link lừa đảo",
    theme: "dark cyber hotel lobby with neon lights",
    backgroundImage: "/dark-cyberpunk-hotel-lobby-with-neon-lights-and-glo.jpg",
    platforms: [
      { x: 0, y: 550, width: 1200, height: 50 },
      { x: 300, y: 450, width: 200, height: 20 },
      { x: 600, y: 350, width: 200, height: 20 },
      { x: 900, y: 450, width: 200, height: 20 },
    ],
    enemies: [
      { x: 400, y: 410, type: "laptop", questionId: 0 },
      { x: 700, y: 310, type: "laptop", questionId: 1 },
      { x: 1000, y: 410, type: "laptop", questionId: 2 },
    ],
    patrolEnemies: [
      { x: 200, y: 510, type: "drone", patrolStart: 100, patrolEnd: 280, patrolSpeed: 1.2 },
      { x: 500, y: 410, type: "quiet_drone", patrolStart: 500, patrolEnd: 500, patrolSpeed: 0 },
    ],
    portal: { x: 850, y: 410, width: 80, height: 80 },
    decorations: [],
    chests: [],
    questions: [
      {
        title: "CÂU HỎI 1: Công ty Luật giả mạo",
        scenario:
          "Sau khi bị lừa chiếm đoạt tài sản, bạn thấy quảng cáo 'đòi lại tiền bị lừa đảo' từ một công ty Luật với thông tin 'Hỗ trợ lấy lại tiền bị lừa đảo. Đã được ủy quyền bởi Viện Kiểm Sát'. Hãy quyết định xem đây là lừa hay thật dựa trên 4 đáp án sau:",
        answers: [
          "A. Là thật, công ty Luật thì sẽ uy tín.",
          "B. Là lừa đảo, tiền đã mất không thể lấy lại",
          "C. Là lừa đảo, Viện Kiểm sát không ủy quyền cho bất kỳ cơ quan nào lấy lại tiền bị lừa",
          "D. Là thật, bà hàng xóm đã lấy lại được tiền bị lừa.",
        ],
        correctAnswer: 2,
        explanation:
          "Hiện nay, không có cơ quan hoặc công ty luật nào được Viện Kiểm sát 'ủy quyền' để lấy lại tiền cho người bị lừa đảo. Đây là chiêu thức mới của các nhóm lừa đảo, lợi dụng tâm lý muốn 'lấy lại tiền' để tiếp tục chiếm đoạt thêm. Người dân chỉ nên gửi đơn tố cáo trực tiếp đến Công an, hoặc cơ quan chức năng có thẩm quyền.",
        villainIcon: "⚖️",
      },
      {
        title: "CÂU HỎI 2: Kết bạn lạ - Yêu cầu bấm link",
        scenario:
          "Một người lạ có ngoại hình thu hút gửi lời mời kết bạn qua mạng xã hội. Sau vài tuần nhắn tin tâm sự, mối quan hệ giữa hai người trở nên thân thiết. Người đó nói: 'Anh đang làm nhiệm vụ để nhận tiền thưởng, em bấm vào link này giúp anh để cùng nhận phần thưởng nhé.' Theo bạn, dấu hiệu nào cho thấy đây là tình huống lừa đảo?",
        answers: [
          "A. Họ nói năng chân thành, nên có thể tin tưởng",
          "B. Liên kết được gửi kèm là link lạ, không xác thực",
          "C. Người này có vẻ ngoài thu hút nên đáng tin hơn",
          "D. Vì đã quen nhau một thời gian nên có thể giúp",
        ],
        correctAnswer: 1,
        explanation:
          "Tin nhắn kèm link lạ là dấu hiệu phổ biến của lừa đảo trực tuyến, thường dẫn đến trang web giả mạo để đánh cắp thông tin hoặc cài mã độc. Tuyệt đối không bấm link từ người quen mới quen qua mạng.",
        villainIcon: "🔗",
      },
      {
        title: "CÂU HỎI 3: Tin nhắn trúng thưởng Shopee",
        scenario:
          "Bạn nhận được tin nhắn 'Chúc mừng bạn trúng thưởng iPhone 15 từ Shopee. Hãy truy cập shopeepv.com để xác nhận và nhận quà trong 5 phút!'. Hãy xác định đây là tình huống thật hay lừa đảo dựa trên 4 đáp án sau:",
        answers: [
          "A. Là thật, Shopee thường có khuyến mãi bất ngờ.",
          "B. Là lừa đảo, tên miền có ký tự lạ và không chính thống.",
          "C. Là thật, vì có logo Shopee trên giao diện.",
          "D. Là thật, vì bạn từng mua hàng trên Shopee.",
        ],
        correctAnswer: 1,
        explanation:
          "Trang web có tên miền 'shopeepv.com' không thuộc Shopee chính th��c. Đây là dạng link giả mạo để đánh cắp thông tin cá nhân.",
        villainIcon: "📱",
      },
    ],
  },
  // Level 2: Investment Trap
  {
    name: "Tầng 2: Lừa đảo tài chính & đầu tư",
    theme: "dark corridor with alarm lights and warning signs",
    backgroundImage: "/dark-corridor-with-red-alarm-lights-and-warning-si.jpg",
    platforms: [
      { x: 0, y: 550, width: 1200, height: 50 },
      { x: 200, y: 450, width: 150, height: 20 },
      { x: 450, y: 350, width: 150, height: 20 },
      { x: 700, y: 250, width: 150, height: 20 },
      { x: 950, y: 350, width: 150, height: 20 },
    ],
    enemies: [
      { x: 250, y: 410, type: "camera", questionId: 0 },
      { x: 500, y: 310, type: "camera", questionId: 1 },
      { x: 750, y: 210, type: "camera", questionId: 2 },
    ],
    patrolEnemies: [
      { x: 100, y: 510, type: "drone", patrolStart: 50, patrolEnd: 300, patrolSpeed: 1.0 },
      { x: 350, y: 410, type: "drone", patrolStart: 200, patrolEnd: 400, patrolSpeed: 1.1 },
      { x: 420, y: 460, type: "quiet_drone", patrolStart: 420, patrolEnd: 420, patrolSpeed: 0 },
    ],
    portal: { x: 800, y: 220, width: 80, height: 80 },
    decorations: [],
    chests: [],
    questions: [
      {
        title: "CÂU HỎI 4: Email hóa đơn điện tử giả mạo",
        scenario:
          "Bạn nhận được email với tiêu đề: 'Hóa đơn điện tử: Yêu cầu thanh toán gấp – Tài khoản sẽ bị khóa / Điện thoại sẽ bị vô hiệu hoá nếu không xử lý', kèm đường link và file đính kèm. Email có logo công ty và chữ ký giống thật. Bạn nên làm gì?",
        answers: [
          "A. Nhấn vào link và thanh toán ngay để tránh bị khóa.",
          "B. Mở file đính kèm để xem chi tiết rồi mới quyết định.",
          "C. Không bấm link, kiểm tra trực tiếp trên website/ứng dụng chính thức của nhà cung cấp (hoặc gọi cho bộ phận kế toán/nhà cung cấp) để xác minh.",
          "D. Chuyển tiếp email cho bạn bè nhờ họ kiểm tra dùm.",
        ],
        correctAnswer: 2,
        explanation:
          "Đây là thủ đoạn phishing giả mạo hóa đơn điện tử, dùng thông điệp hối thúc (urgent) để gây áp lực. Mở link hoặc file đính kèm có thể dẫn tới trang lừa đảo hoặc mã độc. Cách an toàn là xác minh trực tiếp qua website/ứng dụng chính thức của nhà cung cấp, hệ thống hóa đơn điện tử, hoặc gọi số liên hệ đã biết; nếu là email công việc, báo ngay phòng IT.",
        villainIcon: "📧",
      },
      {
        title: "CÂU HỎI 5: Cuộc gọi từ chuyên viên tư vấn pháp lý",
        scenario:
          "Một người tự xưng là 'chuyên viên tư vấn pháp lý' gọi điện cho bạn, nói rằng hồ sơ khiếu nại của bạn đang được xử lý, nhưng yêu cầu chuyển trước 1 triệu đồng phí dịch vụ để 'bảo vệ quyền lợi người tiêu dùng'. Bạn nên làm gì?",
        answers: [
          "A. Chuyển ngay vì số tiền nhỏ.",
          "B. Gửi thông tin cá nhân để họ kiểm tra.",
          "C. Hỏi giấy phép hành nghề và xác minh qua website chính thức của Bộ Tư pháp.",
          "D. Tin tưởng vì họ nói giọng chuyên nghiệp.",
        ],
        correctAnswer: 2,
        explanation:
          "Người hành nghề luật hợp pháp phải có giấy phép rõ ràng, không yêu cầu chuyển tiền qua điện thoại. Cần xác minh thông tin qua kênh chính thức để tránh bị lợi dụng. Bạn có thể tra cứu danh sách luật sư, tổ chức hành nghề luật sư được cấp phép trên Cổng thông tin điện tử của Bộ Tư pháp hoặc ��oàn luật sư các tỉnh/thành phố để xác minh.",
        villainIcon: "☎️",
      },
      {
        title: "CÂU HỎI 6: Yêu cầu cài app sinh trắc học",
        scenario:
          "Một người xưng là 'nhân viên ngân hàng' gọi điện và hướng dẫn bạn cài 'ứng dụng bảo mật/sinh trắc học' để bảo vệ tài khoản, yêu cầu bạn cài app theo link rồi nhập OTP do hệ thống gửi. Bạn nên làm gì?",
        answers: [
          "A. Cài theo và nhập OTP để nhân viên kích hoạt nhanh cho bạn",
          "B. Hỏi thêm thông tin rồi làm theo nếu họ giải thích rõ ràng",
          "C. Từ chối, cúp máy và gọi lại cho ngân hàng theo số hotline trên website chính thức để xác minh",
          "D. Chuyển tiền thử xem tính năng hoạt động không",
        ],
        correctAnswer: 2,
        explanation:
          "Đây là chiêu giả danh hỗ trợ cài đặt sinh trắc học để chiếm OTP hoặc cài mã độc; ngân hàng không yêu cầu khách hàng nhập OTP cho người khác — luôn xác minh với kênh chính thức, không cài app từ link lạ.",
        villainIcon: "🏦",
      },
    ],
  },
  // Level 3: Personal Security
  {
    name: "Tầng 3: Bảo mật cá nhân & ứng phó tống tiền",
    theme: "luxurious room with gold and money symbols",
    backgroundImage: "/luxurious-cyberpunk-room-with-holographic-gold-coi.jpg",
    platforms: [
      { x: 0, y: 550, width: 1200, height: 50 },
      { x: 150, y: 450, width: 180, height: 20 },
      { x: 400, y: 380, width: 180, height: 20 },
      { x: 650, y: 300, width: 180, height: 20 },
      { x: 900, y: 400, width: 180, height: 20 },
    ],
    enemies: [
      { x: 200, y: 410, type: "robot", questionId: 0 },
      { x: 450, y: 340, type: "robot", questionId: 1 },
      { x: 700, y: 260, type: "robot", questionId: 2 },
    ],
    patrolEnemies: [
      { x: 50, y: 510, type: "drone", patrolStart: 50, patrolEnd: 200, patrolSpeed: 1.2 },
      { x: 500, y: 310, type: "quiet_drone", patrolStart: 500, patrolEnd: 500, patrolSpeed: 0 },
    ],
    portal: { x: 880, y: 370, width: 80, height: 80 },
    decorations: [],
    chests: [],
    questions: [
      {
        title: "CÂU HỎI 7: Cuộc gọi giả danh công an - Rửa tiền",
        scenario:
          "Bạn nhận được cuộc gọi từ một người tự xưng là 'công an' nói bạn liên quan đến đường dây rửa tiền và yêu cầu 'hợp tác điều tra' bằng cách cung cấp số CCCD, tài khoản ngân hàng và chuyển tiền vào 'tài khoản tạm giữ để xác minh'. Bạn sẽ làm gì?",
        answers: [
          "A. Làm theo hướng dẫn vì sợ bị bắt",
          "B. Gửi thông tin để chứng minh mình vô tội",
          "C. Giữ bình tĩnh, không cung cấp bất kỳ thông tin nào, cúp máy và gọi đến số công an chính thức hoặc 113 để xác minh",
          "D. Ghi âm lại cuộc gọi rồi chuyển tiền để 'hợp tác'",
        ],
        correctAnswer: 2,
        explanation:
          "Đây là chiêu lừa đảo giả danh cơ quan chức năng nhằm chiếm đoạt tài sản. Công an không bao giờ yêu cầu công dân chuyển tiền, cung cấp mã OTP hay thông tin cá nhân qua điện thoại. Khi gặp tình huống nghi ngờ, hãy liên hệ trực tiếp cơ quan công an địa phương hoặc qua tổng đài 113.",
        villainIcon: "🚨",
      },
      {
        title: "CÂU HỎI 8: Học bổng quốc tế trên Facebook",
        scenario:
          "Bạn thấy một bài đăng trên Facebook thông báo 'Học bổng quốc tế trị giá 10 triệu đồng cho sinh viên Việt Nam', kèm đường link đăng ký và yêu cầu nộp phí xét duyệt hồ sơ 200.000 đồng để 'giữ suất'. Bài viết có nhiều bình luận 'đã nhận được tiền học bổng'. Bạn sẽ làm gì?",
        answers: [
          "A. Chuyển khoản ngay để giữ suất học bổng",
          "B. Gửi thông tin cá nhân và chờ xác nhận",
          "C. Kiểm tra kỹ nguồn học bổng, tìm website chính thức của trường/tổ chức và tuyệt đối không chuyển tiền phí xét duyệt",
          "D. Nhờ bạn bè cùng chuyển cho nhanh để dễ trúng hơn",
        ],
        correctAnswer: 2,
        explanation:
          "Hầu hết các chương trình học bổng chính thống không yêu cầu nộp phí. Các bài đăng yêu cầu 'chuyển khoản giữ suất' hoặc chỉ hoạt động qua mạng xã hội thường là giả mạo nhằm chiếm đoạt thông tin và tiền. Hãy luôn xác minh thông tin tại website hoặc fanpage chính thức của trường, Bộ GD&ĐT hoặc các tổ chức uy tín.",
        villainIcon: "🎓",
      },
      {
        title: "CÂU HỎI 9: Cuộc gọi video deepfake - Bắt cóc",
        scenario:
          "Bạn nhận được cuộc gọi video thấy 'em trai' đang khóc, nói bị bắt giữ và yêu cầu chuyển 10 tri���u gấp để 'chuộc'. Người gọi thúc giục, nhìn rất giống em trai nhưng giọng hơi khác. Bạn làm gì?",
        answers: [
          "A. Chuyển tiền ngay để cứu người thân.",
          "B. Gọi lại số khác để thương lượng với kẻ bắt cóc.",
          "C. Giữ bình tĩnh, cúp máy và gọi điện trực tiếp vào số di động của em trai hoặc người thân khác để xác minh.",
          "D. Ghi lại cuộc gọi rồi nhờ người khác chuyển tiền giúp.",
        ],
        correctAnswer: 2,
        explanation:
          "Đây có thể là bắt cóc ảo bằng deepfake. Phải xác minh qua kênh liên lạc chính thức trước khi hành động; tuyệt đối không chuyển tiền khi chưa chắc.",
        villainIcon: "🎥",
      },
    ],
  },
  // Level 4: Deepfake & AI Boss
  {
    name: "Tầng 4: Deepfake & Bắt cóc ảo",
    theme: "glitchy digital space with distorted faces",
    backgroundImage: "/glitchy-digital-space-with-distorted-holographic-f.jpg",
    platforms: [
      { x: 0, y: 550, width: 1200, height: 50 },
      { x: 100, y: 450, width: 200, height: 20 },
      { x: 400, y: 350, width: 200, height: 20 },
      { x: 700, y: 450, width: 200, height: 20 },
      { x: 1000, y: 350, width: 150, height: 20 },
    ],
    enemies: [
      { x: 150, y: 410, type: "camera", questionId: 0 },
      { x: 450, y: 310, type: "camera", questionId: 1 },
      { x: 750, y: 410, type: "camera", questionId: 2 },
    ],
    patrolEnemies: [
      { x: 50, y: 510, type: "drone", patrolStart: 50, patrolEnd: 200, patrolSpeed: 1.4 },
      { x: 250, y: 410, type: "drone", patrolStart: 200, patrolEnd: 400, patrolSpeed: 1.2 },
    ],
    portal: { x: 1000, y: 310, width: 80, height: 80 },
    decorations: [],
    chests: [],
    questions: [
      {
        title: "CÂU HỎI 10: Email giả mạo ngân hàng",
        scenario:
          "Bạn nhận được email với tiêu đề: 'Ngân hàng thông báo tài khoản của bạn có giao dịch bất thường. Vui lòng bấm vào link dưới đây để xác minh ngay, nếu không tài khoản sẽ bị khóa.' Email có logo và chữ ký giống hệt ngân hàng thật. Theo bạn, hành động đúng là gì?",
        answers: [
          "A. Bấm ngay vào link để tránh bị khóa tài khoản",
          "B. Trả lời email để hỏi thêm chi tiết",
          "C. Không bấm vào link, liên hệ trực tiếp tổng đài hoặc website chính thức của ngân hàng để xác minh",
          "D. Chụp màn hình email gửi bạn bè hỏi có thật không",
        ],
        correctAnswer: 2,
        explanation:
          "Email giả mạo ngân hàng là dạng 'phishing mail' phổ biến. Ngân hàng không bao giờ yêu cầu xác minh hoặc nhập OTP qua email. Việc bấm vào link có thể khiến lộ thông tin đăng nhập hoặc cài mã độc.",
        villainIcon: "🏦",
      },
      {
        title: "CÂU HỎI 11: Shipper yêu cầu chuyển khoản",
        scenario:
          "Bạn nhận được cuộc gọi từ người tự xưng là shipper, nói rằng: 'Đơn hàng của bạn đang bị hoàn, vui lòng chuyển khoản trước 50.000đ để xác nhận nhận hàng, nếu không sẽ bị hủy ngay.' Bạn nên làm gì?",
        answers: [
          "A. Chuyển tiền ngay để không bị hủy đơn",
          "B. Hỏi lại mã đơn hàng và xác nhận trên ứng dụng mua sắm chính thức",
          "C. Cung cấp địa chỉ và số điện thoại để họ giao nhanh hơn",
          "D. Tin tưởng vì shipper nói chuyện lịch sự và có mã đơn hàng",
        ],
        correctAnswer: 1,
        explanation:
          "Shipper thật không yêu cầu chuyển khoản để xác nhận đơn. Đây là thủ đoạn giả danh nhằm chiếm đoạt tiền. Người dùng cần kiểm tra lại thông tin trên ứng dụng hoặc liên hệ tổng đài chính thức của sàn thương mại điện tử để xác thực.",
        villainIcon: "📦",
      },
      {
        title: "CÂU HỎI 12: Đầu tư tiền ảo - Cam kết lợi nhuận cao",
        scenario:
          "Một người tự xưng là 'chuyên gia tài chính' nhắn tin qua Zalo mời bạn tham gia đầu tư vào dự án 'Tiền ảo xanh – chỉ cần 1 triệu, lợi nhuận 20%/ngày, có rút lãi bất kỳ lúc nào'. Người này còn gửi hình chụp 'sao kê nhận tiền' của nhiều người khác để chứng minh uy tín. Bạn nên làm gì?",
        answers: [
          "A. Tham gia ngay để thử vì thấy nhiều người lời thật",
          "B. Hỏi thêm cách nạp tiền rồi mới đầu tư",
          "C. Kiểm tra thông tin dự án trên trang web cơ quan quản lý tài chính hoặc Bộ Công an",
          "D. Chuyển số nhỏ trước để kiểm tra độ uy tín",
        ],
        correctAnswer: 2,
        explanation:
          "Đây là chiêu trò đầu tư ảo – đa cấp tài chính trá hình, thường dùng hình ảnh 'chuyên gia', 'sao kê lợi nhuận' để tạo niềm tin. Các dự án cam kết lợi nhuận cao (10–20%/ngày) đều vi phạm pháp luật Việt Nam và có dấu hiệu lừa đảo chiếm đoạt tài sản. Người dân nên tra cứu thông tin tại Cục Cạnh tranh và Bảo vệ người tiêu dùng (Bộ Công Thương) hoặc Cục An niên mạng – Bộ Công an.",
        villainIcon: "💰",
      },
    ],
  },
]
