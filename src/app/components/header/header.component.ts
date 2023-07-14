import {ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class HeaderComponent {
  @Output() toggleSideMenu: EventEmitter<void> = new EventEmitter();

  onMenuButtonClick() {
    this.toggleSideMenu.emit();
  }
}
