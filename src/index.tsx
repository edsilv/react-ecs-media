import ReactDOM from "react-dom";
import React from "react";
import { Canvas } from "@react-three/fiber";
import {
  Entity,
  Facet,
  useAnimationFrame,
  useECS,
  useQuery,
  useSystem
} from "@react-ecs/core";
// import { Vector3 } from "three";
import { ThreeView } from "@react-ecs/three";
import { OrbitControls } from "@react-three/drei";

import "./index.css";

class Image extends Facet<Image> {
  src: string = "";
}

const ImageSystem = () => {
  const query = useQuery((e) => e.hasAll(ThreeView, Image));

  return useSystem((dt) => {
    query.loop([ThreeView, Image], (e, [view, image]) => {
      const mesh = view.object3d;

      // <planeBufferGeometry attach="geometry" args={[3, 4]} />
      // <meshBasicMaterial toneMapped={false} map={texture} />
      // const rot = view.object3d.rotation;
      // rot.x += image.amount.x * dt;
      // rot.y += image.amount.y * dt;
      // rot.z += image.amount.z * dt;
    });
  });
};

const Scene = () => {
  const ECS = useECS();
  useAnimationFrame(ECS.update);

  return (
    <Canvas>
      <ECS.Provider>
        <ambientLight intensity={1} />
        <OrbitControls />
        <ImageSystem />
        <Entity>
          <Image src="https://images.unsplash.com/photo-1504203254088-9fa5c8dc55ac?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=2466&q=80" />
          <ThreeView>
            <mesh></mesh>
          </ThreeView>
        </Entity>
      </ECS.Provider>
    </Canvas>
  );
};

ReactDOM.render(<Scene />, document.getElementById("root"));
