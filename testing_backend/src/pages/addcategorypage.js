import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, Table } from 'reactstrap';
import Axios from 'axios'
const URL = "http://localhost:2800"

class Addcategorypage extends React.Component {
    state = {
        dataCategory: []
    }

    componentDidMount() {
        Axios.get(URL + '/product/getCategory')
            .then((res) => {
                this.setState({ dataCategory: res.data })
            })
            .catch((err) => {
                console.log(err)
            })

    }

    onBtSubmit = () => {
        let category = this.category.value

        console.log(category)
    }

    render() {
        return (
            <div style={{ height: '100vh', display: 'flex' }}>
                <div style={{ width: '30%', margin: '1%' }}>
                    <Form>
                        <FormGroup>
                            <Label for="exampleText">Category</Label>
                            <Input type="text" name="text" id="exampleText" innerRef={(text) => this.name = text} placeholder="with a placeholder" />
                        </FormGroup>
                        <Button onClick={this.onBtSubmit}>Submit</Button>
                    </Form>
                </div>
                <div style={{ width: '38%', margin: '1%' }}>
                    <Table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Category</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.dataCategory.map((item, index) => {
                                    return (
                                        <tr>
                                            <th>{index+1}</th>
                                            <th>{item.category}</th>
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

export default Addcategorypage;