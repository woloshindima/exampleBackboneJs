import Mn from "backbone.marionette";
import radio from "../../radio/radio";
import Spinner from "spin";

const SpinnerService = Mn.Object.extend({
    channelName: radio.channelName.spinnerRadio,
    radioRequests: {
        'show': 'show',
        'hide': 'hide'
    },
    initialize(){
        this.spinner = new Spinner();
    },
    show(){
        const target = document.body;
        this.spinner.spin(target);
    },
    hide(){
        this.spinner.stop();
    }
});

export default SpinnerService