import * as React from 'react';
import { FormattedMessage, MessageDescriptor } from 'react-intl';
import { useHistory, useLocation, useParams } from 'react-router-dom';
// @ts-ignore flow import
import CommentForm from '../activity-feed/comment-form';
import repliesMessages from './messages';
// @ts-ignore flow import
import SidebarContent from '../SidebarContent';
// @ts-ignore flow import
import { BackButton } from '../../common/nav-button';
// @ts-ignore flow import
import { LoadingIndicatorWrapper } from '../../../components/loading-indicator';
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
    isLoading: boolean;
    mentionSelectorContacts: Array<object>;
    messages: Array<object>;
};

const RepliesSidebar = (props: Props, ref: React.Ref<SidebarContent>): JSX.Element => {
    const {
        currentUser,
        elementId,
        error,
        fileId,
        getAvatarUrl,
        getMentionWithQuery,
        isLoading,
        mentionSelectorContacts,
        messages,
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
                    <div className="bcs-Replies-list">
                        {`Content, came from pathname=${pathname}, replyId=${replyId}`}
                        <pre>{JSON.stringify(messages, undefined, '  ')}</pre>
                    </div>
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
