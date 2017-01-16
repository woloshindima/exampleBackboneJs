import Backbone from "backbone";
import Mn from "backbone.marionette";
import _ from "lodash";
import MainViewComponent from "./components/mainView/mainComponent";
import MainViewModel from './components/mainView/mainModel';
import Notification from "./services/notification/notification";
import Logger from "levellogger";
//router:
import Router from "./router/routerMain";
import Spinner from "./services/spinner/spinner";

const TestApp = Mn.Application.extend({
    initialize(options) {
        this.region = options.region;
        this.logger = Logger;

        if (!options.devMode) {
            TestApp.logger.system = e => false;
        }
        const notification = new Notification();

        TestApp.perPage = !!options.perPage ? options.perPage : '10';
        this.logger.system('App Initialize');
        this._addSpinner();
    },
    _addSpinner(){
        const spin = new Spinner();
        // Patch Model and Collection.
        _.each(["Model", "Collection"], name => {
            // Cache Backbone constructor.
            let ctor = Backbone[name];
            // Cache original fetch.
            let fetch = ctor.prototype.fetch;

            // Override the fetch method to emit a fetch event.
            ctor.prototype.fetch = function () {
                spin.show();
                // Trigger the fetch event on the instance.
                // this.trigger("fetch", this);
                this.on("sync", () => spin.hide());
                // Pass through to original fetch.
                return fetch.apply(this, arguments);
            };
        });
    },

    onStart() {
        const mainViewComponent = new MainViewComponent({
            model: new MainViewModel()
        });
        const main = this.getRegion();
        mainViewComponent.showIn(main);
        const router = new Router();

        Backbone.history.start();
    }
});


window.TestApp = TestApp;
window.TestApp.logger = Logger;

export default TestApp;