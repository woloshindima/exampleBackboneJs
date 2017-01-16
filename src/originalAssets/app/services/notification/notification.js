import Mn from "backbone.marionette";
import radio from "../../radio/radio";

const NotificationService = Mn.Object.extend({
    channelName: radio.channelName.notificationRadio,
    radioRequests: {
        'show:message': '_show',
        'hide:message': '_close'
    },
    _show(title, message){
        const _this = this;
        // Проверка поддерживаемости браузером уведомлений
        if (!("Notification" in window)) {
            console.warn(message);
        }

        // Проверка разрешения на отправку уведомлений
        else if (Notification.permission === "granted") {
            // Если разрешено то создаем уведомлений
            _this._say(title, message);
        }

        // В противном случает мы запрашиваем разрешение
        else if (Notification.permission !== 'denied') {
            Notification.requestPermission((permission) => {
                // Если пользователь разрешил, то создаем уведомление
                if (permission === "granted") {
                    _this._say(title, message);
                }
            });
        }
    },
    _say(title, message){
        this.messageNotification = new Notification(title, {
            tag: "ache-mail",
            body: message,
        });
    },
    _close(timer){
        !!this.messageNotification ?
            setTimeout(() => this.messageNotification.close(), timer) :
            console.warn('Notification not found');
    }
});

export default NotificationService;