import React from 'react';
import {
    Navbar,
    NavbarToggler,
    NavbarBrand
} from 'reactstrap';

class NavbarComp extends React.Component {
    state = {
        isOpen: false
    }

    onBtToggle = () => {
        this.setState({ isOpen: !this.state.isOpen })
    }

    render() {
        return (
            <div>
                <Navbar color="light" light expand="md">
                    <NavbarBrand href="/">Back-End Testing</NavbarBrand>
                    <NavbarToggler onClick={this.onBtToggle} />
                </Navbar>
            </div>
        );
    }
}

export default NavbarComp;