document.addEventListener('DOMContentLoaded', function() {
    const lists = document.querySelectorAll('.list');
    const button = document.querySelector('.button');

    // Инициализация функций
    addTask();
    changeTitle();
    dragNdrop();
    addBoardDeleteButtons();

    function createCard(title, description = '', tags = '') {
        const newItem = document.createElement('div');
        newItem.classList.add('list__item');
        newItem.draggable = true;
        newItem.textContent = title;
        newItem.setAttribute('data-description', description);
        newItem.setAttribute('data-tags', tags);
        
        addDeleteButton(newItem);
        return newItem;
    }

    function addTask() {
        const btn = document.querySelector('.add__btn');
        btn.addEventListener('click', () => {
            showCreateModal();
        });
    }

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
        dragNdrop();
        addBoardDeleteButtons();
        
        const newAddBtn = board.querySelector('.add__btn');
        newAddBtn.addEventListener('click', () => {
            showCreateModal(board);
        });
    }

    button.addEventListener('click', addBoard);

    function changeTitle() {
        const titles = document.querySelectorAll('.title');
        titles.forEach(title => {
            title.addEventListener('click', e => {
                e.target.textContent = '';
            });
        });
    }

    let draggedItem = null;

    function dragNdrop() {
        const listItems = document.querySelectorAll('.list__item');
        const lists = document.querySelectorAll('.list');

        listItems.forEach(item => {
            if (!item.querySelector('.delete-card')) {
                addDeleteButton(item);
            }

            item.addEventListener('dragstart', () => {
                draggedItem = item;
                setTimeout(() => {
                    item.style.display = 'none';
                }, 0);
            });

            item.addEventListener('dragend', () => {
                setTimeout(() => {
                    item.style.display = 'block';
                    draggedItem = null;
                }, 0);
            });

            item.addEventListener('click', (e) => {
                if (!draggedItem && !e.target.classList.contains('delete-card')) {
                    showViewModal(item);
                }
            });
        });

        lists.forEach(list => {
            list.addEventListener('dragover', e => e.preventDefault());

            list.addEventListener('dragenter', function(e) {
                e.preventDefault();
                this.style.backgroundColor = 'rgba(0, 0, 0, .3)';
            });

            list.addEventListener('dragleave', function() {
                this.style.backgroundColor = 'rgba(0, 0, 0, 0)';
            });

            list.addEventListener('drop', function() {
                this.style.backgroundColor = 'rgba(0, 0, 0, 0)';
                if (draggedItem) {
                    this.append(draggedItem);
                }
            });
        });
    }

    function addDeleteButton(item) {
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-card';
        deleteBtn.innerHTML = '×';
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            showConfirmModal(item);
        });
        item.appendChild(deleteBtn);
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

    function showCreateModal(targetBoard = null) {
        const modal = document.getElementById('createCardModal');
        modal.style.display = 'block';
        
        modal.querySelector('.close-modal').onclick = function() {
            modal.style.display = 'none';
        };
        
        document.getElementById('submitCard').onclick = function() {
            const title = document.getElementById('cardTitle').value;
            const description = document.getElementById('cardDescription').value;
            const tags = document.getElementById('cardTags').value;
            
            if (title.trim() === '') {
                alert('Пожалуйста, введите название карточки');
                return;
            }
            
            const card = createCard(title, description, tags);
            const targetList = targetBoard ? targetBoard.querySelector('.list') : document.querySelector('.list');
            targetList.append(card);
            
            document.getElementById('cardTitle').value = '';
            document.getElementById('cardDescription').value = '';
            document.getElementById('cardTags').value = '';
            modal.style.display = 'none';
            
            dragNdrop();
        };
    }

    function showViewModal(card) {
        const modal = document.getElementById('viewCardModal');
        const title = card.textContent.replace('×', '').trim();
        const description = card.getAttribute('data-description') || 'Нет описания';
        const tags = card.getAttribute('data-tags') || 'Нет тегов';
        
        document.getElementById('viewCardTitle').textContent = title;
        document.getElementById('viewCardDescription').textContent = description;
        document.getElementById('viewCardTags').textContent = tags;
        
        modal.style.display = 'block';
        
        modal.querySelector('.close-modal').onclick = function() {
            modal.style.display = 'none';
        };
    }

    function showConfirmModal(itemToDelete, message = 'Удалить?') {
        const modal = document.getElementById('confirmModal');
        modal.querySelector('h3').textContent = message;
        modal.style.display = 'block';
    
        const yesBtn = modal.querySelector('.confirm-yes');
        const noBtn = modal.querySelector('.confirm-no');
    
        const confirmDelete = () => {
            itemToDelete.remove();
            modal.style.display = 'none';
        };
    
        const closeModal = () => {
            modal.style.display = 'none';
        };
    
        yesBtn.onclick = confirmDelete;
        noBtn.onclick = closeModal;
        
        window.onclick = function(e) {
            if (e.target === modal) {
                closeModal();
            }
        };
    }

    window.onclick = function(event) {
        const createModal = document.getElementById('createCardModal');
        const viewModal = document.getElementById('viewCardModal');
        const confirmModal = document.getElementById('confirmModal');
        
        if (event.target == createModal) {
            createModal.style.display = 'none';
        }
        
        if (event.target == viewModal) {
            viewModal.style.display = 'none';
        }
        
        if (event.target == confirmModal) {
            confirmModal.style.display = 'none';
        }
    };
});