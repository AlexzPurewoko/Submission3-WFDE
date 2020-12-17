import "regenerator-runtime";
import './n_ui/uireference';
import 'material-icons';
import 'material-icons/css/material-icons.min.css';
import MainApplication from "./n_ui/application/application";

$(() => {
    const application =<MainApplication> $('application-main')[0];
    application.runApplication();
})