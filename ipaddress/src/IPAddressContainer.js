import React, {Component} from "react";
import IPAddress from "./IPAddress";

var xhr;

class IPAddressContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ip_address: "..."
        };

        this.processRequest = this.processRequest.bind(this);
    }

    componentDidMount() {
        xhr = new XMLHttpRequest();
        xhr.open("GET", "http://localhost:8080/check/ip", true);
        xhr.send();
        xhr.addEventListener("readystatechange", this.processRequest, false);
    }

    processRequest() {
        if(xhr.readyState === 4 && xhr.status === 200) {
            var response = JSON.parse(xhr.response);
            console.log(response);
            this.setState({
                ip_address: response.ip
            });
        }
    }

    render() {
        return (
            <IPAddress ip={this.state.ip_address} />
        );
    }
}

export default IPAddressContainer;