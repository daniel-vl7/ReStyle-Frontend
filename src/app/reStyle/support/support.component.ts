import {Component, Input, OnInit} from '@angular/core';
import {ToolbarComponent} from "../../public/components/toolbar/toolbar.component";
import {SidebarComponent} from "../../public/components/sidebar/sidebar.component";
import {MatIconModule} from "@angular/material/icon";
import {MatTabsModule} from "@angular/material/tabs";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {FormsModule, UntypedFormBuilder} from "@angular/forms";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import {SupportSnackComponent} from "../support-snack/support-snack.component";
import {ContractorSidebarComponent} from "../../public/components/sidebarcontractor/sidebar.component";

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-support',
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
    MatSnackBarModule,
    ContractorSidebarComponent
  ],
  templateUrl: './support.component.html',
  styleUrl: './support.component.css'
})
export class SupportComponent implements OnInit{

  type: string = '';
  userType: string | null = null;

  @Input() maxRating = 5;
  maxRatingArray:any =[];

  @Input() SelectedStar = 0;
  previousSelection = 0;

  constructor(private fb: UntypedFormBuilder,  private _snackBar: MatSnackBar, private http: HttpClient) {}

  HandleMouseEnter(index: number): void {
    this.SelectedStar = index+1;
  }
  HandleMouseLeave(): void {
    if (this.previousSelection !== 0) {
      this.SelectedStar = this.previousSelection;
    }
    else{
      this.SelectedStar = 0;
    }
  }
  Rating(index: number): void {
    this.SelectedStar = index+1;
    this.previousSelection = this.SelectedStar;
  }

  editForm = this.fb.group({
    photo: []
  });

  addInquiry(): void {
    this._snackBar.openFromComponent(SupportSnackComponent, {
      duration:3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    })
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
    this.fetchUserType().subscribe((userType: string) => {
      this.userType = userType;
    });
    this.type = sessionStorage.getItem("userType") || '';

  }

  private fetchUserType(): Observable<string> {
    return this.http.get<string>('http://localhost:3000/user'); // Adjust URL as per your JSON Server setup
  }
}
