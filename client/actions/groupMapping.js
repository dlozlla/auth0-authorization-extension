import axios from 'axios';
import * as constants from '../constants';

/*
 * Load the mappings of a single group.
 */
export function fetchGroupMappings(groupId) {
  return {
    type: constants.FETCH_GROUP_MAPPINGS,
    meta: {
      groupId
    },
    payload: {
      promise: axios.get(`/api/groups/${groupId}/mappings`, {
        timeout: 5000,
        responseType: 'json'
      })
    }
  };
}

/*
 * Create a new group mapping.
 */
export function createGroupMapping() {
  return {
    type: constants.CREATE_GROUP_MAPPING
  };
}

/*
 * Edit an existing group mapping.
 */
export function editGroupMapping(groupMapping) {
  return {
    type: constants.EDIT_GROUP_MAPPING,
    payload: {
      groupMapping
    }
  };
}

/*
 * Save a new or modified group mapping.
 */
export function saveGroupMapping(group, groupMapping) {
  return (dispatch, getState) => {
    const state = getState().groupMapping.toJS();
    dispatch({
      type: constants.SAVE_GROUP_MAPPING,
      payload: {
        promise: axios({
          method: state.isNew ? 'post' : 'put',
          url: state.isNew ? `/api/groups/${group._id}/mappings` : `/api/groups/${group._id}/mappings/${groupMapping._id}`,
          data: groupMapping,
          timeout: 5000,
          responseType: 'json'
        })
      },
      meta: {
        isNew: state.isNew,
        groupMapping,
        groupMappingId: groupMapping._id
      }
    });
  };
}

/*
 * Get confirmation to delete a group mapping.
 */
export function requestDeleteGroupMapping(groupMapping) {
  return {
    type: constants.REQUEST_DELETE_GROUP_MAPPING,
    payload: {
      groupMapping
    }
  };
}

/*
 * Cancel deleting the group mapping
 */
export function cancelDeleteGroupMapping() {
  return {
    type: constants.CANCEL_DELETE_GROUP_MAPPING
  };
}

/*
 * Delete a group mapping.
 */
export function deleteGroupMapping(group) {
  return (dispatch, getState) => {
    const groupMappingId = getState().groupMapping.get('groupMappingId');
    dispatch({
      type: constants.DELETE_GROUP_MAPPING,
      payload: {
        promise: axios.delete(`/api/groups/${group._id}/mappings/${groupMappingId}`, {
          timeout: 5000,
          responseType: 'json'
        })
      },
      meta: {
        groupMappingId
      }
    });
  };
}

/*
 * Clear the current group mapping.
 */
export function clearGroupMapping() {
  return {
    type: constants.CLEAR_GROUP_MAPPING
  };
}
