import React, {
  forwardRef,
  ForwardRefExoticComponent,
  useCallback,
  useMemo,
  useState,
} from "react";
import Plane from "./Plane";
import { CubeProps, PlaneProps } from "../models/geometry.interface";
import { StyleSheet } from "react-native";
import { Group } from "three";

const Cube: ForwardRefExoticComponent<CubeProps & { ref: React.Ref<Group>}> = forwardRef<Group, CubeProps>(
  ({ activePlaneEmitter }, ref) => {
    const rotate90 = Math.PI / 2;
    const [activePlane, setActivePlane] = useState<number>();

    const cubeSideParameters = useMemo<Omit<PlaneProps, "clickEmitter" | "color">[]>(() => [
      {
        id: 1,
        name: "front",
        rotation: [0, 0, 0],
        position: [0, 0, 1],
      },
      {
        id: 2,
        name: "left",
        rotation: [0, rotate90, 0],
        position: [-1, 0, 0],
      },
      {
        id: 3,
        name: "right",
        rotation: [0, rotate90, 0],
        position: [1, 0, 0],
      },
      {
        id: 4,
        name: "back",
        rotation: [0, 0, 0],
        position: [0, 0, -1],
      },
      {
        id: 5,
        name: "bottom",
        rotation: [rotate90, 0, 0],
        position: [0, -1, 0],
      },
      {
        id: 6,
        name: "top",
        rotation: [rotate90, 0, 0],
        position: [0, 1, 0],
      },
    ], []);

    const onPlaneClicked = useCallback((id: number): void => {
      if (id > 0 && id < 7) {
        setActivePlane(id);
        activePlaneEmitter(id);
      } else {
        alert("Incorrect side id.");
      }
    }, []);

    return (
      <>
        <group ref={ref}>
          {cubeSideParameters.map((side) => (
            <Plane
              {...side}
              clickEmitter={(id) => onPlaneClicked(id)}
              color={activePlane === side.id ? "red" : "rebeccapurple"}
              key={side.id}
            />
          ))}
        </group>
      </>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 3,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Cube;
