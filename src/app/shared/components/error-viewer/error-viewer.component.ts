import { Component, Input } from '@angular/core';

@Component({
  selector: 'error-viewer',
  templateUrl: './error-viewer.component.html',
  styleUrls: ['./error-viewer.component.scss'],
})
export class ErrorViewerComponent {
  @Input() control: any;
}
