import DeniReactTreeView from '../deni-react-treeview/DeniReactTreeView';
export interface DeniReactTreeviewItemProps {
    treeview: DeniReactTreeView;
    item: number;
    parent?: any;
    level: number;
    root?: any;
    selectRow?: boolean;
    expandAll?: boolean;
}
