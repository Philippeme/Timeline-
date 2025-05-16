import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Process, ProcessStep, ProcessType, StepStatus, ApiResponse } from '../models';
import { ApiConfigService } from './api-config.service';

@Injectable({
    providedIn: 'root'
})
export class ProcessService {
    private currentProcessSubject = new BehaviorSubject<Process | null>(null);
    private currentProcessType: ProcessType = ProcessType.BIRTH;

    constructor(
        private http: HttpClient,
        private apiConfig: ApiConfigService
    ) {
        // Charge le processus initial au démarrage
        this.loadCurrentProcess(ProcessType.BIRTH);
    }

    // === MÉTHODES PUBLIQUES ===

    /**
     * Récupère le processus actuel en cours d'observation
     */
    getCurrentProcess(): Observable<Process | null> {
        return this.currentProcessSubject.asObservable();
    }

    /**
     * Charge le processus actuel pour un type donné
     * En mode statique, utilise les scénarios définis dans la configuration
     */
    loadCurrentProcess(type: ProcessType): void {
        this.currentProcessType = type;

        // Mode statique uniquement : utilise les scénarios de configuration
        const scenario = this.apiConfig.getScenario(type);
        const stepDefinitions = this.apiConfig.getStepDefinitions(type);

        const process = this.buildProcessFromScenario(type, scenario, stepDefinitions);
        this.currentProcessSubject.next(process);
    }

    /**
     * Récupère la configuration d'un type de processus
     */
    getProcessTypeConfig(type: ProcessType) {
        return this.apiConfig.getProcessTypeConfig(type);
    }

    /**
     * Récupère la configuration d'un statut d'étape
     */
    getStepStatusConfig(status: StepStatus) {
        return this.apiConfig.getStepStatusConfig(status);
    }

    /**
     * Vérifie si les interactions sont activées
     */
    areInteractionsEnabled(): boolean {
        return this.apiConfig.areInteractionsEnabled();
    }

    /**
     * Récupère le type de processus actuellement sélectionné
     */
    getCurrentProcessType(): ProcessType {
        return this.currentProcessType;
    }

    /**
     * Change le type de processus et charge le processus correspondant
     */
    switchProcessType(type: ProcessType): void {
        if (this.currentProcessType !== type) {
            this.loadCurrentProcess(type);
        }
    }

    /**
     * Récupère tous les types de processus disponibles
     */
    getAvailableProcessTypes(): any[] {
        return this.apiConfig.getAllProcessTypes();
    }

    /**
     * Récupère la configuration de la timeline
     */
    getTimelineConfiguration(): any {
        return this.apiConfig.getTimelineConfiguration();
    }

    /**
     * Vérifie si l'application est en mode statique
     */
    isStaticMode(): boolean {
        return this.apiConfig.isStaticMode();
    }

    // === MÉTHODES PRIVÉES ===

    /**
     * Construit un processus à partir d'un scénario de configuration
     */
    private buildProcessFromScenario(type: ProcessType, scenario: any, stepDefinitions: any[]): Process {
        const steps: ProcessStep[] = stepDefinitions.map((definition, index) => {
            const scenarioStep = scenario.steps.find((s: any) => s.stepId === definition.id);

            return {
                id: `${definition.id}-${Date.now()}`,
                stepId: definition.id,
                order: definition.order,
                label: definition.label,
                shortLabel: definition.shortLabel,
                icon: definition.icon,
                status: scenarioStep?.status || StepStatus.NOT_STARTED,
                completionDate: scenarioStep?.completionDate || undefined,
                description: definition.description
            };
        });

        return {
            id: `${type.toLowerCase()}-${Date.now()}`,
            type,
            declarationNumber: scenario.declarationNumber,
            nina: scenario.nina,
            steps,
            createdAt: new Date(),
            updatedAt: new Date()
        };
    }

    // === MÉTHODES UTILITAIRES INTÉGRÉES ===

    /**
     * Génère un numéro de déclaration dynamique
     */
    private generateDeclarationNumber(type: ProcessType): string {
        const config = this.getProcessTypeConfig(type);
        const year = new Date().getFullYear();
        const sequence = Math.floor(Math.random() * 9999) + 1;
        return `${config.prefix}-${year}-${sequence.toString().padStart(4, '0')}`;
    }

    /**
     * Génère un NINA dynamique
     */
    private generateDynamicNina(): string {
        return Array.from({ length: 15 }, () => Math.floor(Math.random() * 10)).join('');
    }

