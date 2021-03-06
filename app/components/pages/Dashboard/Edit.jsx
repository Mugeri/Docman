import React from 'react';
import Dialog from 'material-ui/Dialog';
import { FlatButton, TextField, Toggle } from 'material-ui';

const editStyle = {
  textAlign: 'center',
  fontFamily: 'Bree Serif',
};

export default class Edit extends React.Component {
  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.props.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.props.handleSubmit}
      />,
    ];
    return (
      <div >
        <Dialog
          title="New Document"
          actions={actions}
          modal={true}
          open={this.props.open}
          onRequestClose={this.props.handleClose}
          contentStyle={editStyle}
        >
          <div>
            <form>
              <TextField
                floatingLabelText="Title"
                name="title"
                defaultValue={this.props.defaultTitle}
                onChange={this.props.handleTitle}
                style={{ width: '80%' }}
              /><br />
              <br />
              <TextField
                multiLine={true}
                fullWidth={true}
                rows={2}
                floatingLabelText="Content"
                name="content"
                defaultValue={this.props.defaultContent}
                onChange={this.props.handleContent}
                style={{ width: '80%' }}
              />
              <br />
            </form>
          </div>
          <Toggle
            label="make private"
            defaultToggled={false}
            onToggle={this.props.handleToggle}
            labelPosition="right"
          />
        </Dialog>
      </div>
    );
  }
}
