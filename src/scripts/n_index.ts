import "regenerator-runtime";
import './n_ui/uireference';
// import 'material-icons';
// import 'material-icons/css/material-icons.min.css';
import '../styles/css/material-icons.css';
import '../styles/css/material-icons.min.css';
import 'lazysizes'
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import MainApplication from "./n_ui/application/application";

$(() => {
    const application =<MainApplication> $('application-main')[0];
    application.runApplication();
    $('#placeholder-content').hide();
    $(application).show();

    setTimeout(() => {
        $('#style-placeholder').remove();
        $('#placeholder-content').remove();
    }, 1500);
})