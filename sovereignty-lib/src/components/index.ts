import Component from 'components/Component';
import TransformComponent from 'components/TransformComponent';
import CameraComponent from 'components/CameraComponent';
import LightComponent from 'components/LightComponent';
import MeshComponent from './mesh/MeshComponent';
import PrimitiveMeshComponent from './mesh/PrimitiveMeshComponent';
import HeightmapMeshComponent from './mesh/HeightmapMeshComponent';

import ColliderComponent from './colliders/ColliderComponent';
import PlaneColliderComponent from './colliders/PlaneColliderComponent';
import HeightmapColliderComponent from './colliders/HeightmapColliderComponent';
import SphereColliderComponent from './colliders/SphereColliderComponent';
import BoxColliderComponent from './colliders/BoxColliderComponent';
import CapsuleColliderComponent from './colliders/CapsuleColliderComponent';

import FirstPersonController from './high-level/FirstPersonController';

import RigidbodyComponent from 'components/RigidbodyComponent';
import KeyboardMouseComponent from 'components/KeyboardMouseComponent';
import SpriteComponent from 'components/SpriteComponent';
import ParticleSystemComponent from 'components/ParticleSystemComponent';
import ModelComponent from 'components/ModelComponent';
import AudioListenerComponent from 'components/AudioListenerComponent';
import AudioSourceComponent from 'components/AudioSourceComponent';

export default [ Component, TransformComponent, CameraComponent, LightComponent,
  MeshComponent, PrimitiveMeshComponent, HeightmapMeshComponent,
  ColliderComponent, PlaneColliderComponent, HeightmapColliderComponent,
  SphereColliderComponent, BoxColliderComponent, CapsuleColliderComponent,
  RigidbodyComponent, KeyboardMouseComponent, SpriteComponent, ParticleSystemComponent,
  ModelComponent, AudioListenerComponent, AudioSourceComponent, FirstPersonController ];
