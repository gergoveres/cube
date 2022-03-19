import * as THREE from "three";
import React, { FC, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber/native";
import Plane from "./Plane";
import { CubeProps, PlaneProps } from "../models/geometry.interface";

const Cube: FC<CubeProps> = ({activePlaneEmitter, ...props}) => {
  const cube = useRef<THREE.Mesh>(null);
  const rotate45 = Math.PI / 4;
  const rotate90 = Math.PI / 2;

  useFrame(() => {
    if(cube.current) {
      cube.current.rotation.x = rotate45;
      cube.current.rotation.y = rotate45;
    }
  });

  const [activePlane, setActivePlane] = useState<number>();

  const cubeSideParameters: Omit<PlaneProps, "clickEmitter" | "color">[] = [
    {
      id: 1,
      name: "front",
      rotation: [0, 0, 0],
      position: [0, 0, -2],
    },
    {
      id: 2,
      name: "left",
      rotation: [0, rotate90, 0],
      position: [-1, 0, -1],
    },
    {
      id: 3,
      name: "right",
      rotation: [0, rotate90, 0],
      position: [1, 0, -1],
    },
    {
      id: 4,
      name: "back",
      rotation: [0, 0, 0],
      position: [0, 0, 0],
    },
    {
      id: 5,
      name: "bottom",
      rotation: [rotate90, 0, 0],
      position: [0, -1, -1],
    },
    {
      id: 6,
      name: "top",
      rotation: [rotate90, 0, 0],
      position: [0, 1, -1],
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
    <group ref={cube} position={props.position}>
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
