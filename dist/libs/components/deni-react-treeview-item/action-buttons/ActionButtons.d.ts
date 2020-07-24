import React from 'react';
import './ActionButtons.scss';
import { ActionButtonsProps } from './ActionButtonsProps';
declare class ActionButtons extends React.Component<ActionButtonsProps> {
    constructor(props: any);
    onClick(item: any, actionButton: any): void;
    render(): JSX.Element;
}
export default ActionButtons;
