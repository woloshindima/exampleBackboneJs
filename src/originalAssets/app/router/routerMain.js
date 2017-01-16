import Mn from "backbone.marionette";
import Controller from "./routerController";

const Router = Mn.AppRouter.extend({
    controller: new Controller(),
    appRoutes: {
        '': 'showMain',
        'repository/:full_name1/:full_name2': '_showRepository',
        'search/:keywords/page/:page': '_prepareKeywords',
    }
});
export default Router;
