import { Component, Input } from "@angular/core";
import * as moment from 'moment';

import { Fixture } from "../../core/models/fixture.model";

@Component({
  selector: 'home-fixture-line',
  templateUrl: 'fixture-line.component.html',
  styleUrls: ['fixture-line.component.scss'],
})
export class FixtureLineComponent {

  @Input() fixture: Fixture;

} 