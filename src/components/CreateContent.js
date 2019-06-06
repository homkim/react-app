import React, { Component } from 'react';

class CreateContent extends Component {
  render() {
    //console.log("Content render start...");
      return (
        <article>
          <h2>Create</h2>
          <form action="/create_process" mothod="post" 
            onSubmit={function(e){
              e.preventDefault();
              this.props.onSubmit(e.target.title.value, e.target.desc.value);
            }.bind(this)}>
            <p><input type="text" name="title" placeholder="Title"></input></p>
            <p><textarea name="desc" placeholder="Description"></textarea></p>
            <p><input type="submit"></input></p>
          </form>
        </article>
      );
    }
  }
  
  export default CreateContent;