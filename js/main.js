document.addEventListener('DOMContentLoaded', function() {
    const lists = document.querySelectorAll('.list');
    const button = document.querySelector('.button');

    // Инициализация функций
    addTask();
    changeTitle();
    dragNdrop();

    function addTask() {
        const btn = document.querySelector('.add__btn');
        const addBtn = document.querySelector('.add__item-btn');
        const cancelBtn = document.querySelector('.cancel__item-btn');
        const textarea = document.querySelector('.textarea');
        const form = document.querySelector('.form');

        btn.addEventListener('click', () => {
            showCreateModal();
        });

        cancelBtn.addEventListener('click', () => {
            form.style.display = 'none';
            btn.style.display = 'flex';
            textarea.value = '';
        });

        addBtn.addEventListener('click', () => {
            const value = textarea.value;
            if (value.trim() === '') return;

            const newItem = document.createElement('div');
            newItem.classList.add('list__item');
            newItem.draggable = true;
            newItem.textContent = value;
            
            // Добавляем кнопку удаления сразу при создании
            addDeleteButton(newItem);
            
            lists[0].append(newItem);

            textarea.value = '';
            form.style.display = 'none';
            btn.style.display = 'flex';

            dragNdrop();
        });
    }

    function addBoard() {
        const boards = document.querySelector('.boards');
        const board = document.createElement('div');
        board.classList.add('boards__item');
        board.innerHTML = `
            <span contenteditable="true" class="title">Введите название</span>
            <div class="list"></div>
            <div class="form">
                <textarea class="textarea" placeholder="Введите название для этой карточки"></textarea>
                <div class="buttons">
                    <button class="add__item-btn">Добавить карточку</button>
                    <button class="cancel__item-btn">Отмена</button>
                </div>
            </div>
            <div class="add__btn"><span>+</span>Добавить карточку</div>
        `;
        boards.append(board);

        changeTitle();
        dragNdrop();
        
        const newAddBtn = board.querySelector('.add__btn');
        newAddBtn.addEventListener('click', () => {
            showCreateModal();
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
            // Проверяем, есть ли уже кнопка удаления
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

    // Новая функция для добавления кнопки удаления
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

    function showCreateModal() {
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
            
            const newItem = document.createElement('div');
            newItem.classList.add('list__item');
            newItem.draggable = true;
            newItem.textContent = title;
            newItem.setAttribute('data-description', description);
            newItem.setAttribute('data-tags', tags);
            
            // Добавляем кнопку удаления сразу при создании
            addDeleteButton(newItem);
            
            document.querySelector('.list').append(newItem);
            
            document.getElementById('cardTitle').value = '';
            document.getElementById('cardDescription').value = '';
            document.getElementById('cardTags').value = '';
            modal.style.display = 'none';
            
            dragNdrop();
        };
    }

    function showViewModal(card) {
        const modal = document.getElementById('viewCardModal');
        const title = card.textContent.replace('×', '').trim(); // Удаляем крестик из заголовка
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

    function showConfirmModal(itemToDelete) {
        const modal = document.getElementById('confirmModal');
        modal.style.display = 'block';

        const yesBtn = modal.querySelector('.confirm-yes');
        const noBtn = modal.querySelector('.confirm-no');

        const removeEventHandlers = () => {
            yesBtn.removeEventListener('click', confirmDelete);
            noBtn.removeEventListener('click', cancelDelete);
            window.removeEventListener('click', outsideClick);
        };

        const confirmDelete = () => {
            itemToDelete.remove();
            modal.style.display = 'none';
            removeEventHandlers();
        };

        const cancelDelete = () => {
            modal.style.display = 'none';
            removeEventHandlers();
        };

        const outsideClick = (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
                removeEventHandlers();
            }
        };

        yesBtn.addEventListener('click', confirmDelete);
        noBtn.addEventListener('click', cancelDelete);
        window.addEventListener('click', outsideClick);
    }

    // Закрытие модальных окон при клике вне их области
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