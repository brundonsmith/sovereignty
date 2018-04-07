import Component from './Component';
import TransformComponent from './TransformComponent';
import CameraComponent from './CameraComponent';
import LightComponent from './LightComponent';
import MeshComponent from './mesh/MeshComponent';
import PrimitiveMeshComponent from './mesh/PrimitiveMeshComponent';
import HeightmapMeshComponent from './mesh/HeightmapMeshComponent';

import ColliderComponent from './colliders/ColliderComponent';
import PlaneColliderComponent from './colliders/PlaneColliderComponent';
import HeightmapColliderComponent from './colliders/HeightmapColliderComponent';
import SphereColliderComponent from './colliders/SphereColliderComponent';
import BoxColliderComponent from './colliders/BoxColliderComponent';

import RigidbodyComponent from './RigidbodyComponent';
import KeyboardMoveComponent from './KeyboardMoveComponent';

export default [ Component, TransformComponent, CameraComponent, LightComponent,
  MeshComponent,
  PrimitiveMeshComponent, HeightmapMeshComponent,
  ColliderComponent, PlaneColliderComponent, HeightmapColliderComponent,
  SphereColliderComponent, BoxColliderComponent, RigidbodyComponent, KeyboardMoveComponent ];
