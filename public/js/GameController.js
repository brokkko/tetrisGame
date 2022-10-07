import Board from "./components/Board.js";
import Figure from "./components/Figure.js";
import {FigureType} from "./constants/FigureType.js";
import {DirConstants, LevelConstants, ScoreConstants} from "./constants/Constants.js";
import SoundsService from "./services/SoundsService.js";

class GameController {
    constructor() {
        this.initGame();
        document.getElementById("start-game").addEventListener('click', this.startOnClick);
        document.getElementById("restart-game").addEventListener('click', this.restartOnClick);
    }

    initGame = () => {
        this.board = new Board(
            document.getElementById("canvas"),
            document.getElementById("next-canvas")
        );
        this.figureTypeKeys = [];
        this.score = 0;
        this.level = 0;
        this.speed = 400;
        this.flag = 0;
        this.gameStatus = false;
        this.board.rendering();
        this.looseInfo = document.getElementsByClassName("loose-wrapper").item(0);
    }

    startOnClick = () => {
        this.sounds = new SoundsService();
        this.sounds.playClick();
        this.run();
    }

    restartOnClick = () => {
        this.sounds = new SoundsService();
        this.sounds.playClick();
        this.initGame();
        this.looseInfo.classList.add('hidden');
        document.getElementById("player-level").innerHTML = "0";
        document.getElementById("player-level").innerHTML = "0";
        this.run();
    }

    run = () => {
        this.gameStatus = true;
        this.nextFigure = this.getNextFigure();
        this.timerId = setInterval(controller.startGame, this.speed);
        document.getElementById("start-game").disabled = true;
    }

    handlingKeyDownEvents = (e) => {
        e.preventDefault();
        if(this.gameStatus === false) return;
        let currentFigureCopy = this.currentFigure.copy();
        if(e.key === "ArrowRight" || e.key === "W") {
            currentFigureCopy.dir = DirConstants.RIGHT;
            currentFigureCopy.move();
            if(this.board.checkCollision(currentFigureCopy)) {
                this.currentFigure = currentFigureCopy;
                this.currentFigure.dir = DirConstants.DOWN;
            }
            return;
        }
        if(e.key === "ArrowLeft" || e.key === "A") {
            currentFigureCopy.dir = DirConstants.LEFT;
            currentFigureCopy.move();
            if(this.board.checkCollision(currentFigureCopy)) {
                this.currentFigure = currentFigureCopy;
                this.currentFigure.dir = DirConstants.DOWN;
            }
            return;
        }
        if(e.key === "ArrowDown" || e.key === "S") {
            currentFigureCopy.dir = DirConstants.DOWN;
            currentFigureCopy.move();
            if(this.board.checkCollision(currentFigureCopy)) {
                this.currentFigure = currentFigureCopy;
            }
            return;
        }
        if(e.key === "ArrowUp" || e.key === "W") {
            currentFigureCopy.rotate();
            if(this.board.checkCollision(currentFigureCopy)) {
                this.currentFigure = currentFigureCopy;
            }

        }
        if(e.key === "space" || e.key === " ") {
            while(this.board.checkCollision(this.currentFigure)) {
                this.currentFigure.move();
            }
            this.currentFigure.position.y = this.currentFigure.position.y - 1;
            this.reachedBottom();
        }

    }

    getNextFigure = () => {
        if(this.figureTypeKeys.length <= 1) {
            for(let key of Object.keys(FigureType)) {
                let keys = new Array(4).fill(key);
                this.figureTypeKeys = this.figureTypeKeys.concat(keys);
            }
        }
        //TODO fix random
        let currentType = this.figureTypeKeys.splice(Math.random() * this.figureTypeKeys.length-1, 1)[0];
        return new Figure(currentType, FigureType[currentType].blocks, 3, 0, DirConstants.DOWN);
    }

    reachedBottom = () => {
        this.flag = 0;
        this.board.addFigureToBoard(this.currentFigure);
        let rowNumber = this.board.checkFilledRow();
        let newPoints = 0;
        Object.keys(ScoreConstants).forEach((key) => {
            if(key === rowNumber.toString()) {
                newPoints = ScoreConstants[key];
            }
        })
        this.score = this.score + newPoints;
        Object.keys(LevelConstants).forEach((level) => {
            if(LevelConstants[level] <= this.score && this.score !== 0) {
                this.level = level;
                document.getElementById("player-level").innerHTML = this.level;
                this.speed = this.speed - 100;
            }
        })
    }

    startGame = () => {
        document.getElementById("player-score").innerHTML = this.score;
        this.board.clearAll();
        this.board.rendering();

        if(this.flag === 0) {
            this.currentFigure = this.nextFigure;
            this.nextFigure = this.getNextFigure();
            this.board.addNewNextFigure(this.nextFigure);
            this.flag = 1;
            if(this.board.checkCollision(this.currentFigure) !== true) {
                clearInterval(this.timerId);
                this.gameStatus = false;
                console.log("GAME OVER");
                storeUpdatedScore(this.score);
                this.looseInfo.classList.remove('hidden');
                this.sounds.playgameOver();
                return;
            }
        }

        this.board.renderingCurrentFigure(this.currentFigure);

        let currentFigureCopy = this.currentFigure.copy();
        currentFigureCopy.move();
        if(this.board.checkCollision(currentFigureCopy)) {
            this.currentFigure.move();
        } else {
           this.reachedBottom();
        }
    }

}

let controller = new GameController();
document.addEventListener('keydown', function(event){
    controller.handlingKeyDownEvents(event);
});
