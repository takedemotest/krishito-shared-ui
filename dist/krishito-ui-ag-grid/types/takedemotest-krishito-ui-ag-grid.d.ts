import * as _angular_core from '@angular/core';
import { Observable } from 'rxjs';
import { ColDef, GridReadyEvent } from 'ag-grid-community';

type columnType = 'text' | 'number' | 'date' | 'boolean' | 'custom' | 'currency' | 'percentage' | 'email' | 'url' | 'image' | 'icon' | 'button' | 'select' | 'multi-select' | 'radio' | 'checkbox' | 'color' | 'progress-bar' | 'rating' | 'tag' | 'badge' | 'avatar' | 'tooltip' | 'link' | 'actions' | 'nested' | 'tree' | 'group' | 'pivot' | 'sparkline' | 'heatmap' | 'calendar' | 'timeline' | 'gauge' | 'chart' | 'map' | 'custom-component';
interface columnDefs extends ColDef {
    customMeta?: string;
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
    actionButtons?: headerAction[];
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
interface headerAction {
    actionName: string;
    label?: string;
    icon: string;
    disable?: boolean;
}
interface GridActionPayload {
    actionName: string;
    rowData: any | null;
    selectedRows?: any[];
}

declare class AgGridUiComponent {
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
    onGridReady(params: GridReadyEvent): void;
    rowData: _angular_core.WritableSignal<any[]>;
    isLoading: _angular_core.WritableSignal<boolean>;
    errorMessage: _angular_core.WritableSignal<string>;
    private gridApi?;
    defaultColDef: ColDef;
    columnDefs: _angular_core.Signal<ColDef<any, any>[]>;
    handleAction(payload: GridActionPayload): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<AgGridUiComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<AgGridUiComponent, "agGrid-ui", never, { "config": { "alias": "config"; "required": true; "isSignal": true; }; "fetchService": { "alias": "fetchService"; "required": false; "isSignal": true; }; "staticData": { "alias": "staticData"; "required": false; "isSignal": true; }; }, { "actionTriggered": "actionTriggered"; }, never, never, true, never>;
}

export { AgGridUiComponent };
export type { DataFetcherFn, GridActionPayload, columnDefs, columnType, gridConfig, headerAction };
