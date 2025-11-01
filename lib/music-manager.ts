// Music manager for playing horror music throughout the game
class MusicManagerClass {
  private audioElement: HTMLAudioElement | null = null
  private initialized = false
  private musicUrl =
    "https://cdn.builder.io/o/assets%2F74c8fb559b304e6aa1418e5e64fad77f%2F29e590ab5e1645f89835dd4f5b8984d0?alt=media&token=028e3f6b-b3e6-457b-b542-f8c58cfb87c2&apiKey=74c8fb559b304e6aa1418e5e64fad77f"

  init() {
    if (this.initialized) return

    try {
      if (typeof window === "undefined") return

      this.audioElement = new Audio()
      this.audioElement.src = this.musicUrl
      this.audioElement.loop = true
      this.audioElement.volume = 0.4
      this.audioElement.preload = "auto"

      this.initialized = true
    } catch (e) {
      console.log("[v0] Audio initialization failed:", e)
    }
  }

  playMenuMusic() {
    this.ensureAudioInitialized()
    if (this.audioElement) {
      this.audioElement.currentTime = 0
      this.audioElement.play().catch(() => {
        console.log("[v0] Could not play audio - user interaction may be required")
      })
    }
  }

  playLevelMusic(level: number) {
    this.ensureAudioInitialized()
    if (this.audioElement) {
      this.audioElement.currentTime = 0
      this.audioElement.play().catch(() => {
        console.log("[v0] Could not play audio")
      })
    }
  }

  playWinMusic() {
    this.ensureAudioInitialized()
    if (this.audioElement) {
      this.audioElement.play().catch(() => {
        console.log("[v0] Could not play audio")
      })
    }
  }

  playLoseMusic() {
    this.ensureAudioInitialized()
    if (this.audioElement) {
      this.audioElement.play().catch(() => {
        console.log("[v0] Could not play audio")
      })
    }
  }

  stopAll() {
    if (this.audioElement) {
      this.audioElement.pause()
      this.audioElement.currentTime = 0
    }
  }

  private ensureAudioInitialized() {
    if (!this.initialized) {
      this.init()
    }
  }
}

export const MusicManager = new MusicManagerClass()
