import { z } from "zod";
import { TargetService } from "./target.service";

interface TargetList {
  id: string;
  title: string;
  unit: string;
  isPositive: boolean;
  baseYear: number;
  year1403: number;
  year1404: number;
  year1405: number;
  year1406: number;
  year1407: number;
  finalPercentage: number;
  weight: number;
  taskId: string;
}

type ParamsTarget = {
  id: string;
  tId: string;
};

const Target = TargetService.Target();

type AddTargetRequest = z.infer<typeof Target>;
type EditTargetRequest = z.infer<typeof Target>;
type DeleteTargetResponse = boolean;
type GetAllTargetListResponse = TargetList;

export type {
  AddTargetRequest,
  EditTargetRequest,
  DeleteTargetResponse,
  GetAllTargetListResponse,
  ParamsTarget,
};
