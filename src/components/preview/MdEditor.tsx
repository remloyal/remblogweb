import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';     // 解析 markdown
import remarkGfm from 'remark-gfm';             // markdown 对表格/删除线/脚注等的支持
import MarkNav from 'markdown-navbar';          // markdown 目录
import 'markdown-navbar/dist/navbar.css';

export class MdEditor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      SourceData: ''
    }
  }

  componentDidMount() {
    var $this = this;
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
        $this.setState({
          SourceData: xmlhttp.responseText
        })
      }
    }
    // 文件目录在 public/static/test.md 这里不需要写 public 因为打包之后没有此目录。
    xmlhttp.open("GET", "/static/test.md", true);
    xmlhttp.send();
  }

  render() {
    return (
      <div className="App">
        <div className="leftSide">
          <MarkNav
            className="toc-list"
            source={this.state.SourceData}
            ordered={true}
          />
        </div>
        <div
          className="markdown-body content">
          <ReactMarkdown
            children={this.state.SourceData}
            remarkPlugins={[remarkGfm]}
          />
        </div>
      </div>
    );
  }
}
