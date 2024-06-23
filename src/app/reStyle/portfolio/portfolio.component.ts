import { Component, Input, OnInit } from '@angular/core';
import { ToolbarComponent } from "../../public/components/toolbar/toolbar.component";
import { SidebarComponent } from "../../public/components/sidebar/sidebar.component";
import { MatIconModule } from "@angular/material/icon";
import { MatTabsModule } from "@angular/material/tabs";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { SnackbarService } from '../../shared/services/snackbar.service';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [
    ToolbarComponent,
    SidebarComponent,
    MatIconModule,
    MatTabsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatSnackBarModule
  ],
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  _portfolioForm: FormGroup;

  get portfolioForm(): FormGroup {
    return this._portfolioForm;
  }

  set portfolioForm(value: FormGroup) {
    this._portfolioForm = value;
  }

  constructor(private snackbarService: SnackbarService, private http: HttpClient, private fb: FormBuilder) {
    this._portfolioForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });

    this.editForm = this.fb.group({
      photo: [null]
    });
  }

  showSuccessMessage(messageContent: string) {
    const successImage = 'assets/images/success.png';
    this.snackbarService.showSuccess1(messageContent, successImage);
  }

  showErrorMessage(messageContent: string) {
    const errorImage = 'assets/images/error.png';
    this.snackbarService.showError1(messageContent, errorImage);
  }

  editForm: FormGroup;

  addProject(): void {
    if (this.editForm.valid) {
      this.showSuccessMessage('El proyecto ha sido agregado de manera exitosa');
    } else {
      this.showErrorMessage('Error al agregar el proyecto');
    }
  }

  setFileData(event: Event): void {
    const eventTarget = event.target as HTMLInputElement;
    if (eventTarget?.files?.[0]) {
      const file: File = eventTarget.files[0];
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        this.editForm.get('photo')?.setValue(reader.result as string);
      });
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this._portfolioForm.valid) {
      const formData = {
        ...this._portfolioForm.value,
      };
      // Submit formData to your backend or further processing
    }
  }

  ngOnInit(): void {
  }
}
