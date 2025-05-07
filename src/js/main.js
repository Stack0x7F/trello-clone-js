document.addEventListener('DOMContentLoaded', function() {
    // Инициализация приложения
    addTask();
    changeTitle();
    initDragDrop();
    addBoardDeleteButtons();
    
    // Инициализация кнопки добавления доски
    const button = document.querySelector('.button');
    button.addEventListener('click', addBoard);
});