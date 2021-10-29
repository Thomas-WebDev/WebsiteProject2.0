import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['../../../assets/css/custom/style.css']
})
export class PostComponent implements OnInit {

  typesArr : String[] = ["Character", "Event", "Group", "Location", "Species/Race", "Vehicle"]

  characterArr: String[] = ["Alternate names", "Gender", "Race/Species", "Birth Location", "Birth", "Death", "Affiliations"];
  eventArr: String[] = ["Alternate names", "", "", "Location", "Start", "End", "Groups/People Involved"];
  groupsArr: String[] = ["Alternate names", "Government/Structure", "Leader Name/Title", "Region", "Founding", "Destruction/Dissolution", "Affiliations"];
  locationArr: String[] = ["Alternate names", "Location Type", "", "Region", "", "", "Affiliations"];
  speciesArr: String[] = ["Alternate names", "", "Race or Species", "Home/Orgin", "", "", "Affiliations"];
  vehicleArr: String[] = ["Alternate names", "Vehicle Type", "Class", "Type", "Created", "Destroyed", "Affiliations"];

  labelsArr: String[][] = [this.characterArr, this.eventArr, this.groupsArr, this.locationArr, this.speciesArr, this.vehicleArr];

  editorStyle: {
    backgroundColor: "WHITE"
  }

  type: String = "Character";
  
  constructor(private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router
    ) { 
  }

  ngOnInit() {
    
  }

  getLabel(labelIndex: number): String{
    if (this.type === "Character") {
      return this.labelsArr[0][labelIndex];
    }
    if (this.type === "Event") {
      return this.labelsArr[1][labelIndex];
    }
    if (this.type === "Group") {
      return this.labelsArr[2][labelIndex];
    }
    if (this.type === "Location") {
      return this.labelsArr[3][labelIndex];
    }
    if (this.type === "Species/Race") {
      return this.labelsArr[4][labelIndex];
    }
    if (this.type === "Vehicle") {
      return this.labelsArr[5][labelIndex];
    }
    return "DEFAULT LABEL";
  }
}
