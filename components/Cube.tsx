import * as THREE from "three";
import React, { FC, useEffect, useRef, useState } from "react";
import Plane from "./Plane";
import { CubeProps, PlaneProps } from "../models/geometry.interface";

const Cube: FC<CubeProps> = ({ activePlaneEmitter, gestureTranslationX }) => {
  const cube = useRef<THREE.Mesh>(null);
  const rotate90 = Math.PI / 2;
  const rotationDegree = Math.PI / 45;

  useEffect(() => {
    if (cube.current) {
      gestureTranslationX > 0 ? cube.current.rotation.y += rotationDegree : cube.current.rotation.y -= rotationDegree
    }
  }, [gestureTranslationX]);

  const [activePlane, setActivePlane] = useState<number>();

  const cubeSideParameters: Omit<PlaneProps, "clickEmitter" | "color">[] = [
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
  ];

  const onPlaneClicked = (id: number): void => {
    if (id > 0 && id < 7) {
      setActivePlane(id);
      activePlaneEmitter(id);
    } else {
      alert("Incorrect side id.");
    }
  };

  return (
    <group ref={cube}>
      {cubeSideParameters.map((side) => (
        <Plane
          {...side}
          clickEmitter={(id) => onPlaneClicked(id)}
          color={activePlane === side.id ? "red" : "rebeccapurple"}
          key={side.id}
        />
      ))}
    </group>
  );
};

export default Cube;
