import React from "react";
import { Input } from "antd";

export default class User extends React.Component {


    render() {

        return (
            <div>
                <h2>User login</h2>
                <Input
                    value="Mia"
                />
                <Input.Password
                    value="123"
                />
            </div>
        )
    }
}