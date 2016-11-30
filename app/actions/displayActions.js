import request from 'superagent';
import { openDocuments, openUserDoc, openRoles } from './menuActions.js';
import { errorSet, notification } from './authActions.js';

export function displayUsers(users) {
  return {
    type: 'DISPLAY_USERS',
    users,
  };
}

export function displayDocs(documents) {
  return {
    type: 'DISPLAY_DOCUMENTS',
    documents,
  };
}

export function displayRoles(roles) {
  return {
    type: 'DISPLAY_ROLES',
    roles,
  };
}

export function displayDashboard(info) {
  return {
    type: 'DISPLAY_DASHBOARD',
    info,
  };
}
export function changePage(page) {
  return {
    type: 'CHANGE_PAGE',
    page,
  };
}
export function editDoc(editDoc) {
  return {
    type: 'EDIT_DOC',
    editDoc,
  };
}
export function userDoc(userDocs) {
  return {
    type: 'CURRENT_DOCS',
    userDocs,
  };
}
export function createDoc(doc) {
  return (dispatch) => {
    const token = window.localStorage.getItem('token').replace(/"/g, '');
    return request
    .post('/api/documents')
    .set({ 'x-access-token': token })
    .send({
      title: doc.title,
      content: doc.content,
      permissions: doc.permissions,
    })
    .then((res) => {
      if (res.status === 200) {
        dispatch(reloadPage(1));
      }
    });
  };
}
export function createRole(role) {
  return (dispatch) => {
    const token = window.localStorage.getItem('token').replace(/"/g, '');
    return request
    .post('/api/roles')
    .set({ 'x-access-token': token })
    .send({
      title: role.title,
    })
    .then((res) => {
      if (res.status === 200) {
        dispatch(notification('Role successfully added'));
        dispatch(reloadRoles(1));
      }
    });
  };
}
export function selectedUser(row) {
  return (dispatch, getState) => {
    const docs = getState().display.users[row]._id;
    const token = window.localStorage.getItem('token').replace(/"/g, '');
    return request
      .get(`/api/users/${docs}/documents`)
      .set({ 'x-access-token': token })
      .then((res) => {
        if (res.status === 200) {
          const userDocs = res.body;
          dispatch(userDoc(userDocs));
          dispatch(openUserDoc(true));
        } else {
          dispatch(errorSet(res.text));
        }
      });
  };
}

export function reloadPage(page) {
  return (dispatch) => {
    dispatch(changePage(page));
    const token = window.localStorage.getItem('token').replace(/"/g, '');
    return (request
      .get('/api/documents/')
      .set({ 'x-access-token': token })
      .query({
        limit: 3,
        page,
      })
      .accept('json')
      .then((res) => {
        const documents = res.body;
        dispatch(displayDocs(documents));
        const documentsMenu = true;
        dispatch(openDocuments(documentsMenu));
      })
    );
  };
}
export function reloadRoles(page) {
  return (dispatch) => {
    dispatch(changePage(page));
    const token = window.localStorage.getItem('token').replace(/"/g, '');
    return (request
      .get('/api/roles/')
      .set({ 'x-access-token': token })
      .query({
        limit: 3,
        page,
      })
      .accept('json')
      .then((res) => {
        const roles = res.body;
        dispatch(displayRoles(roles));
        const rolesMenu = true;
        dispatch(openRoles(rolesMenu));
      })
    );
  };
}
export function handleEditSubmit(doc) {
  return (dispatch) => {
    const id = doc.id;
    const token = window.localStorage.getItem('token').replace(/"/g, '');
    return request
      .put(`/api/documents/${id}`)
      .set({ 'x-access-token': token })
      .send({
        title: doc.title,
        content: doc.content,
        permissions: doc.permissions,
      })
      .then((res) => {
        if (res.status === 200) {
          dispatch(reloadPage(1));
        }
      });
  };
}
export function handleEditRole(role) {
  return (dispatch) => {
    const id = role.id;
    const token = window.localStorage.getItem('token').replace(/"/g, '');
    return request
      .put(`/api/roles/${id}`)
      .set({ 'x-access-token': token })
      .send({
        title: role.title,
      })
      .then((res) => {
        if (res.status === 200) {
          dispatch(reloadRoles(1));
        }
      });
  };
}
export function deleteDoc(doc) {
  return (dispatch) => {
    const token = window.localStorage.getItem('token').replace(/"/g, '');
      return request
        .del(`/api/documents/${doc}`)
        .set({ 'x-access-token': token })
        .then((res) => {
          if (res.status === 200) {
            dispatch(reloadPage(1));
          } else {
            return res;
          }
        });
  };
}

export function deleteRole(role) {
  return (dispatch) => {
    console.log('GETS HERE');
    const token = window.localStorage.getItem('token').replace(/"/g, '');
      return request
        .del(`/api/roles/${role}`)
        .set({ 'x-access-token': token })
        .then((res) => {
          if (res.status === 200) {
            dispatch(reloadRoles(1));
          } else {
            return res;
          }
        });
  };
}
