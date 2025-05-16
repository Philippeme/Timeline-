import { Injectable } from '@angular/core';
import { Process, ProcessType, ProcessStep, StepStatus, ProcessTypeConfig, StepStatusConfig, StepDefinition, TimelineScenario } from '../models';

@Injectable({
    providedIn: 'root'
})
export class ApiConfigService {
    constructor() { }

    // === CONFIGURATION DES TYPES DE PROCESSUS ===

    /**
     * Récupère la configuration d'un type de processus spécifique
     */
    getProcessTypeConfig(type: ProcessType): ProcessTypeConfig {
        const processTypesConfig: { [key: string]: ProcessTypeConfig } = {
            "BIRTH": {
                "id": "BIRTH",
                "name": "Acte de Naissance",
                "displayName": "Actes de Naissance",
                "code": "ACTE_NAISSANCE",
                "prefix": "N",
                "icon": "child_care",
                "color": "#2196f3",
                "backgroundColor": "linear-gradient(135deg, #e3f2fd, #bbdefb)",
                "borderColor": "#2196f3"
            },
            "MARRIAGE": {
                "id": "MARRIAGE",
                "name": "Acte de Mariage",
                "displayName": "Actes de Mariage",
                "code": "ACTE_MARIAGE",
                "prefix": "M",
                "icon": "favorite",
                "color": "#e91e63",
                "backgroundColor": "linear-gradient(135deg, #f8bbd0, #f48fb1)",
                "borderColor": "#e91e63"
            },
            "DEATH": {
                "id": "DEATH",
                "name": "Acte de Décès",
                "displayName": "Actes de Décès",
                "code": "ACTE_DECES",
                "prefix": "D",
                "icon": "contact_emergency",
                "color": "#757575",
                "backgroundColor": "linear-gradient(135deg, #e1e1e1, #bdbdbd)",
                "borderColor": "#757575"
            }
        };

        return processTypesConfig[type];
    }

    /**
     * Récupère la configuration de tous les types de processus
     */
    getAllProcessTypes(): ProcessTypeConfig[] {
        return [
            this.getProcessTypeConfig(ProcessType.BIRTH),
            this.getProcessTypeConfig(ProcessType.MARRIAGE),
            this.getProcessTypeConfig(ProcessType.DEATH)
        ];
    }

    // === CONFIGURATION DES STATUTS D'ÉTAPES ===

    /**
     * Récupère la configuration d'un statut d'étape spécifique
     */
    getStepStatusConfig(status: StepStatus): StepStatusConfig {
        const stepStatusesConfig: { [key: string]: StepStatusConfig } = {
            "NOT_STARTED": {
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
            },
            "IN_PROGRESS": {
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
            },
            "COMPLETED": {
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
            },
            "CANCELLED": {
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
            }
        };

        return stepStatusesConfig[status];
    }

    /**
     * Récupère la configuration de tous les statuts d'étapes
     */
    getAllStepStatuses(): StepStatusConfig[] {
        return [
            this.getStepStatusConfig(StepStatus.NOT_STARTED),
            this.getStepStatusConfig(StepStatus.IN_PROGRESS),
            this.getStepStatusConfig(StepStatus.COMPLETED),
            this.getStepStatusConfig(StepStatus.CANCELLED)
        ];
    }

    // === DÉFINITIONS DES ÉTAPES PAR TYPE DE PROCESSUS ===

    /**
     * Récupère les définitions d'étapes pour le processus de naissance
     */
    private getBirthStepDefinitions(): StepDefinition[] {
        return [
            {
                "id": "enregistrement",
                "code": "ENREGISTREMENT_NAISSANCE",
                "order": 1,
                "label": "Enregistrement de naissance",
                "shortLabel": "Enregistrement",
                "icon": "app_registration",
                "description": "Enregistrement initial de la naissance dans le système",
                "isRequired": true,
                "canSkip": false,
                "estimatedDuration": "1-2 jours"
            },
            {
                "id": "declaration",
                "code": "DECLARATION_NAISSANCE",
                "order": 2,
                "label": "Déclaration de naissance",
                "shortLabel": "Déclaration",
                "icon": "description",
                "description": "Déclaration officielle de la naissance",
                "isRequired": true,
                "canSkip": false,
                "estimatedDuration": "2-3 jours"
            },
            {
                "id": "etablissement",
                "code": "ETABLISSEMENT_ACTE_NAISSANCE",
                "order": 3,
                "label": "Établissement de l'acte",
                "shortLabel": "Établissement",
                "icon": "gavel",
                "description": "Établissement officiel de l'acte de naissance",
                "isRequired": true,
                "canSkip": false,
                "estimatedDuration": "3-5 jours"
            },
            {
                "id": "remise",
                "code": "REMISE_ACTE_NAISSANCE",
                "order": 4,
                "label": "Remise de l'acte",
                "shortLabel": "Remise",
                "icon": "assignment_turned_in",
                "description": "Remise de l'acte de naissance aux intéressés",
                "isRequired": true,
                "canSkip": false,
                "estimatedDuration": "1 jour"
            }
        ];
    }

