import {
  ShoppingCart,
  Code2,
  Truck,
  Headset,
  type LucideIcon,
} from "lucide-react";

export type Department = "Savdo" | "IT" | "Marketing" | "Logistika" | "Moliya" | "Boshqa";

export interface JobOpening {
  id: string;
  title: string;
  department: Department;
  icon: LucideIcon;
  location: string;
  employmentType: string;
  postedDaysAgo: number;
}

export const jobOpenings: JobOpening[] = [
  {
    id: "savdo-menejeri",
    title: "Savdo menejeri",
    department: "Savdo",
    icon: ShoppingCart,
    location: "Toshkent",
    employmentType: "To'liq ish vaqti",
    postedDaysAgo: 2,
  },
  {
    id: "frontend-developer",
    title: "Frontend Developer",
    department: "IT",
    icon: Code2,
    location: "Toshkent",
    employmentType: "To'liq ish vaqti",
    postedDaysAgo: 1,
  },
  {
    id: "logistika-mutaxassisi",
    title: "Logistika mutaxassisi",
    department: "Logistika",
    icon: Truck,
    location: "Samarqand",
    employmentType: "To'liq ish vaqti",
    postedDaysAgo: 3,
  },
  {
    id: "call-center-operator",
    title: "Call center operator",
    department: "Boshqa",
    icon: Headset,
    location: "Toshkent",
    employmentType: "Qisman ish vaqti",
    postedDaysAgo: 5,
  },
];

export const departmentFilters: Department[] = [
  "Savdo",
  "IT",
  "Marketing",
  "Logistika",
  "Moliya",
  "Boshqa",
];
