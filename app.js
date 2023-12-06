Vue.component('game-board', {
  template: `
    <div class="game-board">
      <div v-for="(row, rowIndex) in board" :key="rowIndex" class="row">
        <div v-for="(cell, colIndex) in row" :key="colIndex" class="cell" @click="makeMove(rowIndex, colIndex)">
          {{ cell }}
        </div>
      </div>
      <div v-if="gameOver" class="game-over-message">
        Game over. {{ winner }} wins!
      </div>
      <button @click="restartGame">Restart Game</button>
    </div>
  `,
  data() {
    return {
      board: [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
      ],
      currentPlayer: 'X',
      gameOver: false,
      winner: '',
      moves: 0,
      maxMoves: 9
    };
  },
  methods: {
    makeMove(row, col) {
      if (!this.gameOver && this.board[row][col] === '') {
        this.$set(this.board[row], col, this.currentPlayer);
        this.moves++;

        if (this.checkWin(row, col)) {
          this.gameOver = true;
          this.winner = this.currentPlayer;
        } else if (this.moves === this.maxMoves) {
          // It's a draw
          alert("It's a draw!");
          this.restartGame();
        } else {
          this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
        }
      }
    },
    checkWin(row, col) {
      // Implement win checking logic here
      // Check row, column, and diagonals
      return (
        this.checkRow(row) ||
        this.checkColumn(col) ||
        this.checkDiagonals() ||
        this.checkAntiDiagonals()
      );
    },
    checkRow(row) {
      return (
        this.board[row][0] === this.currentPlayer &&
        this.board[row][1] === this.currentPlayer &&
        this.board[row][2] === this.currentPlayer
      );
    },
    checkColumn(col) {
      return (
        this.board[0][col] === this.currentPlayer &&
        this.board[1][col] === this.currentPlayer &&
        this.board[2][col] === this.currentPlayer
      );
    },
    checkDiagonals() {
      return (
        this.board[0][0] === this.currentPlayer &&
        this.board[1][1] === this.currentPlayer &&
        this.board[2][2] === this.currentPlayer
      );
    },
    checkAntiDiagonals() {
      return (
        this.board[0][2] === this.currentPlayer &&
        this.board[1][1] === this.currentPlayer &&
        this.board[2][0] === this.currentPlayer
      );
    },
    restartGame() {
      this.board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
      ];
      this.currentPlayer = 'X';
      this.gameOver = false;
      this.winner = '';
      this.moves = 0;
    }
  }
});

new Vue({
  el: '#app',
  template: '<game-board></game-board>'
});
