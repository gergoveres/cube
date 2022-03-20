import { Euler, Vector3 } from "@react-three/fiber/native";

export interface PlaneProps {
  id: number;
  name: string;
  color: string;
  rotation: Euler;
  position: Vector3;
  width?: number;
  height?: number;
  clickEmitter: (id: number) => void;
}

export interface CubeProps {
  activePlaneEmitter: (id: number) => void;
  gestureTranslationX: number;
}
