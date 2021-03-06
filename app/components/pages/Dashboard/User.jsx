import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Card, RaisedButton } from 'material-ui';
import { Table, TableBody, TableHeader,
  TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import Signup from '../Authentication/Signup.jsx';
import AppStyles from '../../../shared/styles/styles.css';
import { selectedUser } from '../../../actions/displayActions';
import { errorSet } from '../../../actions/authActions';
import Documents from './UserDocuments.jsx';


const div2 = {
  float: 'left',
  marginTop: '2%',
  marginLeft: '5%',
  width: '70%',
};
const style = {
  textAlign: 'centre',
  marginLeft: '35%',
  marginTop: '2%',
};
class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      register: false,
    };
    this.handleRegister = this.handleRegister.bind(this);
    this.handleRegisterClose = this.handleRegisterClose.bind(this);
  }
  handleRegister = () => {
    this.setState({ register: true });
  }
  handleRegisterClose = () => {
    this.setState({ register: false });
    this.props.errorSet('')
  }
  render() {
    const userTable = this.props.display.map((user) => {
      return (
        <TableRow key={user._id} >
          <TableRowColumn>{user.name.first + '  ' + user.name.last}</TableRowColumn>
          <TableRowColumn>{user.role}</TableRowColumn>
        </TableRow>);
    });
    return (
      <div>
        <div>
          <div className={AppStyles.button}>
          <RaisedButton
            label="Add User"
            secondary={true}
            style={style}
            onTouchTap={this.handleRegister}

          />
          </div>
          <Card style={div2} className={AppStyles.table}>
            <Table
              onRowSelection={(row) => {
                this.props.selectedUser(row);
              }}
              height='80%'
            >
              <TableHeader>
                <TableRow >
                  <TableHeaderColumn>Full Name</TableHeaderColumn>
                  <TableHeaderColumn>Status</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody >
                {userTable}
              </TableBody>
            </Table>
          </Card>
        </div>
        <Signup
          open={this.state.register}
          handleClose={this.handleRegisterClose}
        />
        { this.props.userDocOpen ? <Documents
          display={this.props.docInfo}
        /> : true}
      </div>

    );
  }
}
function mapStateToProps(state) {
  return {
    docInfo: state.display,
    userDocOpen: state.menu.userDocOpen,
  };
}
const theActions = Object.assign({}, { selectedUser }, { errorSet });
export default connect(mapStateToProps, theActions)(User);
User.propTypes = {
  userDocOpen: PropTypes.boolean,
  selectedUser: PropTypes.func,
  display: PropTypes.array,
};
