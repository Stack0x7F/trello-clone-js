function addBoard() {
    const boards = document.querySelector('.boards');
    const board = document.createElement('div');
    board.classList.add('boards__item');
    board.innerHTML = `
        <span contenteditable="true" class="title">Введите название</span>
        <div class="list"></div>
        <div class="add__btn"><span>+</span>Добавить карточку</div>
    `;
    boards.append(board);

    changeTitle();
    initDragDrop();
    addBoardDeleteButtons();
    
    const newAddBtn = board.querySelector('.add__btn');
    newAddBtn.addEventListener('click', () => {
        showCreateModal(board);
    });
}

function changeTitle() {
    const titles = document.querySelectorAll('.title');
    titles.forEach(title => {
        title.addEventListener('click', e => {
            e.target.textContent = '';
        });
    });
}

function addBoardDeleteButtons() {
    const boards = document.querySelectorAll('.boards__item');
    boards.forEach(board => {
        if (!board.querySelector('.delete-board-btn')) {
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-board-btn';
            deleteBtn.innerHTML = '×';
            deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                showConfirmModal(board, 'Вы уверены, что хотите удалить эту доску?');
            });
            board.appendChild(deleteBtn);
        }
    });
}