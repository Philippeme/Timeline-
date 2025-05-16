import { Component, OnInit } from '@angular/core';
import { TimelinezService } from './timelinez.service';
import { ProcessService } from '../services/process.service';

@Component({
  selector: 'app-timelinez',
  templateUrl: './timelinez.component.html',
  styleUrls: ['./timelinez.component.scss']
})
export class TimelinezComponent implements OnInit {

  birthDetail: any;

  constructor(
    private timelineService: TimelinezService) {

  }

  ngOnInit(): void {
    const id: number = 12;
    this.timelineService.getDetailBirthById(id).subscribe(
      (data: any) => {
        console.log('ma naissance', data);
        this.birthDetail = data;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }


  // Formater le NINA pour l'affichage visuel
  formatNina(nina: string): string[] {
      return nina.split('');
  }

  getConnectionLineClass(steps:any, index: number): string {
    if (index >= steps.length - 1) {
        return '';
    }
    const currentStep = steps[index];
    // Retourne la classe de couleur basée sur le statut de l'étape actuelle
    if (currentStep.statut === 'COMPLETED') {
        return 'green-line';
    } else if (currentStep.statut === 'IN_PROGRESS') {
        return 'orange-line';
    } else if (currentStep.statut === 'CANCELLED') {
        return 'red-line';
    } else {
        return 'gray-line';
    }
  }
  
  // Obtenir les classes CSS pour le nœud d'étape
  getStepNodeClassMap(step: any): { [key: string]: boolean } {
    const classMap: { [key: string]: boolean } = {};

    // Ajouter les classes basées sur le statut
    switch (step.statut) {
        case 'COMPLETED':
            classMap['green'] = true;
            break;
        case 'IN_PROGRESS':
            classMap['orange'] = true;
            break;
        case 'CANCELLED':
            classMap['red'] = true;
            break;
        default:
            classMap['gray'] = true;
            break;
    }

    // En mode statique, aucune étape n'est cliquable
    classMap['clickable'] = false;

    return classMap;
  }


  
  
  // recuperer les infos a parametrer a l acte en fction de son statut
  getInfoActeByStatus(status: any){ 
    let obj: any = {};
    if (status === 'COMPLETED') {
      obj = {
        "id": "COMPLETED",
        "code": "FAIT",
        "label": "Fait",
        "shortLabel": "Fait",
        "color": "#4caf50",
        "borderColor": "#388e3c",
        "lineColor": "#4caf50",
        "icon": "check",
        "iconColor": "#ffffff",
        "description": "L'étape a été complétée avec succès"
      };
    } else if (status === 'IN_PROGRESS') {
      obj = {
        "id": "IN_PROGRESS",
        "code": "EN_COURS",
        "label": "En cours",
        "shortLabel": "En cours",
        "color": "#ff9800",
        "borderColor": "#f57c00",
        "lineColor": "#ff9800",
        "icon": "more_horiz",
        "iconColor": "#ffffff",
        "description": "L'étape est actuellement en cours d'exécution"
      };
    } else if (status === 'NOT_STARTED') {
      obj = {
        "id": "NOT_STARTED",
        "code": "PAS_COMMENCE",
        "label": "Pas commencé",
        "shortLabel": "Pas commencé",
        "color": "#bdbdbd",
        "borderColor": "#9e9e9e",
        "lineColor": "#bdbdbd",
        "icon": undefined,
        "iconColor": "#ffffff",
        "description": "L'étape n'a pas encore été initiée"
      };
    } else if (status === 'CANCELLED') {
      obj = {
        "id": "CANCELLED",
        "code": "ANNULE",
        "label": "Annulé",
        "shortLabel": "Annulé",
        "color": "#f44336",
        "borderColor": "#d32f2f",
        "lineColor": "#f44336",
        "icon": "close",
        "iconColor": "#ffffff",
        "description": "L'étape a été annulée"
      };
    }

    return obj;
  }

  // recuperer les infos du type dacte
  getInfoTypeOfCertificateByStatus(status: any){ 
    let obj: any = {};
    if (status === 'BIRTH') {
      obj = {
        "id": "BIRTH",
        "name": "Acte de Naissance",
        "displayName": "Actes de Naissance",
        "code": "ACTE_NAISSANCE",
        "prefix": "N",
        "icon": "child_care",
        "color": "#2196f3",
        "backgroundColor": "linear-gradient(135deg, #e3f2fd, #bbdefb)",
        "borderColor": "#2196f3",
        "borderLeftColor": "4px solid #2196f3"
      };
    } else if (status === 'MARRIAGE') {
      obj = {
        "id": "MARRIAGE",
        "name": "Acte de Mariage",
        "displayName": "Actes de Mariage",
        "code": "ACTE_MARIAGE",
        "prefix": "M",
        "icon": "favorite",
        "color": "#e91e63",
        "backgroundColor": "linear-gradient(135deg, #f8bbd0, #f48fb1)",
        "borderColor": "#e91e63",
        "borderLeftColor": "4px solid #e91e63"
      };
    } else if (status === 'DEATH') {
      obj = {
        "id": "DEATH",
        "name": "Acte de Décès",
        "displayName": "Actes de Décès",
        "code": "ACTE_DECES",
        "prefix": "D",
        "icon": "contact_emergency",
        "color": "#757575",
        "backgroundColor": "linear-gradient(135deg, #e1e1e1, #bdbdbd)",
        "borderColor": "#757575",
        "borderLeftColor": "4px solid #757575"
      };
    }
     
    return obj;
  }


}
