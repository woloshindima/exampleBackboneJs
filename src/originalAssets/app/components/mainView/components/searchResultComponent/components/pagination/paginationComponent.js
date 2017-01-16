import _ from "lodash";
import Mn from "backbone.marionette";
import AbstractComponent from "../../../../../../abstractComponent/abstractComponent";
import pagination_tpl from "./pagination.html";
import keyCode from "../../../../../../constants/keyCode";

const PaginationView = Mn.View.extend({
    template: _.template(pagination_tpl),
    ui: {
        navToFirst: '[data-name = "toFirst"]',
        navToPrevious: '[data-name= "toPrevious"]',
        navToNext: '[data-name= "toNext"]',
        navToLast: '[data-name= "toLast"]',
        input: '.main-container_pagination_list input',
    },
    events: {
        'click @ui.navToFirst': '_toFirst',
        'click @ui.navToPrevious': '_toPrevious',
        'click @ui.navToNext': '_toNext',
        'keyup @ui.input': '_inputPagination'
    },
    initialize(options){
        TestApp.logger.system('pagination initialize');
        this.listenTo(this.model, 'change', this.render);
    },
    onRender(){
        TestApp.logger.system('pagination Render');
        this.pageNumber = this.model.get('num');
        let flag = this.pageNumber > 1;
        this.getUI('navToPrevious').toggleClass('disabled', !flag);
        this.getUI('navToFirst').toggleClass('disabled', !flag);
    },
    _toFirst(){
        this.model.set({num: 1});
    },
    _toPrevious(){
        this.pageNumber > 1 ?
            this.model.set({num: --this.pageNumber}) : '';
    },
    _toNext(){
        this.model.set({num: ++this.pageNumber});
    },
    _inputPagination(event){
        let inputVal = this.getUI('input').val();
        if (event.keyCode == keyCode.ENTER && !!inputVal && +inputVal > 0) {
            this.model.set({num: inputVal});
        }
    },
});

const PaginationComponent = AbstractComponent.extend({
    viewClass: PaginationView,
    initialize(options){
        TestApp.logger.system('PaginationComponent initialize');
    },
});


export default PaginationComponent;