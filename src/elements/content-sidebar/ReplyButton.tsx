import * as React from 'react';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import ArrowArcRight from '../../icon/fill/ArrowArcRight';
import PlainButton, { PlainButtonProps } from '../../components/plain-button';
// @ts-ignore flow import
import messages from './messages';

import './ReplyButton.scss';

type Props = PlainButtonProps;

const ReplyButton = ({ className, ...rest }: Props): JSX.Element => (
    <PlainButton className={classNames('bcs-ReplyButton', className)} type="button" {...rest}>
        <ArrowArcRight className="bcs-ReplyButton-icon" height={14} width={14} />
        <FormattedMessage {...messages.reply}>
            {txt => <span className="bcs-ReplyButton-label">{txt}</span>}
        </FormattedMessage>
    </PlainButton>
);

export default ReplyButton;
