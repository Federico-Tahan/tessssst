import { Component } from '@angular/core';
import { LargeCardIconComponent } from "../components/large-card-icon/large-card-icon.component";
import { InfoCardComponent } from "../components/info-card/info-card.component";

@Component({
  selector: 'app-who-we-are',
  standalone: true,
  imports: [LargeCardIconComponent, InfoCardComponent],
  templateUrl: './who-we-are.component.html',
  styleUrl: './who-we-are.component.scss'
})
export class WhoWeAreComponent {

}
