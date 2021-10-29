import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Image }  from '../../../models/image';
import { LinkedPost }  from '../../../models/linkedPost';

@Component({
  selector: 'app-post-create-edit',
  templateUrl: './post-create-edit.component.html',
  styleUrls: ['../../../../assets/css/custom/style.css']
})
export class PostCreateEditComponent implements OnInit {

  file: File = null; // Variable to store file
  imgFile: String = 'https://tacm.com/wp-content/uploads/2018/01/no-image-available.jpeg';


  htmlOutput: String = "";
  quillStyle = {
    height: "80%",
    width: "100%",
    backgroundColor: "WHITE"
  }
  quillConfig = {
    
  }

  type: String = "Article";

  articleArr: String[] = ["Alternate names", "", "", "", "", "", "Affiliations"];
  characterArr: String[] = ["Alternate names", "Gender", "Race/Species", "Birth Location", "Birth", "Death", "Affiliations"];
  eventArr: String[] = ["Alternate names", "", "", "Location", "Start", "End", "Groups/People Involved"];
  groupsArr: String[] = ["Alternate names", "Government Structure/Organization Type", "Leader Name/Title", "Region", "Founding", "Destruction/Dissolution", "Affiliations"];
  locationArr: String[] = ["Alternate names", "Location Type", "", "Region", "", "", "Affiliations"];
  speciesArr: String[] = ["Alternate names", "", "", "Home/Orgin", "", "", "Affiliations"];
  vehicleArr: String[] = ["Alternate names", "Type", "Class", "", "Created", "Destroyed", "Affiliations"];

  genderArr: String[] = ["Male", "Female", "Masculine", "Feminine", "Other"];
  generalCatagoryDrop: String[];
  subCatagoryDrop: String[];


  locationsDrop: LinkedPost[] = [];
  imageDrop: Image[];

  labelsArr: String[] = this.articleArr;

  postForm: FormGroup;

  editorStyle: {
    backgroundColor: "WHITE"
  }

  edit: Boolean = false;
  
  constructor(private activatedRoute: ActivatedRoute,
    private fb: FormBuilder, 
    private authService: AuthService,
    private router: Router
    ) { 
    this.activatedRoute.queryParams.subscribe(params => {
      this.edit = params['new'];
      console.log(this.edit); // Print the parameter to the console. 
    });
  }

  ngOnInit() {
    this.createForm();
  }

  postFormCreate(): void {
    var testForm = this.fb.group({
      description: new FormControl("", Validators.maxLength(160)),
      body: new FormControl("", []),
      sidebar_image: new FormControl("", []),
      sidebar_data: this.fb.group({})
    });
  }
  
  createForm(): void {
    this.postForm = this.fb.group({
      fandomId: new FormControl("", []),
      type: new FormControl("Article", []),
      title: new FormControl("", Validators.maxLength(60)),
      content: new FormControl("", []),
      description: new FormControl("", Validators.maxLength(160)),
      thumbnail: new FormControl("", []),
      altNames: this.fb.array([]),
      generalCatagory: new FormControl("", []),
      subCatagory:new FormControl("", []),
      location: new FormGroup({
        id: new FormControl(-1, []),
        name: new FormControl("", []),
      }),
      start: new FormGroup({
        displayStart: new FormControl("", []),
        dayStart: new FormControl("", []),
        monthStart: new FormControl("", []),
        yearStart: new FormControl("", []),
      }),
      end: new FormGroup({
        displayEnd: new FormControl("", []),
        dayEnd: new FormControl("", []),
        monthEnd: new FormControl("", []),
        yearEnd: new FormControl("", []),
      }),
      affiliations: this.fb.array([]),
      contributor: new FormControl("", [])
    })
  }

  submit(): void {
    console.log(this.postForm.value);
  }

  onFileChange(event): void {
    const reader = new FileReader();
    if(event.target.files && event.target.files.length) {
      this.file = event.target.files[0];
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imgFile = reader.result as string;
      };
    }
  }

  onImageChange(index: number): void {
    this.file = null;
    this.imgFile = this.imageDrop[index].media
  }

  onTypeChange(): void {
    this.type = this.postForm.get("type").value;
    this.getLabel();
    if (this.type === "Article") {
      this.postForm.get("generalCatagory").reset();
      this.postForm.get("subCatagory").reset();
      this.postForm.get("location").reset();
      this.postForm.get("start").reset();
      this.postForm.get("end").reset();
      return;
    }
    if (this.type === "Character") {
      return;
    }
    if (this.type === "Event") {
      this.postForm.get("generalCatagory").reset();
      this.postForm.get("subCatagory").reset();
      return;
    }
    if (this.type === "Group") {
      return;
    }
    if (this.type === "Location") {
      this.postForm.get("subCatagory").reset();
      return;
    }
    if (this.type === "Species/Race") {
      this.postForm.get("generalCatagory").reset();
      this.postForm.get("subCatagory").reset();
      this.postForm.get("start").reset();
      this.postForm.get("end").reset();
      return;
    }
    if (this.type === "Vehicle") {
      this.postForm.get("location").reset();
      return;
    }
    return;
  }

  onLocationChange(index: number): void {
    this.postForm.get('location').get('id').patchValue(this.locationsDrop[index].id);
    this.postForm.get('location').get('name').patchValue(this.locationsDrop[index].title);   
  }

  createItem(value: string, index: number): FormGroup {
    return this.fb.group({
      id: new FormControl(index, []),
      name: new FormControl(value, []),
    });
  }

  getArray(arrayName: string): FormArray {
    return this.postForm.get(arrayName) as FormArray;
  }

  addItem(arrayName: string, value: string, index: number): void {
    console.log(value);
    this.getArray(arrayName).push(this.createItem(value, index));
  }

  removeItem(arrayName: string, index: number): void {
    this.getArray(arrayName).removeAt(index);
  }
 
  getLabel(): void {
    if (this.type === "Article") {
      this.labelsArr = this.articleArr;
      return;
    }
    if (this.type === "Character") {
      this.labelsArr = this.characterArr;
      return;
    }
    if (this.type === "Event") {
      this.labelsArr = this.eventArr;
      return;
    }
    if (this.type === "Group") {
      this.labelsArr = this.groupsArr;
      return;
    }
    if (this.type === "Location") {
      this.labelsArr = this.locationArr;
      return;
    }
    if (this.type === "Species/Race") {
      this.labelsArr = this.speciesArr;
      return;
    }
    if (this.type === "Vehicle") {
      this.labelsArr = this.vehicleArr;
      return;
    }
    return;
  }

  changeToBC(value: string): void {
    if(value = "start") {
      this.postForm.get("start").get("yearStart").patchValue(
        this.postForm.get("start").get("yearStart").value * -1
      );
    }
    if(value = "end") {
      this.postForm.get("end").get("yearEnd").patchValue(
        this.postForm.get("end").get("yearEnd").value * -1
      );
    }
  }

  setDropDownOptions(): void {
    
  }

  addInternalLinks(): void {
    console.log("addInternalLinks");
    var searchVar: String = 'test';
    var searchVarId: number = 1;
    this.htmlOutput = this.postForm.get('content').value;
    var temp = this.htmlOutput.replace(
      new RegExp(searchVar + '(?!<\/a>)'), "<a href='http://localhost:4200/post/'" + searchVarId + ">" + searchVar + "</a>"
    );
    this.postForm.get('content').patchValue(temp);
  }

  undoInternalLinks(): void {
    console.log("undoInternalLinks");
    if (this.htmlOutput != "") {
      this.postForm.get('content').patchValue(this.htmlOutput);
      this.htmlOutput = "";
    }
  }

}
