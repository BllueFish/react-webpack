import React from "react";
import { Route, BrowserRouter, Link, Switch } from "react-router-dom";
import Home from "./routes/home/Home";
import Blog from "./routes/blog/Blog";
import User from "./routes/user/User";

export default class Router extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <ul>
                    <li><Link to="/home">home</Link></li>
                    <li><Link to="/blog">blog</Link></li>
                    <li><Link to="/user">user</Link></li>
                </ul>
                <div>
                    {/*  Switch只显示一个组件，加exact表示精确匹配/..  */}
                    <Switch>
                        <Route path="/home" component={Home} />
                        <Route exact path="/blog" component={Blog} />
                        <Route exact path="/user" component={User} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}