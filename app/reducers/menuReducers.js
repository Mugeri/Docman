const menu = {
  users: false,
  documents: true,
  roles: false,
};
export default function menuReducers(state = menu, action) {
  switch (action.type) {
    case 'OPEN_USERS':
      return Object.assign({}, state, {
        users: action.users,
        documents: false,
        roles: false,
      });
    case 'OPEN_DOCUMENTS':
      return Object.assign({}, state, {
        users: false,
        documents: action.documents,
        roles: false,
      });
    case 'OPEN_USER_DOC':
      return Object.assign({}, state, {
        userDocOpen: action.userDocOpen,
      });

    case 'OPEN_ROLES':
      return Object.assign({}, state, {
        users: false,
        documents: false,
        roles: action.roles,
      });

    case 'OPEN_RESULTS':
      return Object.assign({}, state, {
        resultsMenu: action.resultsMenu,
      });

    default:
      return state;

  }
}