    /**
     * Récupère les définitions d'étapes pour le processus de mariage
     */
    private getMarriageStepDefinitions(): StepDefinition[] {
        return [
            {
                "id": "declaration",
                "code": "DECLARATION_MARIAGE",
                "order": 1,
                "label": "Déclaration de mariage",
                "shortLabel": "Déclaration",
                "icon": "favorite",
                "description": "Déclaration d'intention de mariage",
                "isRequired": true,
                "canSkip": false,
                "estimatedDuration": "1 jour"
            },
            {
                "id": "publication",
                "code": "PUBLICATION_MARIAGE",
                "order": 2,
                "label": "Publication de mariage",
                "shortLabel": "Publication",
                "icon": "campaign",
                "description": "Publication des bans de mariage",
                "isRequired": true,
                "canSkip": false,
                "estimatedDuration": "10 jours"
            },
            {
                "id": "enquetes",
                "code": "ENQUETES_PRENUPTIALES",
                "order": 3,
                "label": "Enquêtes prénuptiales",
                "shortLabel": "Enquêtes",
                "icon": "find_in_page",
                "description": "Enquêtes et vérifications prénuptiales",
                "isRequired": true,
                "canSkip": false,
                "estimatedDuration": "5-7 jours"
            },
            {
                "id": "celebration_remise",
                "code": "CELEBRATION_REMISE_ACTE_MARIAGE",
                "order": 4,
                "label": "Célébration et Remise de l'acte",
                "shortLabel": "Célébration",
                "icon": "celebration",
                "description": "Célébration du mariage et remise de l'acte",
                "isRequired": true,
                "canSkip": false,
                "estimatedDuration": "1 jour"
            }
        ];
    }

    /**
     * Récupère les définitions d'étapes pour le processus de décès
     */
    private getDeathStepDefinitions(): StepDefinition[] {
        return [
            {
                "id": "certificat",
                "code": "CERTIFICAT_DECES",
                "order": 1,
                "label": "Certificat de décès",
                "shortLabel": "Certificat",
                "icon": "medical_services",
                "description": "Établissement du certificat médical de décès",
                "isRequired": true,
                "canSkip": false,
                "estimatedDuration": "1 jour"
            },
            {
                "id": "declaration",
                "code": "DECLARATION_DECES",
                "order": 2,
                "label": "Déclaration de décès",
                "shortLabel": "Déclaration",
                "icon": "description",
                "description": "Déclaration officielle du décès",
                "isRequired": true,
                "canSkip": false,
                "estimatedDuration": "1-2 jours"
            },
            {
                "id": "etablissement",
                "code": "ETABLISSEMENT_ACTE_DECES",
                "order": 3,
                "label": "Établissement de l'acte",
                "shortLabel": "Établissement",
                "icon": "gavel",
                "description": "Établissement officiel de l'acte de décès",
                "isRequired": true,
                "canSkip": false,
                "estimatedDuration": "2-3 jours"
            },
            {
                "id": "remise",
                "code": "REMISE_ACTE_DECES",
                "order": 4,
                "label": "Remise de l'acte",
                "shortLabel": "Remise",
                "icon": "assignment_turned_in",
                "description": "Remise de l'acte de décès aux intéressés",
                "isRequired": true,
                "canSkip": false,
                "estimatedDuration": "1 jour"
            }
        ];
    }

    /**
     * Récupère les définitions d'étapes pour un type de processus donné
     */
    getStepDefinitions(type: ProcessType): StepDefinition[] {
        switch (type) {
            case ProcessType.BIRTH:
                return this.getBirthStepDefinitions();
            case ProcessType.MARRIAGE:
                return this.getMarriageStepDefinitions();
            case ProcessType.DEATH:
                return this.getDeathStepDefinitions();
            default:
                return [];
        }
    }

