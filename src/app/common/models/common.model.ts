export enum SnackBarPanelClass {
    errorClass = 'error-snackbar',
    successClass = 'success-snackbar'
}

export interface ConfirmDialogConfig {
    type: 'delete-dialog',
    header: string,
    message: string,
    image?: string
}