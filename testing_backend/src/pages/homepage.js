import React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, } from 'reactstrap';
import classnames from 'classnames';
import Addproductpage from './addproductpage'
import Addcategorypage from './addcategorypage'

class Homepage extends React.Component {
    state = {
        activeTab: 1
    }

    onBtTab = (tab) => {
        this.setState({ activeTab: tab })
    }

    render() {
        return (
            <div>
                <Nav tabs>
                    <NavItem style={{ cursor: 'pointer' }}>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '1' })}
                            onClick={() => this.onBtTab('1')}
                        >
                            Add Product
                        </NavLink>
                    </NavItem>
                    <NavItem style={{ cursor: 'pointer' }}>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '2' })}
                            onClick={() => this.onBtTab('2')}
                        >
                            Add Category
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                        <Addproductpage />
                    </TabPane>
                    <TabPane tabId="2">
                        <Addcategorypage />
                    </TabPane>
                </TabContent>
            </div>
        );
    }
}

export default Homepage;