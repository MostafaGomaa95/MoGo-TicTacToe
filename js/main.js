const rowData = document.getElementById('rowData');
const cPlayer = document.getElementById('cPlayer');
const statusBar = document.getElementById('statusBar');
const btnReset = document.getElementById('btnReset');
const btnNewMatch = document.getElementById('btnNewMatch');

const scoreXEl = document.getElementById('scoreX');
const scoreOEl = document.getElementById('scoreO');
const scoreDEl = document.getElementById('scoreD');

let currentPlayer = 'x';        
let board = Array(9).fill(null);
let winner = null;
let scores = { x: 0, o: 0, d: 0 };

// Build 3x3 grid
function buildBoard(){
  const frag = document.createDocumentFragment();
  for(let i=0;i<9;i++){
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.id = `cell-${i}`;
    cell.dataset.index = i;

    const icoX = document.createElement('i');
    icoX.className = 'fa-solid fa-x fa-2xl';
    icoX.dataset.icon = 'x';

    const icoO = document.createElement('i');
    icoO.className = 'fa-solid fa-o fa-2xl';
    icoO.dataset.icon = 'o';

    cell.appendChild(icoX);
    cell.appendChild(icoO);

    cell.addEventListener('click', onCellClick, { passive: true });
    frag.appendChild(cell);
  }
  rowData.innerHTML = '';
  rowData.appendChild(frag);
}
buildBoard();

function onCellClick(e){
  if(winner) return;

  const cell = e.currentTarget;
  const idx = Number(cell.dataset.index);
  if(board[idx]) return; // filled

  // Place mark
  board[idx] = currentPlayer;
  cell.classList.add('filled', currentPlayer);
  revealIcon(cell, currentPlayer);

  // Check win/draw
  const winData = checkWin(board);
  if(winData){
    winner = currentPlayer;
    markWin(winData.line);
    scores[currentPlayer] += 1;
    updateScores();
    setStatus(`Player ${currentPlayer.toUpperCase()} wins! 🎉`);
    return;
  }

  if(board.every(Boolean)){
    scores.d += 1;
    updateScores();
    setStatus(`It's a draw.`);
    return;
  }

  // Toggle turn
  currentPlayer = (currentPlayer === 'x') ? 'o' : 'x';
  updateTurnIcon();
  setStatus(`Your turn, ${currentPlayer.toUpperCase()}.`);
}

function revealIcon(cell, player){
  const icons = cell.querySelectorAll('i');
  icons.forEach(i=>{
    if(i.dataset.icon === player) i.style.opacity = '1';
    else i.style.opacity = '0';
  });
}

// All 8 win lines
const WIN_PATTERNS = [
  [0,1,2],[3,4,5],[6,7,8], // rows
  [0,3,6],[1,4,7],[2,5,8], // cols
  [0,4,8],[2,4,6]          // diagonals
];

function checkWin(b){
  for(const line of WIN_PATTERNS){
    const [a,b1,c] = line;
    if(b[a] && b[a] === b[b1] && b[a] === b[c]){
      return { player: b[a], line };
    }
  }
  return null;
}

function markWin(line){
  line.forEach(i=>{
    const cell = document.getElementById(`cell-${i}`);
    cell.classList.add('win');
  });
}

function updateTurnIcon(){
  if(currentPlayer === 'x'){
    cPlayer.classList.remove('fa-o');
    cPlayer.classList.add('fa-x');
  }else{
    cPlayer.classList.remove('fa-x');
    cPlayer.classList.add('fa-o');
  }
}

function updateScores(){
  scoreXEl.textContent = scores.x;
  scoreOEl.textContent = scores.o;
  scoreDEl.textContent = scores.d;
}

function setStatus(text){ statusBar.textContent = text; }

function resetBoard(keepScore = true){
  board = Array(9).fill(null);
  winner = null;

  // Rebuild for clean classes/events
  buildBoard();
  currentPlayer = 'x';
  updateTurnIcon();
  setStatus('Board reset. X starts.');

  if(!keepScore){
    scores = { x:0, o:0, d:0 };
    updateScores();
    setStatus('New match. X starts.');
  }
}

// Buttons
btnReset.addEventListener('click', ()=> resetBoard(true));
btnNewMatch.addEventListener('click', ()=> resetBoard(false));

// Initialize
updateTurnIcon();
updateScores();
setStatus('Good luck! X starts.');
