declare const loadingSetup: (treeview: any) => void;
declare const setTheme: (treeview: any, newTheme: any) => void;
declare const load: (treeview: any, item: any) => Promise<unknown>;
declare const loadData: (treeview: any, data: any, item: any) => void;
export { loadingSetup, setTheme, load, loadData };
