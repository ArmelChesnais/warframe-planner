import orb_vallis from "@/data/items/orb_vallis";

export default [
  {
    name: "Orb Vallis Missions",
    cost: 5,
    repeatable: true,
    preconditions: {
      // "Vor": "Defeated",
    },
    effects: {
      [orb_vallis["Gorgaricus Spore"].name]: { "+": 1 },
      [orb_vallis["Mytocardia Spore"].name]: { "+": 1 },
      [orb_vallis["Tepa Nodule"].name]: { "+": 1 },
      [orb_vallis["Thermal Sludge"].name]: { "+": 1 },
      
      [orb_vallis["Advances Debt-Bond"].name]: { "+": 1 },
      [orb_vallis["Familial Debt-Bond"].name]: { "+": 1 },
      [orb_vallis["Medical Debt-Bond"].name]: { "+": 1 },
      [orb_vallis["Shelter Debt-Bond"].name]: { "+": 1 },
      [orb_vallis["Training Debt-Bond"].name]: { "+": 1 },
      
      [orb_vallis["Atmo Systems"].name]: { "+": 1 },
      [orb_vallis["Gyromag Systems"].name]: { "+": 1 },
      [orb_vallis["Repeller Systems"].name]: { "+": 1 },

      [orb_vallis["Calda Toroid"].name]: { "+": 1 },
      [orb_vallis["Sola Toroid"].name]: { "+": 1 },
      [orb_vallis["Vega Toroid"].name]: { "+": 1 },
      [orb_vallis["Crisma Toroid"].name]: { "+": 1 },
      [orb_vallis["Lazulite Toroid"].name]: { "+": 1 },

      [orb_vallis["Narmer Isoplast"].name]: { "+": 1 },
      [orb_vallis["Diluted Thermia"].name]: { "+": 1 },
    },
  },
  {
    name: "Orb Vallis mining",
    cost: 5,
    repeatable: true,
    preconditions: {
      // "Jackal": "Defeated",
    },
    effects: {
      [orb_vallis["Axidite"].name]: { "+": 1 },
      [orb_vallis["Hesperon"].name]: { "+": 1 },
      [orb_vallis["Travoride"].name]: { "+": 1 },
      [orb_vallis["Venerol"].name]: { "+": 1 },
      [orb_vallis["Amarast"].name]: { "+": 1 },
      [orb_vallis["Goblite"].name]: { "+": 1 },
      [orb_vallis["Noctrul"].name]: { "+": 1 },
      [orb_vallis["Phasmin"].name]: { "+": 1 },
      [orb_vallis["Thyst"].name]: { "+": 1 },
      [orb_vallis["Zodian"].name]: { "+": 1 },
    },
  },
  {
    name: "Orb Vallis fishing",
    cost: 5,
    repeatable: true,
    preconditions: {
      // "Vay Hek": "Defeated",
    },
    effects: {
      [orb_vallis["Scrap"].name]: { "+": 1 },
      [orb_vallis["Echowinder Anoscopic Sensor"].name]: { "+": 1 },
      [orb_vallis["Tink Dissipator Coil"].name]: { "+": 1 },
      [orb_vallis["Synathid Ecosynth Analyzer"].name]: { "+": 1 },
      [orb_vallis["Tromyzon Entroplasma"].name]: { "+": 1 },
      [orb_vallis["Scrubber Exa Brain"].name]: { "+": 1 },
      [orb_vallis["Longwinder Lathe Coagulant"].name]: { "+": 1 },
      [orb_vallis["Brickie Muon Battery"].name]: { "+": 1 },
      [orb_vallis["Recaster Neural Relay"].name]: { "+": 1 },
      [orb_vallis["Mirewinder Parallel Biode"].name]: { "+": 1 },
      [orb_vallis["Eye-Eye Rotoblade"].name]: { "+": 1 },
      [orb_vallis["Charamote Sagan Module"].name]: { "+": 1 },
      [orb_vallis["Kriller Thermal Laser"].name]: { "+": 1 },
      [orb_vallis["Sapcaddy Venedo Case"].name]: { "+": 1 },
      [orb_vallis["Crewman's Boot"].name]: { "+": 1 },
    },
  }
];