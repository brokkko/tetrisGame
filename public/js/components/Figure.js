import {DirConstants} from "../constants/Constants.js";

export default class Figure {
    constructor(type, matrix, positionX, positionY, rotationDir) {
        this.type = type;
        this.matrix = matrix;
        this.position = {
            x: positionX,
            y: positionY
        }
        this.dir = rotationDir;

    }

    rotate = () => {
        this.matrix = this.matrix[0].map((val, index) => this.matrix.map(row => row[index]).reverse());
    }

    move = () => {
        switch (this.dir) {
            case DirConstants.RIGHT:
                this.position.x = this.position.x + 1;
                break;
            case DirConstants.DOWN:
                this.position.y = this.position.y + 1;
                break;
            case DirConstants.LEFT:
                this.position.x = this.position.x - 1;
        }
    }

    copy = () => {
        return new Figure(this.type, this.matrix, this.position.x, this.position.y, this.dir);
    }
}