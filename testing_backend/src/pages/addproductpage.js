import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, Table } from 'reactstrap';
import Axios from 'axios'
const URL = "http://localhost:2800"

class Addproductpage extends React.Component {
    state = {
        dataProduct: [],
        value:''
    }

    componentDidMount() {
    }

    onBtGet = () => {
        Axios.get(URL + '/product/getProduct')
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
        this.setState({value})
        console.log("Value 2:", this.state.value)
    }

    onBtSubmit = () => {
        let image = this.image.value
        let name = this.name.value
        let description = this.description.value
        let category = this.category.value
        let price = parseInt(this.price.value)

        console.log(image, name, description, category, price)
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
                            <Label for="exampleSelect">Category</Label>
                            <Input type="select" name="select" id="exampleSelect" innerRef={(text) => this.category = text}>
                                <option>Sport</option>
                                <option>Sneaker</option>
                                <option>Casual</option>
                                <option>Denim</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleDeskripsi">Description</Label>
                            <Input type="text" name="text" id="exampleDeskripsi" innerRef={(text) => this.description = text} placeholder="with a placeholder" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="examplePassword">Price</Label>
                            <Input type="number" name="password" id="examplePassword" innerRef={(numb) => this.price = numb} placeholder="password placeholder" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleImage">Image Link</Label>
                            <Input type="text" name="text" id="exampleImage" innerRef={(text) => this.image = text} placeholder="with a placeholder" />
                        </FormGroup>
                        <Button onClick={this.onBtGet}>Submit</Button>
                    </Form>
                </div>
                <div style={{ width: '68%', margin: '1%' }}>
                    <Table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.dataProduct.map((item, index) => {
                                    return (
                                        <tr>
                                            <th>{index + 1}</th>
                                            <th style={{ width: '10vw' }}><img src={item.image} alt="img" width="100%" /> </th>
                                            <th>{item.name}</th>
                                            <th>{item.description}</th>
                                            <th>{item.category}</th>
                                            <th>IDR. {item.price.toLocaleString()}</th>
                                            <th>Action</th>
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

export default Addproductpage;