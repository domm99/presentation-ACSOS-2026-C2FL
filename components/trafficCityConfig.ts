export type TrafficCluster = 'a' | 'b' | 'c'
export type TrafficDirection = 'east' | 'west' | 'north' | 'south'
export type VehicleTone = 'teal' | 'orange' | 'green' | 'plum'

export interface TrafficVehicle {
  direction: TrafficDirection
  duration: number
  delay: number
  track: number
  tone: VehicleTone
  kind: 'car' | 'van'
}

export interface TrafficSite {
  id: string
  camera: string
  name: string
  flow: string
  x: number
  y: number
  cluster: TrafficCluster
  vehicles: TrafficVehicle[]
}

const directions: TrafficDirection[] = ['east', 'west', 'north', 'south']
const tones: VehicleTone[] = ['teal', 'orange', 'green', 'plum']

function makeFleet(
  count: number,
  baseDuration: number,
  seed: number,
  preferredDirections: TrafficDirection[] = directions,
): TrafficVehicle[] {
  return Array.from({ length: count }, (_, index) => {
    const duration = baseDuration + ((index + seed) % 3) * 0.9
    return {
      direction: preferredDirections[(index + seed) % preferredDirections.length],
      duration,
      delay: -(((index * 1.73) + seed * 0.61) % duration),
      track: ((index + seed) % 3 - 1) * 0.16,
      tone: tones[(index * 2 + seed) % tones.length],
      kind: (index + seed) % 5 === 0 ? 'van' : 'car',
    }
  })
}

export const trafficSites: TrafficSite[] = [
  {
    id: 'centre',
    camera: 'CAM 01',
    name: 'CITY CENTRE',
    flow: 'dense rush hour',
    x: 17,
    y: 22,
    cluster: 'a',
    vehicles: [
      { direction: 'east', duration: 13.0, delay: 0, track: 0, tone: 'teal', kind: 'car' },
      { direction: 'east', duration: 13.0, delay: 0, track: 0, tone: 'orange', kind: 'car' },
      { direction: 'west', duration: 13.0, delay: 0, track: 0, tone: 'plum', kind: 'van' },
      { direction: 'west', duration: 13.0, delay: 0, track: 0, tone: 'teal', kind: 'car' },
      { direction: 'south', duration: 13.0, delay: 0, track: 0, tone: 'green', kind: 'car' },
      { direction: 'north', duration: 13.0, delay: 0, track: 0, tone: 'orange', kind: 'car' },
    ],
  },
  {
    id: 'school',
    camera: 'CAM 02',
    name: 'SCHOOL GATE',
    flow: 'stop-and-go queue',
    x: 50,
    y: 22,
    cluster: 'b',
    vehicles: [
      { direction: 'east', duration: 12.0, delay: 0, track: 0, tone: 'orange', kind: 'car' },
      { direction: 'east', duration: 12.0, delay: 0, track: 0, tone: 'teal', kind: 'van' },
      { direction: 'west', duration: 12.0, delay: 0, track: 0, tone: 'plum', kind: 'car' },
      { direction: 'west', duration: 12.0, delay: 0, track: 0, tone: 'green', kind: 'car' },
      { direction: 'south', duration: 12.0, delay: 0, track: 0, tone: 'teal', kind: 'car' },
    ],
  },
  {
    id: 'ring',
    camera: 'CAM 03',
    name: 'RING ROAD',
    flow: 'fast, sparse flow',
    x: 83,
    y: 22,
    cluster: 'c',
    vehicles: [
      { direction: 'east', duration: 5.0, delay: -5.0, track: 0, tone: 'teal', kind: 'car' },
      { direction: 'east', duration: 5.0, delay: -2.5, track: 0, tone: 'orange', kind: 'van' },
      { direction: 'west', duration: 5.0, delay: -3.8, track: 0, tone: 'plum', kind: 'car' },
      { direction: 'west', duration: 5.0, delay: -1.3, track: 0, tone: 'green', kind: 'car' },
    ],
  },
  {
    id: 'stadium',
    camera: 'CAM 06',
    name: 'STADIUM',
    flow: 'event surge',
    x: 83,
    y: 78,
    cluster: 'a',
    vehicles: [
      { direction: 'north', duration: 10.0, delay: 0, track: 0, tone: 'plum', kind: 'car' },
      { direction: 'north', duration: 10.0, delay: -0.8, track: 0, tone: 'teal', kind: 'van' },
      { direction: 'south', duration: 10.0, delay: 0, track: 0, tone: 'orange', kind: 'car' },
      { direction: 'south', duration: 10.0, delay: -0.8, track: 0, tone: 'green', kind: 'car' },
      { direction: 'east', duration: 10.0, delay: 0, track: 0, tone: 'plum', kind: 'car' },
      { direction: 'west', duration: 10.0, delay: 0, track: 0, tone: 'teal', kind: 'car' },
    ],
  },
  {
    id: 'residential',
    camera: 'CAM 04',
    name: 'RESIDENTIAL',
    flow: 'steady local flow',
    x: 17,
    y: 78,
    cluster: 'b',
    vehicles: [
      { direction: 'east', duration: 10.0, delay: 0, track: 0, tone: 'green', kind: 'car' },
      { direction: 'west', duration: 10.0, delay: 0, track: 0, tone: 'teal', kind: 'car' },
      { direction: 'north', duration: 10.0, delay: 0, track: 0, tone: 'plum', kind: 'car' },
      { direction: 'south', duration: 10.0, delay: 0, track: 0, tone: 'orange', kind: 'van' },
    ],
  },
  {
    id: 'arterial',
    camera: 'CAM 05',
    name: 'ARTERIAL',
    flow: 'fast through flow',
    x: 50,
    y: 78,
    cluster: 'c',
    vehicles: [
      { direction: 'east', duration: 6.2, delay: 0, track: 0, tone: 'teal', kind: 'van' },
      { direction: 'east', duration: 6.2, delay: -3.1, track: 0, tone: 'orange', kind: 'car' },
      { direction: 'west', duration: 6.2, delay: 0, track: 0, tone: 'plum', kind: 'car' },
      { direction: 'west', duration: 6.2, delay: -3.1, track: 0, tone: 'green', kind: 'car' },
    ],
  },
]

export const clusterModels = [
  { cluster: 'a' as const, x: 17, y: 50, label: 'ωA' },
  { cluster: 'b' as const, x: 50, y: 50, label: 'ωB' },
  { cluster: 'c' as const, x: 83, y: 50, label: 'ωC' },
]

export const clusterPairs = clusterModels.map((model) => ({
  cluster: model.cluster,
  sites: trafficSites.filter((site) => site.cluster === model.cluster),
}))