    /**
     * Valide un numéro de déclaration
     */
    private validateDeclarationNumber(declarationNumber: string, type: ProcessType): boolean {
        const config = this.getProcessTypeConfig(type);
        const pattern = new RegExp(`^${config.prefix}-\\d{4}-\\d{4}$`);
        return pattern.test(declarationNumber);
    }

    /**
     * Valide un NINA
     */
    private validateNina(nina: string): boolean {
        const pattern = /^[0-9]{15}$/;
        return pattern.test(nina);
    }

    /**
     * Génère un nouveau processus avec des données dynamiques
     */
    generateDynamicProcess(type: ProcessType): Process {
        const stepDefinitions = this.apiConfig.getStepDefinitions(type);
        const declarationNumber = this.generateDeclarationNumber(type);
        const nina = this.generateDynamicNina();

        // Créer des étapes avec des statuts aléatoires pour démonstration
        const steps: ProcessStep[] = stepDefinitions.map((definition, index) => {
            let status = StepStatus.NOT_STARTED;
            let completionDate: Date | undefined = undefined;

            // Logique simple pour définir des statuts réalistes
            if (index === 0) {
                status = StepStatus.COMPLETED;
                completionDate = new Date(Date.now() - (7 - index) * 24 * 60 * 60 * 1000);
            } else if (index === 1) {
                status = Math.random() > 0.5 ? StepStatus.COMPLETED : StepStatus.IN_PROGRESS;
                if (status === StepStatus.COMPLETED) {
                    completionDate = new Date(Date.now() - (5 - index) * 24 * 60 * 60 * 1000);
                }
            } else if (index === 2) {
                status = StepStatus.IN_PROGRESS;
            }
            // Les autres étapes restent NOT_STARTED

            return {
                id: `${definition.id}-${Date.now()}-${index}`,
                stepId: definition.id,
                order: definition.order,
                label: definition.label,
                shortLabel: definition.shortLabel,
                icon: definition.icon,
                status,
                completionDate,
                description: definition.description
            };
        });

        return {
            id: `${type.toLowerCase()}-${Date.now()}`,
            type,
            declarationNumber,
            nina,
            steps,
            createdAt: new Date(),
            updatedAt: new Date()
        };
    }

    /**
     * Valide les données d'un processus
     */
    validateProcess(process: Process): { isValid: boolean; errors: string[] } {
        const errors: string[] = [];

        // Validation du numéro de déclaration
        if (!this.validateDeclarationNumber(process.declarationNumber, process.type)) {
            errors.push(`Numéro de déclaration invalide: ${process.declarationNumber}`);
        }

        // Validation du NINA
        if (!this.validateNina(process.nina)) {
            errors.push(`NINA invalide: ${process.nina}`);
        }

        // Validation des étapes
        if (!process.steps || process.steps.length === 0) {
            errors.push('Aucune étape définie pour ce processus');
        }

        // Validation de la séquence des étapes
        const expectedSteps = this.apiConfig.getStepDefinitions(process.type);
        if (process.steps.length !== expectedSteps.length) {
            errors.push(`Nombre d'étapes incorrect: attendu ${expectedSteps.length}, trouvé ${process.steps.length}`);
        }

        return {
            isValid: errors.length === 0,
            errors
        };
    }

    /**
     * Met à jour un processus avec de nouvelles données dynamiques
     */
    refreshProcessWithDynamicData(type?: ProcessType): void {
        const targetType = type || this.currentProcessType;
        const dynamicProcess = this.generateDynamicProcess(targetType);
        this.currentProcessSubject.next(dynamicProcess);
    }

    /**
     * Obtient des statistiques sur un processus
     */
    getProcessStatistics(process: Process): {
        totalSteps: number;
        completedSteps: number;
        inProgressSteps: number;
        notStartedSteps: number;
        cancelledSteps: number;
        completionPercentage: number;
    } {
        const totalSteps = process.steps.length;
        const completedSteps = process.steps.filter(step => step.status === StepStatus.COMPLETED).length;
        const inProgressSteps = process.steps.filter(step => step.status === StepStatus.IN_PROGRESS).length;
        const notStartedSteps = process.steps.filter(step => step.status === StepStatus.NOT_STARTED).length;
        const cancelledSteps = process.steps.filter(step => step.status === StepStatus.CANCELLED).length;
        const completionPercentage = Math.round((completedSteps / totalSteps) * 100);

        return {
            totalSteps,
            completedSteps,
            inProgressSteps,
            notStartedSteps,
            cancelledSteps,
            completionPercentage
        };
    }
}