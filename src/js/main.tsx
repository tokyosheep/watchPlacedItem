import * as React from "react";
import * as ReactDOM from "react-dom";
import {Provider} from "react-redux";
import configStore from "./redux/store/store";
import MainForm from "./pages/mainForm";

import "../styles/global.scss";

const store = configStore();

ReactDOM.render(
    <Provider store={store}>
        <MainForm />
    </Provider>,
    document.getElementById("root")
);