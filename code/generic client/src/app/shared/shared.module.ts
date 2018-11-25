import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatToolbarModule,
  MatMenuModule,
  MatSelectModule,
  MatTabsModule,
  MatProgressSpinnerModule,
  MatChipsModule,
  MatCheckboxModule,
  MatSidenavModule,
  MatCardModule,
  MatListModule,
  MatIconModule,
  MatInputModule,
  MatTooltipModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatExpansionModule,
  MatAutocompleteModule,
  MatTableModule,
  MatRadioModule,
  MatSnackBarModule,
  MatProgressBarModule,
  MatDialogModule
} from '@angular/material';

const materialModules = [
  MatButtonModule,
  MatToolbarModule,
  MatSelectModule,
  MatTabsModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatChipsModule,
  MatCardModule,
  MatSidenavModule,
  MatCheckboxModule,
  MatListModule,
  MatMenuModule,
  MatIconModule,
  MatTooltipModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSnackBarModule,
  MatTableModule,
  MatAutocompleteModule,
  MatExpansionModule,
  MatProgressBarModule,
  MatRadioModule,
  MatDialogModule
];

@NgModule({
  imports: [
    CommonModule,
    ...materialModules
  ],
  declarations: [],
  exports: [
    ...materialModules,
  ]
})
export class SharedModule { }
