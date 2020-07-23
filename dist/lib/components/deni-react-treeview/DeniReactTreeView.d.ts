import React from 'react';
import './DeniReactTreeView.scss';
import { DeniReactTreeviewProps } from './DeniReactTreeviewProps';
interface DeniReactTreeviewState {
    loading: boolean;
    theme: string;
    expandAll?: boolean;
}
declare class DeniReactTreeView extends React.Component<DeniReactTreeviewProps, DeniReactTreeviewState> {
    api: any;
    container: any;
    constructor(props: DeniReactTreeviewProps);
    componentDidUpdate(prevProps: any, prevState: any): void;
    componentDidMount(): void;
    expandAllFinished(): void;
    render(): JSX.Element;
}
export default DeniReactTreeView;
