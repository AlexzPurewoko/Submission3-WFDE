import "regenerator-runtime";
import './ui/uireference';
import 'lazysizes'
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import MainApplication from "./ui/application/application";
import { Util } from "./utils/util";
let afterDOM = function () {
    Util.initProperty();

    const application =<MainApplication> document.querySelector('application-main');
    application.runApplication();

    document.querySelector('#placeholder-content').remove();
    document.querySelector('#style-placeholder').remove();
    Util.show(application);
}

document.addEventListener("DOMContentLoaded", afterDOM);