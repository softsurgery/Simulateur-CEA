var action = document.getElementById('action');
var isActionDisabled = false;

function showNotification(message) {
    if (isActionDisabled) {
        return;
    }

    const notificationContainer = document.querySelector('.notification-container');
    const notification = document.createElement('div');
    notification.classList.add('notification', 'is-danger');
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete');
    deleteButton.addEventListener('click', () => {
        hideNotification();
    });
    notification.appendChild(deleteButton);
    notification.innerHTML = message;
    notificationContainer.appendChild(notification);
    setTimeout(() => {
        notification.classList.add('show');
    }, 50);

    setTimeout(() => {
        hideNotification();
    }, 3000);
}

function hideNotification() {
    const notification = document.querySelector('.notification');
    if (notification) {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 500);
    }
}

action.addEventListener('click', () => {
    if (!isActionDisabled) {
        isActionDisabled = true;
        setTimeout(() => {
            isActionDisabled = false;
        }, 700);
        showNotification("Action performed!");
    }
});
