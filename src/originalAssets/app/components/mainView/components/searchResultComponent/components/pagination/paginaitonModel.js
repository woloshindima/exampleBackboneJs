import Backbone from "backbone";
import radio from "../../../../../../radio/radio";

const PaginationModel = Backbone.Model.extend({
    initialize(options){
        this.on('change', e => {
            let num = e.get('num');
            let value = e.get('value');
            radio.routerRadio.request('show:searchResult', value, num);
        })
    },
});

export default PaginationModel;