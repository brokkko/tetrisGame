export default class SoundsService {
    constructor() {
        this.clickSound = new Audio("../assets/sounds/click2.wav");
        this.gameOverSound = new Audio("../assets/sounds/game-over.wav");
    }

    playClick() {
        this.clickSound.play();
    }
    playgameOver() {
        this.gameOverSound.play();
    }
}
