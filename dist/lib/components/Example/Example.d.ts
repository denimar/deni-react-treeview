import React from 'react';
import './example.scss';
export interface ExampleProps {
    active?: boolean | undefined;
    disabled?: boolean | undefined;
    children?: any;
    className?: string;
}
export declare class Example extends React.PureComponent<ExampleProps> {
    render(): JSX.Element;
}
