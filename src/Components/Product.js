import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { Button, Form, Table } from 'react-bootstrap';

function Product() {

    let orderid = useRef("");
    let [products, setProducts] = useState([]);

    const [total, setTotal] = useState(0);

    let [order, setOrder] = useState({

        name: " ",
        email: " ",
        mobileno: " ",
        address: " ",
        pincode: " ",
        city: " ",
        product: [],
        amount: 0,
        status: "unpaid"

    });

    useEffect((e) => {

        axios.get('https://fakestoreapi.com/products').then((result) => {
            console.log(result.data);
            let myproducts = result.data.map((product, i) => {
                return { ...product, quantity: 0 }
            })

            setProducts(myproducts);
        }, (err) => {
            console.log(err);

        });
    }, []);

    function increaseQuantity(e, id) {

        e.preventDefault();
        let myproducts = products.map((product, i) => {
            if (product.id === id) {

                product.quantity += 1;
            }
            return product;

        });
        setProducts(myproducts);
    }



    function decreaseQuantity(e, id) {

        e.preventDefault();
        let myproducts = products.map((product, i) => {
            if (product.id === id) {
                if (product.quantity > 0)
                    product.quantity -= 1;
            }
            return product;

        })


        setProducts(myproducts);
    }

    useEffect(() => {

        let alltotal = 0;
        products.forEach(product => {
            alltotal += product.quantity * product.price;

        });
        setTotal(alltotal);

        let myproducts = products.filter((product, i) => {
            return product.quantity > 0;
        });
        setOrder({ ...order, products: myproducts, amount: alltotal });


    }, [products]);


    function handleChange(e) {

        e.preventDefault();
        setOrder({ ...order, [e.target.id]: e.target.value });
    }

    let options = {

        "key": "rzp_live_Ay9af2dQeUH8A6",
        "amount": "200",
        "name": "ROHAN MALAVI",
        "description": "product purchase",
        "image": "https://avatars.githubusercontent.com/u/114797222?s=400&u=7b1c7b216736fbc6fb0882212bc17b6fac47e948&v=4",
        "order_id": "",
        "handler": function (response) {
            console.log(orderid.current);
            alert("success");
        },

        "prefill": {
            "name": "",
            "email": "",
            "contact": ""

        },
        "notes": {
            "address": ""
        },
        "theam": {
            "color": "red"
        }



    };

    function placeOrder(e) {
        e.preventDefault();
        console.log(order);
        localStorage.setItem("order", JSON.stringify(order));

        orderid.current = "1234";
        options.amount = 200;
        options.prefill.name = order.name;
        options.prefill.email = order.email;
        options.prefill.contact = "+91" + order.mobileno;

        var rzp1 = new window.Razorpay(options);
        rzp1.open();
        rzp1.on("payment.failed", function (response) {
            alert("failed")
        });

    }







    return (

        <div className=' container mb-4'>
            <h1 className='text-center'> E-commerce shopping</h1>

            <Table>
                <thead>
                    <tr>
                        <th>no</th>
                        <th>image</th>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th colSpan={3}>Quantity</th>
                        <th>Total</th>

                    </tr>
                </thead>
                <tbody>
                    {
                        products.map((product, i) => {
                            return (
                                <tr key={i}>
                                    <td>{product.id}</td>
                                    <td><img width="40px" src={product.image} /></td>
                                    <td>{product.title}</td>
                                    <td>{product.category}</td>
                                    <td>{product.price}</td>
                                    <td>
                                        <Button className='btn btn-primary' onClick={(e) => { decreaseQuantity(e, product.id) }}>-</Button>
                                    </td>
                                    <td>{product.quantity}</td>
                                    <td>
                                        <Button className='btn btn-primary' onClick={(e) => { increaseQuantity(e, product.id) }}>+</Button>
                                    </td>
                                    <td>{(product.price * product.quantity).toFixed(2)}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>

            </Table>
            <Table>
                <tfoot>
                    <tr>
                        <td className='text-end' colSpan={7}><h3>Total price : {total.toFixed(2)} </h3></td>
                    </tr>
                </tfoot>
            </Table>
            <hr></hr>


        <div className='row'>
            <div className=' mt-2 mb-5 col-6'>
                <Form>
                    <Form.Group className="mb-3">
                        <h2>Fill the following</h2>
                        <Form.Label>name</Form.Label>
                        <Form.Control type="name" placeholder="Enter name" id='name' onChange={(e) => { handleChange(e) }} />
                        <Form.Text className="text-muted">

                        </Form.Text> <br></br>

                        <Form.Label>email </Form.Label>
                        <Form.Control type="email" placeholder="Enter email" id='email' onChange={(e) => { handleChange(e) }} />
                        <Form.Text className="text-muted">
                            We'll never share your detailes with anyone else.
                        </Form.Text><br></br>

                        <Form.Label>Mobile no</Form.Label>
                        <Form.Control type="text" placeholder="Enter Mobile no" id='mobileno' onChange={(e) => { handleChange(e) }} />
                        <Form.Text className="text-muted">
                        </Form.Text> <br></br>



                        <Form.Label>Address</Form.Label>
                        <Form.Control type="text" placeholder="Enter Address" id='address' onChange={(e) => { handleChange(e) }} />
                        <Form.Text className="text-muted">
                        </Form.Text> <br></br>



                        <Form.Group className="mb-3 ">
                            <Form.Label>Pincode</Form.Label>
                            <Form.Control type="text" placeholder=" Enter Pincode" id='pincode' onChange={(e) => { handleChange(e) }} />
                        </Form.Group>
                        <br></br>

                        <Button onClick={(e) => { placeOrder(e); }} variant="success" type="submit">
                            Buy now
                        </Button>&nbsp;
                        

                    </Form.Group>

                </Form>

            </div>

          
            <div className='col-6 '>
                <img className="img-fluid mt-5" src={"shop.jpg"} />
            </div>



        </div>
        </div>
    )
}

export default Product;
