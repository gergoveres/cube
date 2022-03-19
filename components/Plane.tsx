import * as THREE from "three";
import React, { FC } from "react";
import { PlaneProps } from "../models/geometry.interface";

const Plane: FC<PlaneProps> = ({
  id,
  name,
  color,
  rotation,
  position,
  width = 2,
  height = 2,
  clickEmitter,
}) => (
  <mesh
    name={name}
    position={position}
    rotation={rotation}
    onClick={(event) => {
      event.stopPropagation();
      clickEmitter(id);
    }}
  >
    <planeBufferGeometry args={[width, height]} />
    <meshBasicMaterial color={color} side={THREE.DoubleSide} />
  </mesh>
);

export default Plane;
