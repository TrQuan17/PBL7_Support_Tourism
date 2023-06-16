export enum SnackBarPanelClass {
    errorClass = 'error-snackbar',
    successClass = 'success-snackbar'
}

export interface ConfirmDialogConfig {
    type: 'delete-dialog' | 'update-dialog',
    header: string,
    message: string,
    image?: string
}

export const CUSTOM_DATE_FORMATS = {
    parse: {
      dateInput: 'LL',
    },
    display: {
      dateInput: 'DD/MM/YYYY',
      monthYearLabel: 'YYYY',
      dateA11yLabel: 'LL',
      monthYearA11yLabel: 'YYYY',
    },
  };