import React, {Component} from "react";
import MenuButton from "./MenuButton";
import Menu from "./Menu";

class MenuContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false
        };

        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.toggleMenu = this.toggleMenu.bind(this);
    }

    toggleMenu() {
        this.setState({
            visible: !this.state.visible
        });
    }

    handleMouseDown(e) {
        this.toggleMenu();
        console.log("Clicked!");
        e.stopPropagation();
    }

    render() {
        console.log("Rendering: MenuContainer");
        return(
            <div>
                <div>
                    <MenuButton handleMouseDown={this.handleMouseDown}/>
                    <Menu handleMouseDown={this.handleMouseDown} menuVisibility={this.state.visible}/>
                    <p>Can you spot the item that doesn't belong?</p>
                    <ul>
                        <li>Jamie</li>
                        <li>Jason</li>
                        <li>Lisa</li>
                        <li>Tom</li>
                        <li>Dany</li>
                        <li>Rebecca</li>
                        <li>Susan</li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default MenuContainer;