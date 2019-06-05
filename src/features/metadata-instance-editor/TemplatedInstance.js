// @flow
import * as React from 'react';
import { FormattedMessage } from 'react-intl';

import Field from './fields/Field';
import messages from './messages';
import isHidden from './metadataUtil';
import './TemplatedInstance.scss';

type Props = {
    canEdit: boolean,
    data: MetadataFields,
    errors: { [string]: React.Node },
    focusedData?: string,
    onFieldChange?: (key: string, value: MetadataFieldValue, type: string) => void,
    onFieldRemove?: (key: string) => void,
    onFocusChange?: Function,
    template: MetadataTemplate,
};

const TemplatedInstance = ({
    canEdit,
    data = {},
    errors,
    focusedData,
    onFieldChange,
    onFieldRemove,
    template,
    onFocusChange,
}: Props) => {
    const { fields = [] } = template;
    const hasFields = fields.length > 0;
    const hasVisibleFields = hasFields && fields.some(field => !isHidden(field));
    const showNoFieldsMessage = !hasFields;
    const showHiddenFieldsMessage = hasFields && !hasVisibleFields;

    return (
        <React.Fragment>
            {hasVisibleFields &&
                fields.map(field => (
                    <Field
                        key={field.id}
                        canEdit={canEdit}
                        dataKey={field.key}
                        dataValue={data[field.key]}
                        description={field.description}
                        displayName={field.displayName}
                        error={errors[field.key]}
                        isFocused={field.key === focusedData}
                        isHidden={isHidden(field)} // Checking both isHidden and hidden attributes due to differences in V2 and V3 APIs
                        onFocusChange={onFocusChange}
                        onChange={(key: string, value: MetadataFieldValue) => {
                            if (canEdit && onFieldChange) {
                                onFieldChange(key, value, field.type);
                            }
                        }}
                        onRemove={(key: string) => {
                            if (canEdit && onFieldRemove) {
                                onFieldRemove(key);
                            }
                        }}
                        options={field.options}
                        type={field.type}
                    />
                ))}
            {showHiddenFieldsMessage && (
                <div className="attributes-hidden-message">
                    <FormattedMessage {...messages.allAttributesAreHidden} />
                </div>
            )}
            {showNoFieldsMessage && (
                <div className="no-attributes-message">
                    <FormattedMessage {...messages.noAttributesForTemplate} />
                </div>
            )}
        </React.Fragment>
    );
};

export default TemplatedInstance;
