import * as _angular_core from '@angular/core';
import { GridReadyEvent, ColDef } from 'ag-grid-community';
import { Observable } from 'rxjs';

type columnType = 'text' | 'number' | 'date' | 'boolean' | 'custom' | 'currency' | 'percentage' | 'email' | 'url' | 'image' | 'icon' | 'button' | 'select' | 'multi-select' | 'radio' | 'checkbox' | 'color' | 'progress-bar' | 'rating' | 'tag' | 'badge' | 'avatar' | 'tooltip' | 'link' | 'actions' | 'nested' | 'tree' | 'group' | 'pivot' | 'sparkline' | 'heatmap' | 'calendar' | 'timeline' | 'gauge' | 'chart' | 'map' | 'custom-component';
interface columnDefs {
    headerName: string;
    field: string;
    type?: columnType;
    width?: number;
    flex?: number;
    sortable?: boolean;
    filter?: boolean;
    resizable?: boolean;
    currencySymbol?: string;
    actions?: {
        name: string;
        label: string;
        btnClass?: string;
    }[];
    badgeColorMap?: Record<string, {
        bg: string;
        text: string;
    }>;
}
interface gridConfig {
    gridId: string;
    title?: string;
    rowData?: any[];
    columns: columnDefs[];
    pagination?: boolean;
    pageSize?: number;
    paginationPageSize?: number;
    rowSelection?: 'single' | 'multiple';
    defaultColDef?: any;
    enableExport?: boolean;
    enableSearch?: boolean;
}
type DataFetcherFn<T = any> = () => Observable<{
    success: boolean;
    data: T[];
}>;

declare class AgGridUi {
    config: _angular_core.InputSignal<gridConfig>;
    fetchService: _angular_core.InputSignal<DataFetcherFn | undefined>;
    staticData: _angular_core.InputSignal<any[] | undefined>;
    actionTriggered: _angular_core.OutputEmitterRef<{
        actionName: string;
        rowData: any;
    }>;
    constructor();
    ngOnInit(): void;
    loadData(): void;
    onQuickFilterChanged(event: any): void;
    exportCsv(): void;
    onGridReady(params: GridReadyEvent): void;
    rowData: _angular_core.WritableSignal<any[]>;
    isLoading: _angular_core.WritableSignal<boolean>;
    errorMessage: _angular_core.WritableSignal<string>;
    private gridApi?;
    defaultColDef: ColDef;
    columnDefs: _angular_core.Signal<ColDef<any, any>[]>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<AgGridUi, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<AgGridUi, "agGrid-ui  ", never, { "config": { "alias": "config"; "required": true; "isSignal": true; }; "fetchService": { "alias": "fetchService"; "required": false; "isSignal": true; }; "staticData": { "alias": "staticData"; "required": false; "isSignal": true; }; }, { "actionTriggered": "actionTriggered"; }, never, never, true, never>;
}

export { AgGridUi };
export type { DataFetcherFn, columnDefs, columnType, gridConfig };
