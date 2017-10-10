import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Table from 'react-bootstrap/lib/Table';
import Image from 'react-bootstrap/lib/Image';
import 'font-awesome/css/font-awesome.css';

class App extends Component {
state={
  top100Recent:[],
  top100AllTime:[],
  show:true,
}

getData(url,stateName){
  axios.get(url).then(({data})=>{
    this.setState({ [stateName] : data });
    //console.log(this.state.top100Recent);
  });
}

componentDidMount(){
  this.getData('https://fcctop100.herokuapp.com/api/fccusers/top/recent',"top100Recent");
  this.getData('https://fcctop100.herokuapp.com/api/fccusers/top/alltime',"top100AllTime");
}

showList(value){
  if(this.state.show!==value){
    this.setState({show:value});
  }
}

  render() {
    const {show,top100Recent,top100AllTime}=this.state;
    return (
      <div className="App container">
      <Table striped bordered condensed hover >
        <thead>
          <tr>
            <th>#</th>
            <th>Avatar</th>
            <th>Camper Name</th>
            <th onClick={(event)=>this.showList(true)}>Points of 30 Days {show && (<i className="fa fa-caret-down"></i>)}</th>
            <th onClick={(event)=>this.showList(false)}>Points of all time {show===false && (<i className="fa fa-caret-down"></i>)}</th>
          </tr>
        </thead>
        <tbody>
        {show && (top100Recent.map((row,index)=>(
            <tr key={row.username}>
              <td>{index+1}</td>
              <td><Image src={row.img} className="imgHeight" circle></Image></td>
              <td><a href={`https://www.freecodecamp.org/${row.username}`}>{row.username}</a></td>
              <td>{row.recent}</td>
              <td>{row.alltime}</td>
            </tr>
          )))}

        {!show &&  (top100AllTime.map((row,index)=>(
            <tr key={row.username}>
              <td>{index+1}</td>
              <td><Image src={row.img} className="imgHeight" circle></Image></td>
              <td><a href={`https://www.freecodecamp.org/${row.username}`}>{row.username}</a></td>
              <td>{row.recent}</td>
              <td>{row.alltime}</td>
            </tr>
          )))}
        </tbody>
      </Table>
      </div>
    );
  }
}

export default App;
