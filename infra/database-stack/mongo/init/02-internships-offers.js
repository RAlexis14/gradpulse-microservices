// ===============================
// DOMAIN: INTERNSHIPS
// Collection: offers
// DB: internships_db
// Seed realistic internship offers (Engineering & IT focus)
// ===============================

db = db.getSiblingDB("internships_db");

db.offers.createIndex({ active: 1 });
db.offers.createIndex({ company: 1 });

db.offers.insertMany(
  [
    {
      _id: "INT-001",
      title: "Junior Backend Intern (Python)",
      company: "QuitoTech Labs",
      description:
        "Support REST API development, write unit tests, and assist with database integration in a distributed environment.",
      hours: 240,
      active: true
    },
    {
      _id: "INT-002",
      title: "DevOps Intern (Docker & CI/CD)",
      company: "Andes Cloud Services",
      description:
        "Help maintain CI pipelines, build Docker images, and support QA deployments on AWS.",
      hours: 200,
      active: true
    },
    {
      _id: "INT-003",
      title: "Data Intern (Analytics & Reporting)",
      company: "DataQ Insights",
      description:
        "Assist in data cleaning, dashboard support, and reporting for academic/operational metrics.",
      hours: 180,
      active: true
    },
    {
      _id: "INT-004",
      title: "Frontend Intern (React)",
      company: "Campus Digital Studio",
      description:
        "Support UI implementation, consume REST APIs, and improve UX for student-facing modules.",
      hours: 160,
      active: true
    },
    {
      _id: "INT-005",
      title: "IT Support Intern",
      company: "UCE Tech Support",
      description:
        "Provide support tickets, basic troubleshooting, and documentation for internal systems.",
      hours: 120,
      active: true
    },
    {
      _id: "INT-006",
      title: "Software QA Intern",
      company: "QualityFirst Ecuador",
      description:
        "Write test cases, execute API validations in Postman, and report defects with reproducible steps.",
      hours: 200,
      active: true
    },
    {
      _id: "INT-007",
      title: "Cloud Intern (AWS Fundamentals)",
      company: "Amazonia Systems",
      description:
        "Assist in basic cloud setup, monitoring concepts, and environment documentation (QA focus).",
      hours: 150,
      active: true
    },
    {
      _id: "INT-008",
      title: "Systems Intern (Networking Basics)",
      company: "NetAndes",
      description:
        "Support network documentation, basic configurations, and connectivity validation for services.",
      hours: 120,
      active: false
    }
  ],
  { ordered: false }
);
