/* eslint-disable @typescript-eslint/no-explicit-any */
import DefaultProps from "@/type/hook.interface";
import React from "react";

export interface RoutesMapInterface {
  link: string;
  title: string;
  Element: React.FC<any>;
  Layout?: React.FC<DefaultProps & { children?: React.ReactNode }>;
  nested?: RoutesMapInterface[];
}
