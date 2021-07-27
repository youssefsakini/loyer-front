import { Proprietaire } from '../../../models/Proprietaire';
import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { MainModalService } from 'src/app/services/main-modal/main-modal.service';
import { ProprietaireService } from 'src/app/services/proprietaire-service/proprietaire.service';

@Component({
  selector: 'app-form-proprietaire',
  templateUrl: './form-proprietaire.component.html',
  styleUrls: ['./form-proprietaire.component.scss'],
})
export class FormProprietaireComponent implements OnInit, OnChanges {
  @Input() proprietaire!: any;
  isMand: boolean = false;
  errors!: any;
  Updatesuccess: string = 'Propriétaire modifié avec succés';
  PostSucces: string = 'Propriétaire ajouté avec succés';
  postDone: boolean = false;
  mandataireList: any = [];
  updateDone: boolean = false;
  proprietaireForm!: FormGroup;

  constructor(
    private proprietaireService: ProprietaireService,
    private mainModalService: MainModalService
  ) {}

  ngOnChanges() {
    if (this.proprietaire != '') {
      this.fetchProprietaire();
    }
  }

  ngOnInit(): void {
    this.proprietaireForm = new FormGroup({
      // Champs du propriètaire
      cin: new FormControl('', []),
      passport: new FormControl('', []),
      carte_sejour: new FormControl('', []),
      nom_prenom: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern('[a-zA-Z ]*'),
      ]),
      raison_social: new FormControl('', [Validators.required]),
      n_registre_commerce: new FormControl('', [Validators.pattern('[0-9]*')]),
      telephone: new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9]*'),
      ]),
      fax: new FormControl('', [Validators.pattern('[0-9]*')]),
      adresse: new FormControl('', [Validators.required]),
      n_compte_bancaire: new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9]*'),
      ]),
      banque: new FormControl('', [Validators.required]),
      nom_agence_bancaire: new FormControl('', []),
      has_mandataire: new FormControl('', []),

      // Champs du mandataire
      mandataireForm: new FormArray([]),
    });

    if (this.proprietaire == '') {
      this.proprietaireForm.reset();
    }
  }

  addFormMandateire() {
    const mandataireData = new FormGroup({
      cin_mandataire: new FormControl('', Validators.minLength(4)),
      nom_prenom_mandataire: new FormControl(
        '',
        Validators.pattern('[a-zA-Z]*')
      ),
      raison_social_mandataire: new FormControl(''),
      telephone_mandataire: new FormControl('', Validators.pattern('[0-9]*')),
      fax_mandataire: new FormControl('', Validators.pattern('[0-9]*')),
      adresse_mandataire: new FormControl(''),
      n_compte_bancaire_mandataire: new FormControl(
        '',
        Validators.pattern('[0-9]*')
      ),
    });

    (<FormArray>this.proprietaireForm.get('mandataireForm')).push(
      <FormGroup>mandataireData
    );

    return <FormGroup>mandataireData
  }

  removeFormMandateire(index: number) {
    
    (<FormArray>this.proprietaireForm.get('mandataireForm')).removeAt(index)
  }

  removeAllMandateires() {

      (<FormArray>this.proprietaireForm.get('mandataireForm')).clear()

  }

  fetchProprietaire() {


    this.removeAllMandateires();


    if (this.proprietaire.has_mandataire) {
      this.isMand = true;
      this.mandataireList = this.proprietaire.mandataire[0];
      this.proprietaireForm.patchValue({
        cin: this.proprietaire.cin,
        passport: this.proprietaire.passport,
        carte_sejour: this.proprietaire.carte_sejour,
        nom_prenom: this.proprietaire.nom_prenom,
        raison_social: this.proprietaire.raison_social,
        n_registre_commerce: this.proprietaire.n_registre_commerce,
        telephone: this.proprietaire.telephone,
        fax: this.proprietaire.fax,
        adresse: this.proprietaire.adresse,
        n_compte_bancaire: this.proprietaire.n_compte_bancaire,
        banque: this.proprietaire.banque,
        nom_agence_bancaire: this.proprietaire.nom_agence_bancaire,
        has_mandataire: this.proprietaire.has_mandataire,
        // mandataire inputs
        // cin_mandataire: this.mandataireList.cin_mandataire,
        // nom_prenom_mandataire: this.mandataireList.nom_prenom_mandataire,
        // raison_social_mandataire: this.mandataireList.raison_social_mandataire,
        // telephone_mandataire: this.mandataireList.telephone_mandataire,
        // fax_mandataire: this.mandataireList.fax_mandataire,
        // adresse_mandataire: this.mandataireList.adresse_mandataire,
        // n_compte_bancaire_mandataire:
        //   this.mandataireList.n_compte_bancaire_mandataire,
      });

        // mandataire inputs
        for (let control of (this.proprietaire.mandataire) ){
        

          let formGroup = this.addFormMandateire();
          
          formGroup.controls.cin_mandataire.setValue(control.cin_mandataire);

          formGroup.controls.nom_prenom_mandataire.setValue(control.nom_prenom_mandataire);

          formGroup.controls.raison_social_mandataire.setValue(control.raison_social_mandataire);

          formGroup.controls.telephone_mandataire.setValue(control.telephone_mandataire);

          formGroup.controls.fax_mandataire.setValue(control.fax_mandataire);

          formGroup.controls.adresse_mandataire.setValue(control.adresse_mandataire);

          formGroup.controls.n_compte_bancaire_mandataire.setValue(control.n_compte_bancaire_mandataire);
  

        }

    } else {
      this.isMand = false;
      this.proprietaireForm.patchValue({
        cin: this.proprietaire.cin,
        passport: this.proprietaire.passport,
        carte_sejour: this.proprietaire.carte_sejour,
        nom_prenom: this.proprietaire.nom_prenom,
        raison_social: this.proprietaire.raison_social,
        n_registre_commerce: this.proprietaire.n_registre_commerce,
        telephone: this.proprietaire.telephone,
        fax: this.proprietaire.fax,
        adresse: this.proprietaire.adresse,
        n_compte_bancaire: this.proprietaire.n_compte_bancaire,
        banque: this.proprietaire.banque,
        nom_agence_bancaire: this.proprietaire.nom_agence_bancaire,
        has_mandataire: this.proprietaire.has_mandataire,
        // mandataire inputs
        cin_mandataire: '',
        nom_prenom_mandataire: '',
        raison_social_mandataire: '',
        telephone_mandataire: '',
        fax_mandataire: '',
        adresse_mandataire: '',
        n_compte_bancaire_mandataire: '',
      });

      console.log("not has mondataire");

    }
  }

  // Check if all inputs has invalid errors
  checkInputsValidation(targetInput: any) {
    return targetInput?.invalid && (targetInput.dirty || targetInput.touched);
  }

  // Afficher le message d'erreur de serveur
  showErrorMessage() {
    $('.error-alert').addClass('active');
  }

  // hide le message d'erreur de serveur
  hideErrorMessage() {
    $('.error-alert').removeClass('active');
  }

  addProprietaire() {
    let data: any = {
      // _id: this.proprietaireForm.get('_id').value ,
      cin: this.proprietaireForm.get('cin')?.value,
      passport: this.proprietaireForm.get('passport')?.value,
      carte_sejour: this.proprietaireForm.get('carte_sejour')?.value,
      nom_prenom: this.proprietaireForm.get('nom_prenom')?.value,
      raison_social: this.proprietaireForm.get('raison_social')?.value,
      n_registre_commerce: this.proprietaireForm.get('n_registre_commerce')
        ?.value,
      telephone: this.proprietaireForm.get('telephone')?.value,
      fax: this.proprietaireForm.get('fax')?.value,
      adresse: this.proprietaireForm.get('adresse')?.value,
      n_compte_bancaire: this.proprietaireForm.get('n_compte_bancaire')?.value,
      banque: this.proprietaireForm.get('banque')?.value,
      nom_agence_bancaire: this.proprietaireForm.get('nom_agence_bancaire')
        ?.value,
      has_mandataire: this.proprietaireForm.get('has_mandataire')?.value,
      //Mandataire
      mandataire: this.proprietaireForm.get('mandataireForm')?.value,
     
    };


    let dataWithoutMandataire: any = {
      // _id: this.proprietaireForm.get('_id').value ,
      cin: this.proprietaireForm.get('cin')?.value,
      passport: this.proprietaireForm.get('passport')?.value,
      carte_sejour: this.proprietaireForm.get('carte_sejour')?.value,
      nom_prenom: this.proprietaireForm.get('nom_prenom')?.value,
      raison_social: this.proprietaireForm.get('raison_social')?.value,
      n_registre_commerce: this.proprietaireForm.get('n_registre_commerce')
        ?.value,
      telephone: this.proprietaireForm.get('telephone')?.value,
      fax: this.proprietaireForm.get('fax')?.value,
      adresse: this.proprietaireForm.get('adresse')?.value,
      n_compte_bancaire: this.proprietaireForm.get('n_compte_bancaire')?.value,
      banque: this.proprietaireForm.get('banque')?.value,
      nom_agence_bancaire: this.proprietaireForm.get('nom_agence_bancaire')
        ?.value,
      has_mandataire: this.proprietaireForm.get('has_mandataire')?.value,
      // mandataire: []
      // deleted:false,
    };

    if (this.has_mandataire?.value == true) {
      this.proprietaireService.postProprietaire(data).subscribe(
        (_) => {
          this.postDone = true;
          setTimeout(() => {
            this.proprietaireForm.reset();
            this.postDone = false;
          }, 2000);
        },
        (error) => {
          this.errors = error.error.message;
          setTimeout(() => {
            this.showErrorMessage();
          }, 3000);
          this.hideErrorMessage();
        }
      );
    }

    if (this.has_mandataire?.value == false) {
      this.proprietaireService
        .postProprietaire(dataWithoutMandataire)
        .subscribe(
          (_) => {
            this.postDone = true;
            setTimeout(() => {
              this.proprietaireForm.reset();
              this.postDone = false;
            }, 2000);
            console.log(this.postDone);
          },
          (error) => {
            this.errors = error.error.message;
            setTimeout(() => {
              this.showErrorMessage();
            }, 3000);
            this.hideErrorMessage();
          }
        );
    }
  }


  updateProprietaire() {
    let id = this.proprietaire._id;
    let proprietaireData: Proprietaire = {
      // _id: this.proprietaireForm.get('_id').value ,
      cin: this.proprietaireForm.get('cin')?.value,
      passport: this.proprietaireForm.get('passport')?.value,
      carte_sejour: this.proprietaireForm.get('carte_sejour')?.value,
      nom_prenom: this.proprietaireForm.get('nom_prenom')?.value,
      raison_social: this.proprietaireForm.get('raison_social')?.value,
      n_registre_commerce: this.proprietaireForm.get('n_registre_commerce')
        ?.value,
      telephone: this.proprietaireForm.get('telephone')?.value,
      fax: this.proprietaireForm.get('fax')?.value,
      adresse: this.proprietaireForm.get('adresse')?.value,
      n_compte_bancaire: this.proprietaireForm.get('n_compte_bancaire')?.value,
      banque: this.proprietaireForm.get('banque')?.value,
      nom_agence_bancaire: this.proprietaireForm.get('nom_agence_bancaire')
        ?.value,
      has_mandataire: this.proprietaireForm.get('has_mandataire')?.value,
      // mandataire: [
      //   {
      //     cin_mandataire: this.proprietaireForm.get('cin_mandataire')?.value,
      //     nom_prenom_mandataire: this.proprietaireForm.get('nom_prenom_mandataire')?.value,
      //     raison_social_mandataire: this.proprietaireForm.get('raison_social_mandataire')?.value,
      //     telephone_mandataire: this.proprietaireForm.get('telephone_mandataire')?.value,
      //     fax_mandataire: this.proprietaireForm.get('fax_mandataire')?.value,
      //     adresse_mandataire: this.proprietaireForm.get('adresse_mandataire')?.value,
      //     n_compte_bancaire_mandataire: this.proprietaireForm.get('n_compte_bancaire_mandataire')?.value,
      //   },
      // ],
      mandataire: this.proprietaireForm.get('mandataireForm')?.value,

    };

    this.proprietaireService.updateProprietaire(id, proprietaireData).subscribe(
      (_) => {
        this.updateDone = true;
        setTimeout(() => {
          this.mainModalService.close();
          this.updateDone = false;
          location.reload();
        }, 1000);
      },

      (error) => {
        this.errors = error.error.message;
        setTimeout(() => {
          this.showErrorMessage();
        }, 4000);
        this.hideErrorMessage();
      }
    );
  }

  // Get proprietaire form controlers
  get cin() {
    return this.proprietaireForm.get('cin');
  }
  get passport() {
    return this.proprietaireForm.get('passport');
  }
  get carte_sejour() {
    return this.proprietaireForm.get('carte_sejour');
  }
  get nom_prenom() {
    return this.proprietaireForm.get('nom_prenom');
  }
  get raison_social() {
    return this.proprietaireForm.get('raison_social');
  }
  get n_registre_commerce() {
    return this.proprietaireForm.get('n_registre_commerce');
  }
  get telephone() {
    return this.proprietaireForm.get('telephone');
  }
  get fax() {
    return this.proprietaireForm.get('fax');
  }
  get adresse() {
    return this.proprietaireForm.get('adresse');
  }
  get n_compte_bancaire() {
    return this.proprietaireForm.get('n_compte_bancaire');
  }
  get banque() {
    return this.proprietaireForm.get('banque');
  }
  get nom_agence_bancaire() {
    return this.proprietaireForm.get('nom_agence_bancaire');
  }
  get has_mandataire() {
    return this.proprietaireForm.get('has_mandataire');
  }

  // Mandataire
  get mandataireForm(): FormArray {
    return (<FormArray>this.proprietaireForm.get('mandataireForm'));
  }

  // get cin_mandataire() {
  //   return this.proprietaireForm.get('cin_mandataire');
  // }
  // get nom_prenom_mandataire() {
  //   return this.proprietaireForm.get('nom_prenom_mandataire');
  // }
  // get raison_social_mandataire() {
  //   return this.proprietaireForm.get('raison_social_mandataire');
  // }
  // get telephone_mandataire() {
  //   return this.proprietaireForm.get('telephone_mandataire');
  // }
  // get fax_mandataire() {
  //   return this.proprietaireForm.get('fax_mandataire');
  // }
  // get adresse_mandataire() {
  //   return this.proprietaireForm.get('adresse_mandataire');
  // }
  // get n_compte_bancaire_mandataire() {
  //   return this.proprietaireForm.get('n_compte_bancaire_mandataire');
  // }
}
