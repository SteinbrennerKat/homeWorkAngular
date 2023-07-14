import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MatCardModule} from "@angular/material/card";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatCardModule
  ]
})
export class WelcomeComponent {}
