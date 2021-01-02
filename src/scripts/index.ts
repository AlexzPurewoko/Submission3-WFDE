/**
 * Copyright @2021 by Alexzander Purwoko Widiantoro
 *  
 */

import "regenerator-runtime";
import './ui/uireference';
import 'lazysizes'
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import MainApplication from "./ui/application/application";
import { Util } from "./utils/util";
const afterDOM = function () {
    Util.initProperty();

    const application =<MainApplication> document.querySelector('application-main');
    application.runApplication();
}

document.addEventListener("DOMContentLoaded", afterDOM);