// GradPulse - Community Programs Seed
// DB: community_db
// Collection: programs

db = db.getSiblingDB("community_db");

db.programs.insertMany([
  {
    _id: "COMM-001",
    name: "Community Teaching Support",
    description: "Support schools with tutoring and educational assistance programs.",
    hours_required: 160,
    active: true
  },
  {
    _id: "COMM-002",
    name: "Digital Literacy Workshops",
    description: "Teach basic digital skills to community groups.",
    hours_required: 120,
    active: true
  },
  {
    _id: "COMM-003",
    name: "Tech Support for NGOs",
    description: "Provide IT support and basic systems setup for local NGOs.",
    hours_required: 100,
    active: true
  },
  {
    _id: "COMM-004",
    name: "Community Data Collection",
    description: "Participate in surveys and data analysis for local initiatives.",
    hours_required: 80,
    active: true
  },
  {
    _id: "COMM-005",
    name: "Open Source University Projects",
    description: "Contribute to open source projects supporting academic community.",
    hours_required: 140,
    active: true
  },
  {
    _id: "COMM-006",
    name: "Health Tech Awareness",
    description: "Support awareness campaigns using simple tech tools and dashboards.",
    hours_required: 60,
    active: true
  },
  {
    _id: "COMM-007",
    name: "Community Events Logistics",
    description: "Help coordinate and manage participation in community events.",
    hours_required: 50,
    active: true
  },
  {
    _id: "COMM-008",
    name: "Mentorship for New Students",
    description: "Mentor early semester students in academic and technical topics.",
    hours_required: 40,
    active: true
  }
]);

// Ensure index for active filtering
db.programs.createIndex({ active: 1 });
