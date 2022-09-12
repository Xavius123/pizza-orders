import React, { ReactElement } from 'react';
import './feature-header.scss';
interface FeatureHeaderProps {
    headerText: string;
}

export const FeatureHeader = (props: FeatureHeaderProps): ReactElement => {
    const { headerText } = props;
    return <div className="header">{headerText}</div>;
};
