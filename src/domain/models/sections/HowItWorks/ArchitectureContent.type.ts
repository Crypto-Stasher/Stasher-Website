export type Machine = {
  name: string;
  role: string;
  detail: string;
};

export type ArchitectureZone = {
  zone: string;
  color: string;
  machines: Machine[];
};

export type ArchitectureContent = {
  title: string;
  subtitle: string;
  description: string;
  zones: ArchitectureZone[];
};
