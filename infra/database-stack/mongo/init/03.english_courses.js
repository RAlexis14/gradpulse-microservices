db = db.getSiblingDB("languages_db");

db.english_courses.deleteMany({});

db.english_courses.insertMany([
  // A1.1
  { name: "English A1.1 - Morning Track", level: "A1.1", schedule: "Mon-Fri 08:00-10:00", modality: "On-site", duration_weeks: 8, hours_per_week: 10, active: true },
  { name: "English A1.1 - Evening Track", level: "A1.1", schedule: "Mon-Fri 18:00-20:00", modality: "Online", duration_weeks: 8, hours_per_week: 10, active: true },

  // A1.2
  { name: "English A1.2 - Afternoon Track", level: "A1.2", schedule: "Mon-Fri 14:00-16:00", modality: "On-site", duration_weeks: 8, hours_per_week: 10, active: true },

  // A2.1
  { name: "English A2.1 - Morning Track", level: "A2.1", schedule: "Mon-Wed-Fri 09:00-11:00", modality: "On-site", duration_weeks: 8, hours_per_week: 6, active: true },
  { name: "English A2.1 - Weekend Track", level: "A2.1", schedule: "Sat 08:00-12:00", modality: "On-site", duration_weeks: 10, hours_per_week: 4, active: true },

  // A2.2
  { name: "English A2.2 - Evening Track", level: "A2.2", schedule: "Tue-Thu 18:00-20:00", modality: "Online", duration_weeks: 8, hours_per_week: 4, active: true },

  // B1.1 (final requirement)
  { name: "English B1.1 - Afternoon Track A", level: "B1.1", schedule: "Mon-Fri 15:00-17:00", modality: "On-site", duration_weeks: 8, hours_per_week: 10, active: true },
  { name: "English B1.1 - Afternoon Track B", level: "B1.1", schedule: "Mon-Fri 16:00-18:00", modality: "On-site", duration_weeks: 8, hours_per_week: 10, active: true },
  { name: "English B1.1 - Evening Track", level: "B1.1", schedule: "Mon-Fri 19:00-21:00", modality: "Online", duration_weeks: 8, hours_per_week: 10, active: true },
  { name: "English B1.1 - Weekend Intensive", level: "B1.1", schedule: "Sat-Sun 08:00-12:00", modality: "On-site", duration_weeks: 6, hours_per_week: 8, active: true }
]);
