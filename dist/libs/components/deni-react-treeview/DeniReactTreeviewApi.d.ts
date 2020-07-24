declare const deniReactTreeviewApi: (scope: any) => {
    addItem: (text: any, isLeaf: any, parentNode: any) => {
        text: any;
        children: never[];
        isLeaf: any;
    };
    findFolder: (folderToFind: any) => any;
    expandAll: () => void;
    findNode: (nodeToFind: any) => any;
    findItem: (itemToFind: any) => any;
    getItems: () => any;
    getParentNode: (item: any) => any;
    getRootItem: () => any;
    getSelectedItem: () => any;
    load: (item: any) => Promise<unknown>;
    loadData: (treeview: any, data: any, item: any) => void;
    removeItem: (id: any) => void;
    selectItem: (itemToFind: any) => void;
    setTheme: (newTheme: any) => void;
};
export { deniReactTreeviewApi };
