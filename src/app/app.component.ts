import { Component, OnInit } from '@angular/core';
import {
  NgClass,
  NgForOf,
  NgIf,
  NgStyle,
  NgSwitch,
  NgSwitchCase,
  NgSwitchDefault,
  UpperCasePipe,
} from '@angular/common';

type BoardItem = null | boolean;
type BoardLine = BoardItem[];
type Board = BoardLine[];

const getDefaultBoard = (): Board => [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const transposeArray = (array: Board) => {
  return array[0].map((_, colIndex) => array.map((row) => row[colIndex]));
};

const checkLine = (line: BoardLine) => {
  return (
    line.every((item) => item === true) || line.every((item) => item === false)
  );
};

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NgForOf,
    NgClass,
    NgSwitch,
    NgSwitchDefault,
    NgSwitchCase,
    NgStyle,
    UpperCasePipe,
    NgIf,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'tic-tac-toe';
  board: Board = [];
  currentPlayer = true;
  winner: BoardItem = null;

  ngOnInit() {
    this.board = getDefaultBoard();
  }

  switchPlayers() {
    this.currentPlayer = !this.currentPlayer;
  }

  nextStep(rowIndex: number, itemIndex: number) {
    this.board[rowIndex][itemIndex] = this.currentPlayer;
    const isWinner = this.checkWinner();
    if (isWinner) {
      this.winner = this.currentPlayer;
      return;
    }
    this.switchPlayers();
  }

  checkWinner() {
    const isAnyRowDone = this.board.some((line) => checkLine(line));
    const isAnyColumnDone = transposeArray(this.board).some((column) =>
      checkLine(column),
    );
    const isAnyDiagonalDone = [
      [this.board[0][0], this.board[1][1], this.board[2][2]],
      [this.board[0][2], this.board[1][1], this.board[2][0]],
    ].some((diagonal) => checkLine(diagonal));

    return isAnyRowDone || isAnyColumnDone || isAnyDiagonalDone;
  }

  reset() {
    this.board = getDefaultBoard();
    this.winner = null;
  }
}
