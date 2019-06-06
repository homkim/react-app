import React, { Component } from 'react';
import TOC from './components/TOC';
import ReadContent from './components/ReadContent';
import CreateContent from './components/CreateContent';
import UpdateContent from './components/UpdateContent';
import Subject from './components/Subject';
import Control from './components/Control';
import './App.css';



class App extends Component {
  constructor(props) {
    super(props);
    this.max_id = 3;
    this.state = {
      mode: "update",
      selected_content_id: 1,
      subject: { title: "WEB", sub: "World Wide Web!" },
      welcome: { title: "Welcome", desc: "Hello, React!!" },
      contents: [
        { id: 1, title: "HTML", desc: "HTML is for information" },
        { id: 2, title: "CSS", desc: "CSS is for design" },
        { id: 3, title: "JavaScript", desc: "JavaScript is for interactive" }
      ]
    }
  }

  getReadContent(){
    var i = 0;
    while (i < this.state.contents.length) {
      var data = this.state.contents[i];
      if (data.id === this.state.selected_content_id) {
        return data;
        break;
      }
      i = i + 1;
    }
  }

  getContent(){

    var _id, _title, _desc, _article, _content = null;
    if (this.state.mode === "welcome") {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>;

    } else if (this.state.mode === "read") {

      _content = this.getReadContent();
      // read mode에서는 ReadContent Component를 사용한다.
      _article = <ReadContent title={_content.title} desc={_content.desc}></ReadContent>;
    } else if (this.state.mode === "create") {
      
      _article = <CreateContent onSubmit={function(_title, _desc){
        //add new content
        this.max_id = this.max_id + 1;

        //concat 방식, 배열복제 방식 중 편한대로 또는 필요한 기능대로 구현할 것
        //var _contents = this.state.contents.concat({id:this.max_id, title:_title, desc:_desc});
        var _contents = Array.from(this.state.contents);
        _contents.push({id:this.max_id, title:_title, desc:_desc});
        this.setState({
          contents: _contents,
          mode: 'read',
          selected_content_id:this.max_id
        });
      }.bind(this)}></CreateContent>;
    } else if (this.state.mode === "update") {
      _content = this.getReadContent();
      _article = <UpdateContent data={_content} onSubmit={
        function( _id, _title, _desc){
          var _contents = Array.from(this.state.contents);
          var i = 0;
          while (i < _contents.length){
            if(_contents[i].id === Number(_id)){
              _contents[i] = {id:_id, title:_title, desc:_desc};
              break;
            }
            i++;
          }          
          this.setState({contents: _contents, mode:'read', selected_content_id: _id});

      }.bind(this)}></UpdateContent>;
    } 

    return _article;
  }
  render() {
    console.log("App render start...");

    return (
      <div className="App">

        <Subject
          title={this.state.subject.title}
          sub={this.state.subject.sub}
          onChangePage={function () {
            this.setState({ mode: "welcome" });
          }.bind(this)} > </Subject>

        <TOC
          onChangePage={function (id) {
            this.setState(
              {
                mode: "read",
                selected_content_id: Number(id)
              }
            );
          }.bind(this)}
          data={this.state.contents} ></TOC>

        <Control onChangeMode={function (_mode) {
          if( _mode === 'delete') {
            if(window.confirm('삭제하겠습니까?')) {
              var _contents = Array.from(this.state.contents);
              var i = 0;
              while ( i < _contents.length) {
                if(_contents[i].id === this.state.selected_content_id){
                  _contents.splice(i, 1);
                  break;
                }
                i++;
              }
              i = 0;
              while ( i < _contents.length) {
                this.state.selected_content_id = _contents[i].id;
                break;
                i++;
              }
              if (_contents.length === 0 ) {
                this.setState({
                  mode: 'welcome',
                  contents: _contents
                });   
              }
              else {
                this.setState({
                  mode: 'read',
                  contents: _contents,
                  id: this.state.selected_content_id
                });   
            }                         
            }
          } else {
            this.setState({
              mode: _mode
            });
          }
        }.bind(this)} ></Control>


        {this.getContent()}


      </div>
    );
  }
}

export default App;
