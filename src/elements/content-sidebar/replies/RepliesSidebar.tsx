import * as React from 'react';
import { FormattedMessage, MessageDescriptor } from 'react-intl';
import { useLocation, useParams } from 'react-router-dom';
import messages from './messages';
// @ts-ignore flow import
import SidebarContent from '../SidebarContent';
// @ts-ignore flow import
import { BackButton } from '../../common/nav-button';
// @ts-ignore flow import
import { LoadingIndicatorWrapper } from '../../../components/loading-indicator';

export type Props = {
    error?: MessageDescriptor;
    fileId: string;
    isLoading: boolean;
    replies: Array<object>;
};

const RepliesSidebar = (props: Props, ref: React.Ref<SidebarContent>): JSX.Element => {
    const { error, fileId, isLoading, replies } = props;
    // TODO: need to upgrade react-router-dom to 5.1.x
    const { replyId } = useParams();
    const { pathname } = useLocation();
    const returnPath = pathname.substr(0, pathname.lastIndexOf('/replies'));
    return (
        <SidebarContent
            ref={ref}
            className="bcs-Replies"
            data-resin-component="preview"
            data-resin-feature="replies"
            title={
                <>
                    <BackButton data-resin-target="back" to={returnPath} />
                    <FormattedMessage {...messages.repliesTitle} />
                </>
            }
        >
            <LoadingIndicatorWrapper className="bcs-Replies-content" crawlerPosition="top" isLoading={isLoading}>
                {`Content, came from pathname=${pathname}, replyId=${replyId}`}
            </LoadingIndicatorWrapper>
        </SidebarContent>
    );
};

export default React.forwardRef(RepliesSidebar);
