export interface Foncier {
  _id?: any;
  type_lieu: string;
  adresse: string;
  lieu: [
    {
      lieu?: any
      // transferer?: boolean,
      etat_lieu: string;
      deleted?: boolean;
    }
  ];
  ville: string;
  desc_lieu_entrer?: string;
  imgs_lieu_entrer?: [
    {
      _id?: string;
      image?: string;
    }
  ];
  contrat?: any;
  has_amenagements?: boolean;
  superficie?: string;
  etage?: string;
  amenagement: [
    {
      _id?: string;
      idm?: string;
      nature_amenagement: [];
      montant_amenagement: string;
      valeur_nature_chargeProprietaire: string;
      valeur_nature_chargeFondation: string;
      numero_facture: string;
      numero_bon_commande: string;
      date_passation_commande: Date;
      evaluation_fournisseur: string;
      date_fin_travaux: Date;
      date_livraison_local: Date;
      deleted?: boolean;
      images_apres_travaux: [];
      croquis_travaux: [];
      fournisseur?: [
        {
          nom: string;
          prenom: string;
          amenagement_effectue: string;
          deleted?: boolean;
        }
      ];
    }
  ];
}
