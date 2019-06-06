import React, { Component } from 'react';

class TOC extends Component {
  shouldComponentUpdate(newPorps, newState){
    console.log("TOC:: shouldComponentUpdate")
    if(this.props.data === newPorps.data){
      return false;
    }
    return true;
  }

  render() {
    console.log("TOC render start...");
    var lists = [];
    var data = this.props.data;
    var i = 0;
    while (i < data.length) {

      lists.push(
      <li key={data[i].id}>
        <a 
          href={"/contents/"+data[i].id}
          data-id={data[i].id}
          onClick={function(e){
            e.preventDefault();
            this.props.onChangePage(e.target.dataset.id);
          }.bind(this)}
          >{data[i].title}
        </a>
      </li>);
      i++;
    }

    return (
      <nav>
        <ul>
          {lists}
        </ul>
      </nav>
    );


  }
}

export default TOC;
