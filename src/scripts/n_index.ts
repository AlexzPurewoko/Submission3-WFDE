import "regenerator-runtime";
import './n_ui/uireference';
import 'material-icons';
import 'material-icons/css/material-icons.min.css';
import 'lazysizes'
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import MainApplication from "./n_ui/application/application";

$(() => {
    const application =<MainApplication> $('application-main')[0];
    application.runApplication();
        $('#placeholder-content').hide();
        $(application).show();
        $('#style-placeholder').remove();
        $('#placeholder-content').remove();
    // setTimeout(() => {
    //     $('#placeholder-content').hide();
    //     $(application).show();
    // }, 1200);
})