    // === SCÉNARIOS PAR TYPE DE PROCESSUS ===

    /**
     * Récupère le scénario pour le processus de naissance
     */
    private getBirthScenario(): TimelineScenario {
        return {
            "declarationNumber": "N-2025-0001",
            "nina": "123456789012345",
            "steps": [
                {
                    "stepId": "enregistrement",
                    "status": StepStatus.COMPLETED,
                    "completionDate": new Date("2025-04-15T10:30:00Z")
                },
                {
                    "stepId": "declaration",
                    "status": StepStatus.COMPLETED,
                    "completionDate": new Date("2025-04-18T14:20:00Z")
                },
                {
                    "stepId": "etablissement",
                    "status": StepStatus.IN_PROGRESS,
                    "completionDate": undefined
                },
                {
                    "stepId": "remise",
                    "status": StepStatus.NOT_STARTED,
                    "completionDate": undefined
                }
            ]
        };
    }

    /**
     * Récupère le scénario pour le processus de mariage
     */
    private getMarriageScenario(): TimelineScenario {
        return {
            "declarationNumber": "M-2025-0001",
            "nina": "987654321098765",
            "steps": [
                {
                    "stepId": "declaration",
                    "status": StepStatus.COMPLETED,
                    "completionDate": new Date("2025-04-10T11:00:00Z")
                },
                {
                    "stepId": "publication",
                    "status": StepStatus.COMPLETED,
                    "completionDate": new Date("2025-04-17T16:30:00Z")
                },
                {
                    "stepId": "enquetes",
                    "status": StepStatus.CANCELLED,
                    "completionDate": undefined
                },
                {
                    "stepId": "celebration_remise",
                    "status": StepStatus.CANCELLED,
                    "completionDate": undefined
                }
            ]
        };
    }

    /**
     * Récupère le scénario pour le processus de décès
     */
    private getDeathScenario(): TimelineScenario {
        return {
            "declarationNumber": "D-2025-0001",
            "nina": "456789012345678",
            "steps": [
                {
                    "stepId": "certificat",
                    "status": StepStatus.COMPLETED,
                    "completionDate": new Date("2025-04-12T13:45:00Z")
                },
                {
                    "stepId": "declaration",
                    "status": StepStatus.COMPLETED,
                    "completionDate": new Date("2025-04-14T10:15:00Z")
                },
                {
                    "stepId": "etablissement",
                    "status": StepStatus.COMPLETED,
                    "completionDate": new Date("2025-04-20T15:00:00Z")
                },
                {
                    "stepId": "remise",
                    "status": StepStatus.IN_PROGRESS,
                    "completionDate": undefined
                }
            ]
        };
    }

    /**
     * Récupère le scénario par défaut pour un type de processus donné
     */
    getScenario(type: ProcessType): TimelineScenario {
        switch (type) {
            case ProcessType.BIRTH:
                return this.getBirthScenario();
            case ProcessType.MARRIAGE:
                return this.getMarriageScenario();
            case ProcessType.DEATH:
                return this.getDeathScenario();
            default:
                return {
                    declarationNumber: "",
                    nina: "",
                    steps: []
                };
        }
    }

    // === CONFIGURATION DE LA TIMELINE ===

    /**
     * Récupère la configuration visuelle de la timeline
     */
    getTimelineConfiguration(): any {
        return {
            visual: {
                nodeSize: 36,
                compactNodeSize: 28,
                lineHeight: 4,
                iconSize: 18
            },
            animation: {
                duration: 300,
                easing: "ease-in-out"
            },
            interactions: {
                clickable: false,
                draggable: false,
                selectable: false
            }
        };
    }

    // === MÉTHODES DE COMPATIBILITÉ ===

    /**
     * Retourne l'URL de base de l'API (pour compatibilité future)
     */
    getApiBaseUrl(): string {
        return "https://api.crvs-mali.gov.ml";
    }

    /**
     * Vérifie si l'application est en mode statique
     */
    isStaticMode(): boolean {
        return true; // Actuellement en mode statique
    }

    /**
     * Vérifie si les interactions sont activées
     */
    areInteractionsEnabled(): boolean {
        return false; // Pas d'interactions en mode statique
    }
}