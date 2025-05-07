let draggedItem = null;

function initDragDrop() {
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