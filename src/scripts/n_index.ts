import "regenerator-runtime";
import './n_ui/uireference';
import '../styles/css/material-icons.css';
import '../styles/css/material-icons.min.css';
import 'lazysizes'
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import MainApplication from "./n_ui/application/application";
import { Util } from "./n_utils/util";
let afterDOM = function () {
    Util.initProperty();

    const application =<MainApplication> document.querySelector('application-main');
    application.runApplication();

    document.querySelector('#placeholder-content').remove();
    document.querySelector('#style-placeholder').remove();
    Util.show(application);
}
document.addEventListener("DOMContentLoaded", afterDOM);