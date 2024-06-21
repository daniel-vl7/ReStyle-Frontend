import {Component, Input, OnInit} from '@angular/core';
import {ToolbarComponent} from "../../public/components/toolbar/toolbar.component";
import {SidebarComponent} from "../../public/components/sidebar/sidebar.component";
import {MatIconModule} from "@angular/material/icon";
import {MatTabsModule} from "@angular/material/tabs";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {FormBuilder, FormGroup, FormsModule, UntypedFormBuilder, Validators} from "@angular/forms";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import {PortfolioSnackComponent} from "../portfolio-snack/portfolio-snack.component";
import {SnackbarService} from "../../shared/services/snackbar.service";

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
  styleUrl: './portfolio.component.css'
})
export class PortfolioComponent implements OnInit {

  @Input() maxRating = 5;
  maxRatingArray:any =[];

  @Input() SelectedStar = 0;
  previousSelection = 0;

  constructor(private fb: UntypedFormBuilder,  private snackbarService: SnackbarService) {}

  showSuccessMessage(messageContent: string) {
    const successImage='assets/images/success.png'
    this.snackbarService.showSuccess1(messageContent, successImage);
  }

  showErrorMessage(messageContent: string) {
    const errorImage='assets/images/error.png'
    this.snackbarService.showError1(messageContent, errorImage);
  }

  editForm = this.fb.group({
    photo: []
  });

  addProject(): void {
    if (this.editForm.valid) {
      this.showSuccessMessage('El proyecto ah sido agregado de manera exitosa');
    }else if (!this.editForm.valid) {
      this.showErrorMessage('Error al agregar el proyecto');
    }
  }

  setFileData(event: Event): void {
    const eventTarget: HTMLInputElement | null = event.target as HTMLInputElement | null;
    if (eventTarget?.files?.[0]) {
      const file: File = eventTarget.files[0];
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        this.editForm.get('photo')?.setValue(reader.result as string);
      });
      reader.readAsDataURL(file);
    }
  }

  ngOnInit(): void {
    this.maxRatingArray = Array(this.maxRating).fill(0);
  }

}
