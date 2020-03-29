/**
 * @flow
 * @file AppActivity component
 */

import * as React from 'react';
import classNames from 'classnames';
import noop from 'lodash/noop';
import { injectIntl } from 'react-intl';

import ActivityTimestamp from '../common/activity-timestamp';
import Media from '../../../../components/media';
import type { User } from '../../../../common/types/core';
import Avatar from '../Avatar';
import ActivityMessage from '../common/activity-message';
import UserLink from '../common/user-link';
import PlainButton from '../../../../components/plain-button';
import { withAnnotatorContext } from '../../../common/annotator-context';
import './Annotation.scss';

type Props = {
    annotator: Object,
    createdAt: string,
    createdBy: User,
    error?: ActionItemError,
    id: string,
    intl: any,
    isPending?: boolean,
    location: Object,
    message: string,
};

type State = {
    isConfirmingDelete: boolean,
};

class Annotation extends React.PureComponent<Props, State> {
    static defaultProps = {
        onDelete: noop,
        permissions: {},
    };

    handleClick = event => {
        const { annotator, id } = this.props;
        event.preventDefault();
        event.stopPropagation();
        annotator.selectById(id, event);
    };

    render() {
        const { createdAt, createdBy, id, isPending, location, message } = this.props;

        const createdAtTimestamp = new Date(createdAt).getTime();

        return (
            <Media
                className={classNames('bcs-Annotation', {
                    'bcs-is-pending': isPending,
                })}
            >
                <Media.Figure>
                    <Avatar user={createdBy} />
                </Media.Figure>

                <Media.Body>
                    <div className="bcs-Annotation-headline">
                        <UserLink id={createdBy.id} name={createdBy.name} />
                    </div>
                    <div>{createdAt && <ActivityTimestamp date={createdAtTimestamp} />}</div>
                    <ActivityMessage id={id} tagged_message={message} />
                    {location && <PlainButton onClick={this.handleClick}>{`Page ${location.page}`}</PlainButton>}
                </Media.Body>
            </Media>
        );
    }
}

export default withAnnotatorContext(injectIntl(Annotation));
