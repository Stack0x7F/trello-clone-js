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
        
        initDragDrop();
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

// Обработка кликов вне модальных окон
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