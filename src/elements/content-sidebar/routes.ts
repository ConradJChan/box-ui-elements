import {
    SIDEBAR_VIEW_ACTIVITY,
    SIDEBAR_VIEW_DETAILS,
    SIDEBAR_VIEW_METADATA,
    SIDEBAR_VIEW_REPLIES,
    SIDEBAR_VIEW_SKILLS,
    SIDEBAR_VIEW_VERSIONS,
    // @ts-ignore flow import
} from '../../constants';

export const ACTIVITY_BASE = `/:sidebar(${SIDEBAR_VIEW_ACTIVITY})`;
export const ACTIVITY_ANNOTATIONS = `${ACTIVITY_BASE}/:activeFeedEntryType(annotations)/:fileVersionId/:activeFeedEntryId?`;
export const ACTIVITY_COMMENTS_TASKS = `${ACTIVITY_BASE}/:activeFeedEntryType(comments|tasks)/:activeFeedEntryId?`;
export const DETAILS = `/:sidebar(${SIDEBAR_VIEW_DETAILS})`;
export const METADATA = `/:sidebar(${SIDEBAR_VIEW_METADATA})`;
export const REPLIES_ANNOTATIONS = `${ACTIVITY_ANNOTATIONS}/${SIDEBAR_VIEW_REPLIES}/:replyId?`;
export const REPLIES_COMMENTS_TASKS = `${ACTIVITY_COMMENTS_TASKS}/${SIDEBAR_VIEW_REPLIES}/:replyId?`;
export const SKILLS = `/:sidebar(${SIDEBAR_VIEW_SKILLS})`;
export const VERSIONS = `/:sidebar(activity|details)/${SIDEBAR_VIEW_VERSIONS}/:versionId?`;
