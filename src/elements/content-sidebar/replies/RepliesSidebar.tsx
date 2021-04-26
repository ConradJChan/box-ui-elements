import * as React from 'react';
import classNames from 'classnames';
import { FormattedMessage, MessageDescriptor } from 'react-intl';
import { useHistory, useLocation, useParams } from 'react-router-dom';
// @ts-ignore flow import
import Comment from '../activity-feed/comment';
// @ts-ignore flow import
import CommentForm from '../activity-feed/comment-form';
import repliesMessages from './messages';
// @ts-ignore flow import
import SidebarContent from '../SidebarContent';
// @ts-ignore flow import
import { BackButton } from '../../common/nav-button';
// @ts-ignore flow import
import { LoadingIndicatorWrapper } from '../../../components/loading-indicator';
import { Message } from './RepliesSidebarContainer';
// @ts-ignore flow import
import { SIDEBAR_VIEW_REPLIES } from '../../../constants';

import './RepliesSidebar.scss';

export type Props = {
    currentUser?: object;
    elementId?: string;
    error?: MessageDescriptor;
    fileId: string;
    getAvatarUrl?: Function;
    getMentionWithQuery?: Function;
    getUserProfileUrl?: Function;
    isLoading: boolean;
    mentionSelectorContacts: Array<object>;
    messages: Array<Message>;
    onCommentDelete: Function;
    onCommentEdit: Function;
};

const RepliesSidebar = (props: Props, ref: React.Ref<SidebarContent>): JSX.Element => {
    const {
        currentUser,
        elementId,
        error,
        fileId,
        getAvatarUrl,
        getMentionWithQuery,
        getUserProfileUrl,
        isLoading,
        mentionSelectorContacts,
        messages,
        onCommentDelete,
        onCommentEdit,
    } = props;
    // TODO: need to upgrade react-router-dom to 5.1.x
    const history = useHistory();
    const { replyId } = useParams();
    const { pathname } = useLocation();
    const returnPath = pathname.substr(0, pathname.lastIndexOf('/replies'));

    const handleFormCancel = () => history.push(returnPath);
    const handleFormSubmit = () => {};

    return (
        <SidebarContent
            ref={ref}
            className="bcs-Replies"
            data-resin-component="preview"
            data-resin-feature="replies"
            elementId={elementId}
            sidebarView={SIDEBAR_VIEW_REPLIES}
            title={
                <>
                    <BackButton data-resin-target="back" to={returnPath} />
                    <FormattedMessage {...repliesMessages.repliesTitle} />
                </>
            }
        >
            <LoadingIndicatorWrapper className="bcs-Replies-content" crawlerPosition="top" isLoading={isLoading}>
                <>
                    <ul className="bcs-Replies-list">
                        {messages.map(({ id, message, ...rest }) => {
                            const isFocused = id === replyId;
                            return (
                                <li
                                    key={id}
                                    className={classNames('bcs-Replies-list-item', { 'bcs-is-focused': isFocused })}
                                >
                                    <Comment
                                        {...rest}
                                        currentUser={currentUser}
                                        getAvatarUrl={getAvatarUrl}
                                        getMentionWithQuery={getMentionWithQuery}
                                        getUserProfileUrl={getUserProfileUrl}
                                        mentionSelectorContacts={mentionSelectorContacts}
                                        onDelete={onCommentDelete}
                                        onEdit={onCommentEdit}
                                        permissions={{
                                            can_delete: true,
                                            can_edit: true,
                                        }}
                                        tagged_message={message}
                                    />
                                </li>
                            );
                        })}
                    </ul>
                    <CommentForm
                        className="bcs-Replies-editor"
                        createComment={handleFormSubmit}
                        getAvatarUrl={getAvatarUrl}
                        getMentionWithQuery={getMentionWithQuery}
                        isOpen
                        mentionSelectorContacts={mentionSelectorContacts}
                        onCancel={handleFormCancel}
                        placeholder="Reply..."
                        user={currentUser}
                    />
                </>
            </LoadingIndicatorWrapper>
        </SidebarContent>
    );
};

export default React.forwardRef(RepliesSidebar);
