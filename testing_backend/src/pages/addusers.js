import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, Table } from 'reactstrap';
import Axios from 'axios'
const URL = "http://localhost:3030"

class Adduserspage extends React.Component {
    state = {
        dataProduct: [],
        value: ''
    }

    componentDidMount() {
        this.getData()
    }

    getData = () => {
        Axios.get(URL + '/users/getUsers')
            .then((res) => {
                console.log('State1', this.state.dataProduct)
                this.setState({ dataProduct: res.data }, () => console.log('State2A', this.state.dataProduct))
                console.log('State2B', this.state.dataProduct)
                console.log(this.state.dataProduct)
            })
            .catch((err) => {
                console.log(err)
            })
        console.log('Out', this.state.dataProduct)
    }

    inChange = () => {
        let value = this.name.value
        this.setState({ value })
        console.log("Value 2:", this.state.value)
    }

    onBtSubmit = () => {
        let name = this.name.value
        let email = this.email.value
        let password = this.password.value
        let phone = this.phone.value
        let gender = this.gender.value
        let address = this.address.value

        Axios.post(URL + '/users/addUsers', { name, email, password, phone, gender, address })
            .then((res) => {
                alert('Add Successfully')
                this.getData()
            })
            .catch((err) => {
                console.log(err)
            })
    }

    render() {
        return (
            <div style={{ height: '100vh', display: 'flex' }}>
                <div style={{ width: '30%', margin: '1%' }}>
                    <Form>
                        <FormGroup>
                            <Label for="exampleText">Name</Label>
                            <Input type="text" name="text" id="exampleText" innerRef={(text) => this.name = text} onChange={this.inChange} placeholder="with a placeholder" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleText">Email</Label>
                            <Input type="text" name="text" id="exampleText" innerRef={(text) => this.email = text} onChange={this.inChange} placeholder="with a placeholder" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleText">Password</Label>
                            <Input type="text" name="text" id="exampleText" innerRef={(text) => this.password = text} onChange={this.inChange} placeholder="with a placeholder" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleText">Phone</Label>
                            <Input type="text" name="text" id="exampleText" innerRef={(text) => this.phone = text} onChange={this.inChange} placeholder="with a placeholder" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleSelect">Gender</Label>
                            <Input type="select" name="select" id="exampleSelect" innerRef={(text) => this.gender = text}>
                                <option>Male</option>
                                <option>Female</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleText">Address</Label>
                            <Input type="text" name="text" id="exampleText" innerRef={(text) => this.address = text} onChange={this.inChange} placeholder="with a placeholder" />
                        </FormGroup>
                        <Button onClick={this.onBtSubmit}>Submit</Button>
                    </Form>
                </div>
                <div style={{ width: '68%', margin: '1%' }}>
                    <Table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Password</th>
                                <th>Address</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.dataProduct.map((item, index) => {
                                    return (
                                        <tr>
                                            <th>{index + 1}</th>
                                            <th>{item.username}</th>
                                            <th>{item.email}</th>
                                            <th>{item.password}</th>
                                            <th>{item.address}</th>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                </div>
            </div>
        );
    }
}

export default Adduserspage;