import BoardRendering from "./rendering/BoardRendering.js";
import Figure from "./rendering/Figure.js";
import {FigureType} from "./rendering/FigureType.js";
import {BoardConstants, DirConstants} from "./Constants.js";

class Controller {
    constructor() {
        this.board = new BoardRendering(
            document.getElementById("canvas"),
            document.getElementById("next-canvas")
        );
        this.figureTypeKeys = [];
        this.currentFigure = null;
        this.nextFigure = null;
        this.score = 0;
        this.flag = 0;
    }

    run = () => {
        this.gameStatus = true;
        this.nextFigure = this.getNextFigure();
        this.timerId = setInterval(controller.startGame, 300);
    }

    handlingKeyDownEvents = (e) => {
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

    }

    getNextFigure = () => {
        if(this.figureTypeKeys.length <= 1) {
            for(let key of Object.keys(FigureType)) {
                let keys = new Array(4).fill(key);
                this.figureTypeKeys = this.figureTypeKeys.concat(keys);
            }
        }
        let currentType = this.figureTypeKeys.splice(Math.random() * this.figureTypeKeys.length-1, 1)[0];
        return new Figure(currentType, FigureType[currentType].blocks, 0, 0, DirConstants.DOWN);
    }

    startGame = () => {
        document.getElementById("score").innerHTML = this.score;
        this.board.clearAll();
        this.board.rendering();

        if(this.flag === 0) {
            this.currentFigure = this.nextFigure;
            this.nextFigure = this.getNextFigure();
            this.board.addNewNextFigure(this.nextFigure);
            this.flag = 1;
            if(this.board.checkCollision(this.currentFigure) !== true) {
                clearInterval(this.timerId);
                console.log("GAME OVER");
                return;
            }
        }

        this.board.renderingCurrentFigure(this.currentFigure);

        let currentFigureCopy = this.currentFigure.copy();
        currentFigureCopy.move();
        if(this.board.checkCollision(currentFigureCopy)) {
            this.currentFigure.move();
        } else {
            this.flag = 0;
            this.board.addFigureToBoard(this.currentFigure);
            this.score = this.score + this.board.checkFilledRow();
        }
    }



}


let controller = new Controller();
controller.run();
document.addEventListener('keydown', function(event){
    controller.handlingKeyDownEvents(event);
});
