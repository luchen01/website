import React, {Component} from 'react';
import axios from 'axios';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import * as colors from 'material-ui/styles/colors';
// import {CirclePicker} from 'react-color';
import Popover from 'material-ui/Popover';
import {Map} from 'immutable';
import {Editor, EditorState, RichUtils, DefaultDraftBlockRenderMap, convertFromRaw, convertToRaw} from 'draft-js';

const myBlockTypes = DefaultDraftBlockRenderMap.merge(new Map({
  right: {
    wrapper: <div className = "right-align"/>
  },
  center: {
    wrapper: <div className = "center-align"/>
  }

}));

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      docid: 1,
      title: '',
      editorState: EditorState.createEmpty(),
      currentFontSize: 12,
      inlineStyles: {},
      params: 1,
    };
    const self = this;
  }

  componentWillMount(){
    axios.post(`/getPost`, {
      docid: this.props.match.params.docid
    })
    .then(response=>{
      console.log("response in main component will mount", response);
      this.setState({
        editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(response.data.body))),
        title: response.data.title,
        // content: response.data.body
      });
      console.log('state after set state', this.state);
    })
    .catch(err=>console.log(err));
  }

  onChange(editorState){
    // const selection = window.getSelection();
    // console.log(selection.anchorNode, selection.anchorOffset, selection.focusNode);
    this.setState({
      editorState
    });
  }


  toggleFormat(e, style, block){
    // this.refs.editor.focus();
    e.preventDefault();
    if(block){
      this.setState({
        editorState: RichUtils.toggleBlockType(this.state.editorState, style, block)
      });
    }else{
      this.setState({
        editorState: RichUtils.toggleInlineStyle(this.state.editorState, style)
      });
    }
  }

  formatButton({icon, style, block}) {
    return(
      <RaisedButton
        backgroundColor = {
          // this.state.editorState.getCurrentInlineStyle().has(style) ?
          // String(colors.gray200) :
          String(colors.gray800)
        }
        onMouseDown = {(e) => this.toggleFormat(e, style, block)}
        icon={<FontIcon className="material-icons"> {icon} </FontIcon>}
  />
    );
  }

  formatColor(color){
    var newInlineStyles = Object.assign({}, this.state.inlineStyles, {[color.hex]: {color: color.hex}});
    this.setState({
      inlineStyles: newInlineStyles,
      editorState: RichUtils.toggleInlineStyle(this.state.editorState, color.hex)
    });
  }

  applyIncreaseFontSize(shrink){
    // console.log('increase font size', this.state.inlineStyles);
    var newFontSize = this.state.currentFontSize + (shrink ? -4 : 4);
    var newInlineStyles = Object.assign({}, this.state.inlineStyles, {[newFontSize]: {fontSize: `${newFontSize}px`}});
    var i = RichUtils.toggleInlineStyle(this.state.editorState, String(this.state.currentFontSize));
    this.setState({
      inlineStyles: newInlineStyles,
      editorState: RichUtils.toggleInlineStyle(i, String(newFontSize)),
      currentFontSize: newFontSize
    });
  }

  increaseFontSize(shrink){
    return(
      <RaisedButton
        backgroundColor = {String(colors.gray200)}
        onMouseDown = {()=> this.applyIncreaseFontSize(shrink)}
        icon={<FontIcon className="material-icons"> {shrink ? 'zoom_out' : 'zoom_in'} </FontIcon>}
      />
    );
  }

  // openColorPicker(e){
  //   this.setState({
  //     colorPickerOpen: true,
  //     colorPickerButton: e.target
  //   });
  // }
  //
  // closeColorPicker(){
  //   this.setState({
  //     colorPickerOpen: false
  //   });
  // }

  // colorPicker(){
  //   return(
  //     <div style = {{display: 'inline-block'}}>
  //     <RaisedButton
  //       backgroundColor = {String(colors.gray200)}
  //       icon={<FontIcon className="material-icons"> format_paint</FontIcon>}
  //       onClick = {this.openColorPicker.bind(this)}
  //     />
  //     <Popover
  //         open={this.state.colorPickerOpen}
  //         anchorEl={this.state.colorPickerButton}
  //         anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
  //         targetOrigin={{horizontal: 'left', vertical: 'top'}}
  //         onRequestClose={this.closeColorPicker.bind(this)}
  //       >
  //         <CirclePicker onChangeComplete = {this.formatColor.bind(this)} />
  //       </Popover>
  //     </div>
  //   );
  // }

  updateDoc(id, editorState){
    console.log('id in updateDoc', id);
    // console.log(typeof id);
    // console.log('editorState', editorState);

    axios.post(`/updatedoc`, {
      id: id,
      body: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
      inlineStyles: this.state.inlineStyles
    })
    .then(resp=>{
      alert('Document Saved!');
    })
    .catch(err=>console.log(err));
  }

  saveChanges(){
    return(
      <RaisedButton
        primary={true}
        // backgroundColor = {String(colors.gray200)}
        onMouseDown ={()=>(this.updateDoc(this.props.match.params.docid, this.state.editorState))}
        icon={<FontIcon className="material-icons"> save </FontIcon>}
      />
    );
  }

  returnHome(){
    return(
      <RaisedButton
        backgroundColor="#a4c639"
        onMouseDown = {()=>this.returnDocPortal()}
        icon={<FontIcon className="material-icons"> home </FontIcon>}/>
    );
  }

  returnDocPortal(){
    console.log('/document/'+ this.props.match.params.userid);
    var returnHomePage = confirm("Are you sure you want to return to main page?");
    if (returnHomePage){
      this.props.history.push('/document/'+ this.props.match.params.userid);
    }else{
      return;
    }
  }

  deleteDoc(){
    return(
      <RaisedButton
         secondary={true}
        // backgroundColor = {String(colors.gray800)}
        onMouseDown = {()=>this.delete()}
        icon={<FontIcon className="material-icons"> delete </FontIcon>}/>
    );
  }

  delete(){
    console.log('/delete/'+ this.props.match.params.userid + '/' + this.props.match.params.docid);
    var deleteConfirm = confirm("Are you sure you want to delete this document?");
    if (deleteConfirm){
      axios.post('http://localhost:3000/deletedoc', {
        docid: this.props.match.params.docid,
      })
      .then(resp=>{
        return alert('Document Deleted!');
      })
      .then(resp=>{
        this.props.history.push('/document/'+ this.props.match.params.userid);
      })
      .catch(err=>console.log(err));
    }else{
      return;
    }
  }

  render(){
    return (
    <div>
      <h3>Document ID: {this.state.docid}</h3> <br></br>
      <h3> Title: {this.state.title}</h3>
      <div className = "toolbar">
        {this.formatButton({icon: 'format_bold', style: 'BOLD'})}
        {this.formatButton({icon: 'format_italic', style: 'ITALIC'})}
        {this.formatButton({icon: 'format_underlined', style: 'UNDERLINE'})}
        {/* {this.colorPicker()} */}
        {this.formatButton({icon: 'format_list_numbered', style: 'ordered-list-item', block: true})}
        {this.formatButton({icon: 'format_list_numbered', style: 'unordered-list-item', block: true})}
        {this.formatButton({icon: 'format_align_left', style: 'unstyled', block: true})}
        {this.formatButton({icon: 'format_align_center', style: 'center', block: true})}
        {this.formatButton({icon: 'format_align_right', style: 'right', block: true})}
        {this.increaseFontSize(false)}
        {this.increaseFontSize(true)}
      </div>
      <div className = "toolbar">
        {this.saveChanges()}
        {this.returnHome()}
        {this.deleteDoc()}
      </div>
      <div style={{borderTop: '2px solid lightGrey', margin: '20px', marginRight: '40px', marginLeft: '40px', padding: '10px'}}>
        <Editor
          ref = 'editor'
          blockRenderMap={myBlockTypes}
          customStyleMap = {this.state.inlineStyles}
          onChange = {this.onChange.bind(this)}
          editorState = {this.state.editorState}
        />
      </div>
    </div>
    );
  }
}

export default Post;
