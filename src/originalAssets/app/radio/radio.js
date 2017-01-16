import Backbone from "backbone";

export default {
    channelName: {
        routerRadio: 'routerRadio',
        mainRadio: 'mainRadio',
        notificationRadio: 'notificationRadio',
        spinnerRadio: 'spinnerRadio'
    },
    routerRadio: Backbone.Radio.channel('routerRadio'),
    mainRadio: Backbone.Radio.channel('mainRadio'),
    notificationRadio: Backbone.Radio.channel('notificationRadio'),
    spinnerRadio: Backbone.Radio.channel('spinnerRadio')
};