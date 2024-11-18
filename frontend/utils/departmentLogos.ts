import { StaticImageData } from "next/image";

import AbuDhabiCivilDefenceAuthority from "@/public/departments/Abu Dhabi Civil Defence Authority.svg";
import AbuDhabiExecutiveOfficeLogo from "@/public/departments/Abu Dhabi Executive Office Logo.svg";
import AbuDhabiJudicialDepartment from "@/public/departments/Abu Dhabi Judicial Department.png";
import DepartmentOfCommunityDevelopment from "@/public/departments/Department of Community Development.svg";
import DepartmentOfCultureTourism from "@/public/departments/Department of Culture  Tourism.svg";
import DepartmentOfEconomicDevelopment from "@/public/departments/Department of Economic Development.png";
import DepartmentOfEducationAndKnowledge from "@/public/departments/Department of Education and Knowledge.png";
import DepartmentOfEnergy from "@/public/departments/Department of Energy.svg";
import DepartmentOfGovernmentEnablement from "@/public/departments/Department of goverment enablemnet.png";
import DepartmentOfHealth from "@/public/departments/Department of Health.png";
import DepartmentOfMunicipalitiesAndTransport from "@/public/departments/Department of Municipalities and Transport.svg";
import Default from "@/public/departments/Default.png";

const departmentLogos: Record<string, StaticImageData> = {
  "Abu Dhabi Civil Defence Authority": AbuDhabiCivilDefenceAuthority,
  "Abu Dhabi Executive Office": AbuDhabiExecutiveOfficeLogo,
  "Abu Dhabi Judicial Department": AbuDhabiJudicialDepartment,
  "Department of Community Development": DepartmentOfCommunityDevelopment,
  "Department of Culture and Tourism": DepartmentOfCultureTourism,
  "Department of Economic Development": DepartmentOfEconomicDevelopment,
  "Department of Education and Knowledge": DepartmentOfEducationAndKnowledge,
  "Department of Energy": DepartmentOfEnergy,
  "Department of Government Enablement": DepartmentOfGovernmentEnablement,
  "Department of Health": DepartmentOfHealth,
  "Department of Municipalities and Transport": DepartmentOfMunicipalitiesAndTransport,
};

export { departmentLogos, Default };
