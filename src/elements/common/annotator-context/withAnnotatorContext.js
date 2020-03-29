/**
 * @flow
 * @file Wraps a component with the API context
 * @author Box
 */
import * as React from 'react';
import AnnotatorContext from './AnnotatorContext';

const withAnnotatorContext = (WrappedComponent: React.ComponentType<any>) =>
    React.forwardRef<Object, React.Ref<any>>((props: Object, ref: React.Ref<any>) => (
        <AnnotatorContext.Consumer>
            {annotator => <WrappedComponent ref={ref} {...props} annotator={annotator} />}
        </AnnotatorContext.Consumer>
    ));

export default withAnnotatorContext;
