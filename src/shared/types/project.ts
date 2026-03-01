export type ProjectType = "work" | "personal";

export interface ProjectMetric {
  readonly label: string;
  readonly value: string;
  readonly unit?: string;
}

export interface CaseStudySections {
  readonly theProblem: string;
  readonly whatISaw: string;
  readonly theDecisions: string;
  readonly beyondTheAssignment: string;
  readonly whatDidntWork: string;
  readonly theBiggerPicture: string;
  readonly forNonSpecialists: string;
}

export interface ProjectCaseStudy {
  readonly slug: string;
  readonly title: string;
  readonly subtitle?: string;
  readonly hook: string;
  readonly type: ProjectType;
  readonly tags: readonly string[];
  readonly metrics?: readonly ProjectMetric[];
  readonly sections: CaseStudySections;
  readonly stack: readonly string[];
}

export interface ProjectSummary {
  readonly slug: string;
  readonly title: string;
  readonly hook: string;
  readonly type: ProjectType;
  readonly tags: readonly string[];
  readonly metrics?: readonly ProjectMetric[];
}
