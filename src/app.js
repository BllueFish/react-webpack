import React from "react";
import ReactDom from "react-dom";
import "./styles/index.less";
import "./styles/style.less";
import Router from "./router";

ReactDom.render(
    <Router />,
    document.getElementById("root")
);
