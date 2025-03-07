export default [
  {
    name: "Mercury Missions",
    cost: 5,
    repeatable: true,
    preconditions: {
      // "Vor": "Defeated",
    },
    effects: {
      "Mercury Missions": "complete",
      "Morphics": { "+": 0.5 },
      "Ferrite": { "+": 1_000 },
      "Polymer Bundle": { "+": 300 },
      "Detonite Ampule": { "+": 6 },
    },
  },
  {
    name: "Venus Missions",
    cost: 5,
    repeatable: true,
    preconditions: {
      // "Jackal": "Defeated",
    },
    effects: {
      "Venus Missions": "complete",
      "Alloy Plate": { "+": 100 },
      "Polymer Bundle": { "+": 100 },
      "Circuits": { "+": 100 },
      "Fieldron Sample": { "+": 6 },
    },
  },
  {
    name: "Earth Missions",
    cost: 5,
    repeatable: true,
    preconditions: {
      // "Vay Hek": "Defeated",
    },
    effects: {
      "Earth Missions": "complete",
      "Ferrite": { "+": 1_000 },
      "Rubedo": { "+": 300 },
      "Neurodes": { "+": 0.5 },
      "Detonite Ampule": { "+": 6 },
    },
  },
  {
    name: "Mars Missions",
    cost: 5,
    repeatable: true,
    preconditions: {
      // "Phorid": "Defeated",
    },
    effects: {
      "Mars Missions": "complete",
      "Morphics": { "+": 0.5 },
      "Salvage": { "+": 500 },
      "Gallium": { "+": 0.5 },
      "Fieldron Sample": { "+": 6 },
    },
  },
  { 
    name: "Deimos Missions",
    cost: 5,
    repeatable: true,
    preconditions: {
      // "Heart of Deimos": "complete",
    },
    effects: {
      "Deimos Missions": "complete",
      "Orokin Cell": { "+": 0.5 },
      "Neurodes": { "+": 0.5 },
      "Mutagen Sample": { "+": 6 },
      "Nano Spores": { "+": 200 },
    },
  },
  {
    name: "Phobos Missions",
    cost: 5,
    repeatable: true,
    preconditions: {
      // "The Sergeant": "Defeated",
    },
    effects: {
      "Phobos Missions": "complete",
      "Rubedo": { "+": 300 },
      "Morphics": { "+": 0.5 },
      "Plastids": { "+": 100 },
      "Alloy Plate": { "+": 100 },
    },
  },
  {
    name: "Ceres Missions",
    cost: 5,
    repeatable: true,
    preconditions: {
      // "Lech Kril": "Defeated",
    },
    effects: {
      "Ceres Missions": "complete",
      "Alloy Plate": { "+": 100 },
      "Circuits": { "+": 100 },
      "Orokin Cell": { "+": 0.5 },
      "Detonite Ampule": { "+": 6 },
    },
  },
  {
    name: "Jupiter Missions",
    cost: 5,
    repeatable: true,
    preconditions: {
      // "Alad V": "Defeated",
    },
    effects: {
      "Jupiter Missions": "complete",
      "Salvage": { "+": 500 },
      "Hexenon": { "+": 6 },
      "Neural Sensors": { "+": 0.5 },
      "Alloy Plate": { "+": 100 },
    },
  },
  {
    name: "Europa Missions",
    cost: 5,
    repeatable: true,
    preconditions: {
      // "Raptor": "Defeated",
    },
    effects: {
      "Europa Missions": "complete",
      "Morphics": { "+": 0.5 },
      "Rubedo": { "+": 300 },
      "Fieldron Sample": { "+": 6 },
      "Control Module": { "+": 0.5 },
    },
  },
  {
    name: "Saturn Missions",
    cost: 5,
    repeatable: true,
    preconditions: {
      // "Sargas Ruk": "Defeated",
    },
    effects: {
      "Saturn Missions": "complete",
      "Nano Spores": { "+": 200 },
      "Plastids": { "+": 100 },
      "Orokin Cell": { "+": 0.5 },
      "Detonite Ampule": { "+": 6 },
    },
  },
  {
    name: "Uranus Missions",
    cost: 5,
    repeatable: true,
    preconditions: {
      // "Tyl Regor": "Def
    },
    effects: {
      "Uranus Missions": "complete",
      "Polymer Bundle": { "+": 100 },
      "Plastids": { "+": 100 },
      "Gallium": { "+": 0.5 },
      "Detonite Ampule": { "+": 6 },
    },
  },
  {
    name: "Neptune Missions",
    cost: 5,
    repeatable: true,
    preconditions: {
      // "Hyena Pack": "Defeated",
    },
    effects: {
      "Neptune Missions": "complete",
      "Nano Spores": { "+": 200 },
      "Ferrite": { "+": 1_000 },
      "Control Module": { "+": 0.5 },
      "Fieldron Sample": { "+": 6 },
    },
  },
  {
    name: "Pluto Missions",
    cost: 5,
    repeatable: true,
    preconditions: {
      // "Ambulas": "Defeated",
    },
    effects: {
      "Pluto Missions": "complete",
      "Rubedo": { "+": 300 },
      "Morphics": { "+": 0.5 },
      "Plastids": { "+": 100 },
      "Alloy Plate": { "+": 100 },
      "Fieldron Sample": { "+": 6 },
    },
  },
  {
    name: "Eris Missions",
    cost: 5,
    repeatable: true,
    preconditions: {
      // "Mutalist Alad V": "Defeated",
    },
    effects: {
      "Eris Missions": "complete",
      "Nano Spores": { "+": 200 },
      "Plastids": { "+": 100 },
      "Neurodes": { "+": 0.5 },
      "Mutagen Sample": { "+": 6 },
    },
  },
  {
    name: "Sedna Missions",
    cost: 5,
    repeatable: true,
    preconditions: {
      // "Kela De Thaym": "Defeated",
    },
    effects: {
      "Sedna Missions": "complete",
      "Rubedo": { "+": 300 },
      "Alloy Plate": { "+": 100 },
      "Salvage": { "+": 500 },
      "Detonite Ampule": { "+": 6 },
    },
  },
  {
    name: "Void Missions",
    cost: 5,
    repeatable: true,
    preconditions: {
      // "Phorid": "Defeated",
    },
    effects: {
      "Void Missions": "complete",
      "Ferrite": { "+": 1_000 },
      "Rubedo": { "+": 300 },
      "Argon Crystal": { "+": 0.5 },
      "Control Module": { "+": 0.5 },
    },
  },
  {
    name: "Kuva Fortress Missions",
    cost: 5,
    repeatable: true,
    preconditions: {
      // "Siphon/Flood": "complete",
    },
    effects: {
      "Kuva Fortress Missions": "complete",
      "Salvage": { "+": 500 },
      "Circuits": { "+": 100 },
      "Neural Sensors": { "+": 0.5 },
      "Detonite Ampule": { "+": 6 },
    },
  },
  {
    name: "Zariman Missions",
    cost: 5,
    repeatable: true,
    preconditions: {
      // "
    },
    effects: {
      "Zariman Missions": "complete",
      "Ferrite": { "+": 1_000 },
      "Alloy Plate": { "+": 100 },
      "Voidgel": { "+": 6 },
      "Entrati Lanthorn": { "+": 0.5 },
    },
  },
  {
    name: "Albrecht's Laboratories Missions",
    cost: 5,
    repeatable: true,
    preconditions: {
      // "Albrecht's Laboratories": "complete",
    },
    effects: {
      "Albrecht's Laboratories Missions": "complete",
      "Entrati Obols": { "+": 100 },
      "Necracoil": { "+": 6 },
      "Stela": { "+": 0.5 },
      "Entrati Lanthorn": { "+": 0.5 },
    },
  },
  {
    name: "Höllvania Missions",
    cost: 5,
    repeatable: true,
    preconditions: {
      // "Höllvania": "complete",
    },
    effects: {
      "Höllvania Missions": "complete",
      "Höllvanian Pitchweave Fragment": { "+": 1 },
      "Efervon Sample": { "+": 6 },
      "Experimental Arc-Relay": { "+": 0.5 },
      "Techrot Chitin": { "+": 100 },
      "Techrot Motherboard": { "+": 0.5 },
    },
  }
];