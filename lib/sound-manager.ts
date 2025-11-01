// Sound manager - disabled (all sound effects removed, only horror music plays)
export class SoundManager {
  private static muted = false

  static setMuted(muted: boolean) {
    this.muted = muted
    if (typeof window !== "undefined") {
      localStorage.setItem("game-muted", muted ? "true" : "false")
    }
  }

  static isMuted(): boolean {
    if (this.muted === false && typeof window !== "undefined") {
      const stored = localStorage.getItem("game-muted")
      if (stored === "true") {
        this.muted = true
      }
    }
    return this.muted
  }

  static playJump() {
    // Sound effect disabled
  }

  static playStep() {
    // Sound effect disabled
  }

  static playCollision() {
    // Sound effect disabled
  }

  static playSuccess() {
    // Sound effect disabled
  }

  static playError() {
    // Sound effect disabled
  }

  static playClick() {
    // Sound effect disabled
  }
}
