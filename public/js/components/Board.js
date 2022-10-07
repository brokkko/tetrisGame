import {BoardConstants, NextBoardConstants} from "../constants/Constants.js";
import {FigureType} from "../constants/FigureType.js";

export default class Board {
    constructor(boardCanvasElement, nextCanvasElement) {
        this.boardCtx = boardCanvasElement.getContext("2d");
        this.nextBoardCtx = nextCanvasElement.getContext("2d");
        this.board = this.#getEmptyBoard(BoardConstants.HEIGHT, BoardConstants.WIDTH);
        this.nextBoard = this.#getEmptyBoard(NextBoardConstants.HEIGHT, NextBoardConstants.WIDTH);
    }

    #getEmptyBoard(height, width) {
        return Array(height).fill("").map(() => Array(width).fill(""));
    }

    rendering() {
        this.boardCtx.canvas.width = BoardConstants.WIDTH * BoardConstants.BLOCK_SIZE;
        this.boardCtx.canvas.height = BoardConstants.HEIGHT * BoardConstants.BLOCK_SIZE;
        this.boardCtx.strokeStyle = BoardConstants.LINE_COLOR;
        for (let i=0; i < this.boardCtx.canvas.height; i+=BoardConstants.BLOCK_SIZE) {
            for (let j=0; j < this.boardCtx.canvas.width; j+=BoardConstants.BLOCK_SIZE) {
                this.boardCtx.strokeRect(j, i, BoardConstants.BLOCK_SIZE, BoardConstants.BLOCK_SIZE);
            }
        }
        Board.#renderingFigures(this.boardCtx, this.board,
            BoardConstants.HEIGHT, BoardConstants.WIDTH, BoardConstants.BLOCK_SIZE);

        this.nextBoardCtx.canvas.width = NextBoardConstants.WIDTH * NextBoardConstants.BLOCK_SIZE;
        this.nextBoardCtx.canvas.height = NextBoardConstants.HEIGHT * NextBoardConstants.BLOCK_SIZE;
        this.nextBoardCtx.strokeStyle = NextBoardConstants.LINE_COLOR;
        for (let i=0; i < this.nextBoardCtx.canvas.height; i+=NextBoardConstants.BLOCK_SIZE) {
            for (let j=0; j < this.nextBoardCtx.canvas.width; j+=NextBoardConstants.BLOCK_SIZE) {
                this.nextBoardCtx.strokeRect(j, i, NextBoardConstants.BLOCK_SIZE, NextBoardConstants.BLOCK_SIZE);
            }
        }
        Board.#renderingFigures(this.nextBoardCtx, this.nextBoard,
            NextBoardConstants.HEIGHT, NextBoardConstants.WIDTH, NextBoardConstants.BLOCK_SIZE);

    }

    static #renderingFigures(ctx, boardArray, height, width, blockSize) {
        for (let row = 0; row < height; row++) {
            for (let col = 0; col < width; col++) {
                ctx.fillStyle = BoardConstants.BLOCK_COLOR;
                ctx.fillRect(col * blockSize + 5/2, row * blockSize + 5/2, blockSize - 5, blockSize - 5);
                if (boardArray[row][col] !== "") {
                    ctx.fillStyle = boardArray[row][col];
                    ctx.fillRect(col * blockSize + 5/2, row * blockSize + 5/2, blockSize - 5, blockSize - 5);
                }
            }
        }
    }

    renderingCurrentFigure(figure) {
        for (let row = 0; row < figure.matrix.length; row++) {
            for (let col = 0; col < figure.matrix[row].length; col++) {
                if (figure.matrix[row][col]) {
                    this.boardCtx.fillStyle = FigureType[figure.type].color;
                    // на один пиксель меньше
                    this.boardCtx.fillRect((figure.position.x + col) * BoardConstants.BLOCK_SIZE + 5/2,
                        (figure.position.y + row) * BoardConstants.BLOCK_SIZE + 5/2,
                        BoardConstants.BLOCK_SIZE - 5, BoardConstants.BLOCK_SIZE - 5);
                }
            }
        }
    }

    checkCollision(figure) {
        for (let row = 0; row < figure.matrix.length; row++) {
            for (let col = 0; col < figure.matrix[row].length; col++) {
                if (figure.matrix[row][col] && (
                    figure.position.x + col < 0 ||
                    figure.position.y + row < 0 ||
                    figure.position.x + col >= BoardConstants.WIDTH ||
                    figure.position.y + row >= BoardConstants.HEIGHT ||
                    this.board[figure.position.y + row][figure.position.x + col]
                )) {
                    return false;
                }
            }
        }
        return true;
    }

    checkFilledRow() {
        let count = 0;
        for (let row = this.board.length - 1; row >= 0; ) {
            if (this.board[row].every((value) => value !== "")) {
                count = count + 1;
                for(let curRow = row; curRow > 0; curRow--) {
                    for(let j = 0; j < this.board[row].length; j++) {
                        this.board[curRow][j] = this.board[curRow-1][j];
                    }
                }
            } else {
                row--;
            }
        }
        return count;
    }

    addFigureToBoard(figure, board = this.board) {
        for (let row = 0; row < figure.matrix.length; row++) {
            for (let col = 0; col < figure.matrix.length; col++) {
                if (figure.matrix[row][col]) {
                    board[figure.position.y + row][figure.position.x + col] = FigureType[figure.type].color;
                }
            }
        }
    }

    addNewNextFigure(figure) {
        this.nextBoard = this.#getEmptyBoard(NextBoardConstants.HEIGHT, NextBoardConstants.WIDTH);
        let figureCopy = figure.copy();
        figureCopy.position.x = figureCopy.position.x - 3;
        this.addFigureToBoard(figureCopy, this.nextBoard);
    }

    clearAll() {
        this.boardCtx.clearRect(0,0, BoardConstants.WIDTH, BoardConstants.HEIGHT);
        this.nextBoardCtx.clearRect(0, 0, NextBoardConstants.WIDTH, NextBoardConstants.HEIGHT);
    }


}