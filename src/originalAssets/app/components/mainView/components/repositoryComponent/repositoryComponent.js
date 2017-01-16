import _ from "lodash";
import Mn from "backbone.marionette";
import AbstractComponent from "../../../../abstractComponent/abstractComponent";

// template
import repository_tpl from "./repository_tpl.html";
// components

const RepositoryView = Mn.View.extend({
    template: _.template(repository_tpl),
    initialize(options){
        this.listenTo(this.model, 'change', () => this.render());
        TestApp.logger.system('RepositoryView initialize');
    },
    onRender(){
        TestApp.logger.system('RepositoryView Render');
    },
});


const RepositoryComponent = AbstractComponent.extend({
    viewClass: RepositoryView,
    initialize(options){
        TestApp.logger.system('RepositoryComponent initialize');
        this.on('show', ()=> console.warn(this.model))
    },
    onShow(){
    }
});


export default RepositoryComponent;