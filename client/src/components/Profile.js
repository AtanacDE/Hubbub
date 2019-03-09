

import React, { Component } from 'react';
//import Header from './Header'
import 'bootstrap/dist/css/bootstrap.min.css';
//import profpic from './images/Userprofilepic.png';
import '../css/Post.css';
import axios from 'axios';

import '../css/Postform.css';
import '../css/Application.css';
import '../css/MainPage.css';
import classnames from 'classnames';

import {Container, Col, Row, Nav, NavItem, NavLink, TabContent, TabPane,} from 'reactstrap';

 




class Profile extends Component {
 
    constructor(props){
        super(props)
        //const { data } = this.props.location
        this.componentDidMount = this.componentDidMount.bind(this)
        this.toggle = this.toggle.bind(this);

        this.state = {

            user: JSON.parse(window.sessionStorage.getItem("user")),
            activeTab: '1',
            friends: [],

            userName: 'John Smith',

        };
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
          this.setState({
            activeTab: tab
          });
        }
      }

      getFriends() {
        let friendUri = "http://localhost:4000/api/v1/friend/" + this.state.user.id
        //console.log(friendUri)
        axios.get(friendUri)
        .then((response) => {
    
          if(response.data === null){
            return this.setState({ friends : []});
          }
          //console.log(response.data)
          this.setState({ friends : response.data});
          
        })
        .catch(function (error) {
          console.log(error);
        });
      }

 
    
      componentDidMount() {
      
        if(this.state.user.username != null){
            this.setState({ userName: this.state.user.username });
        }
        

        this.getFriends()
        console.log(this.state.user);
    }


    render() {
        return (
            
            <div className="application-background-primary" style={{height: '100%'}}>
            <Container >
                <Row >
                    <Col md="3" style={{maxWidth: '300px'}} >
                        <Row><img style={{width: '50%', height: '50%'}} src={this.state.user.photo} alt="logo"/></Row>
                        <Row >
                            <div >
                            <p>{this.state.userName}</p>
                            <p>Hello, this is my profile</p>
                            </div>
                        </Row>
                    </Col>
                    <Col style={{padding:'0px'}} >      
                        <div className="application-background-secondary" style={{height:'100%', minWidth:'300px'}}>
                            <Nav tabs>
                                <NavItem>
                                    <NavLink className={classnames({ active: this.state.activeTab === '1' })} onClick={() => { this.toggle('1'); }}>
                                        Friends
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className={classnames({ active: this.state.activeTab === '2' })} onClick={() => { this.toggle('2'); }}>
                                        Posts
                                    </NavLink>
                                </NavItem>
                            </Nav>
                            <TabContent  activeTab={this.state.activeTab}>
                                <TabPane tabId="1">
                                    <Row>
                                    <Col sm="12" >
                                    <ul>
                                    {this.state.friends.map(friend => (
                                        <p key={friend.user.id}>
                                            {friend.user.firstName} {friend.user.lastName} &nbsp;
                                        </p>
                                        ))}
                                    </ul>
                                    </Col>
                                    </Row>
                                </TabPane>
                                <TabPane tabId="2">
                                    <Row>
                                        <Col>Conent</Col>
                                    </Row>
                                </TabPane>
                            </TabContent>
                        </div>    
                    </Col>
                </Row>
            </Container>
            </div>
        );
    
    }

}

export default Profile;