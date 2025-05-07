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

function addTask() {
    const btn = document.querySelector('.add__btn');
    btn.addEventListener('click', () => {
        showCreateModal();
    });
}