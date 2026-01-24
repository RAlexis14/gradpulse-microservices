import { seededInt } from "./seed";

// -----------------------------
// Community Programs (Mongo)
// -----------------------------
export function mockCommunityPrograms() {
  return [
    {
      id: "com-001",
      title: "Digital Inclusion Workshop",
      organization: "UCE Outreach",
      description: "Support digital literacy sessions in local schools.",
      hours_total: 40
    },
    {
      id: "com-002",
      title: "Sports Community Festival",
      organization: "Quito Sports Dept.",
      description: "Volunteer in event logistics and attendee assistance.",
      hours_total: 60
    },
    {
      id: "com-003",
      title: "Environmental Cleanup",
      organization: "Green Quito",
      description: "Community cleanup + recycling awareness campaign.",
      hours_total: 32
    }
  ];
}

export function mockInternshipOffers() {
  return [
    {
      id: "int-101",
      company: "TechNova",
      position: "Junior Support Intern",
      description: "Ticket triage, documentation, and basic troubleshooting.",
      hours_total: 120
    },
    {
      id: "int-102",
      company: "DataQuito",
      position: "Data Assistant Intern",
      description: "Basic ETL tasks and dashboard updates.",
      hours_total: 160
    },
    {
      id: "int-103",
      company: "CloudAndes",
      position: "Cloud Ops Intern",
      description: "Monitoring, log review, and infrastructure support.",
      hours_total: 200
    }
  ];
}

export function mockEnglishCourses() {
  return [
    { id: "eng-a1", name: "English A1", modality: "Online", duration_weeks: 8 },
    { id: "eng-a2", name: "English A2", modality: "On-site", duration_weeks: 10 },
    { id: "eng-b1", name: "English B1", modality: "Hybrid", duration_weeks: 12 }
  ];
}

// Progress payloads mimic typical microservice shapes.
export function mockHoursProgress(studentId: number, requiredHours: number) {
  const total = seededInt(1000 + studentId, Math.floor(requiredHours * 0.15), Math.floor(requiredHours * 1.1));
  const missing = Math.max(0, requiredHours - total);
  return {
    student_id: studentId,
    total_hours: total,
    required_hours: requiredHours,
    missing_hours: missing,
    completed: total >= requiredHours
  };
}

export function mockEnglishLevel(studentId: number) {
  const levels = ["A1.1", "A1.2", "A2.1", "A2.2", "B1.1", "B1.2"];
  return {
    student_id: studentId,
    level: levels[seededInt(2000 + studentId, 0, levels.length - 1)]
  };
}

export function mockAcademicProfile(studentId: number) {
  return {
    student_id: studentId,
    major: "Software Engineering",
    credits_earned: seededInt(3000 + studentId, 140, 220),
    credits_required: 240,
    status: "ACTIVE"
  };
}

export function mockLibraryClearance(studentId: number) {
  const blocked = seededInt(4000 + studentId, 0, 10) > 7;
  return {
    student_id: studentId,
    clearance: !blocked,
    blocking_reason: blocked ? "Pending return: 1 item" : null,
    certificate_available: !blocked,
    certificate_name: !blocked ? `library_clearance_${studentId}.pdf` : null
  };
}

export function mockFinanceClearance(studentId: number) {
  const debt = seededInt(5000 + studentId, 0, 10) > 6 ? seededInt(5001 + studentId, 10, 80) : 0;
  return {
    student_id: studentId,
    clearance: debt === 0,
    debt_usd: debt,
    details: debt === 0 ? [] : [{ concept: "Academic fee", amount_usd: debt }]
  };
}

export function mockNotifications(studentId: number) {
  return [
    {
      id: `n-${studentId}-01`,
      title: "Welcome to GradPulse",
      message: "Track your graduation requirements in one dashboard.",
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      type: "INFO"
    },
    {
      id: `n-${studentId}-02`,
      title: "Community Programs",
      message: "Explore new community programs available this month.",
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
      type: "ACTION"
    }
  ];
}

export function mockPaymentReceipt(studentId: number, amountUsd: number) {
  const tx = `${seededInt(6000 + studentId, 100000, 999999)}-${seededInt(6001 + studentId, 1000, 9999)}`;
  return {
    receipt_id: `rcpt-${tx}`,
    transaction_id: tx,
    status: "PAID",
    method: "PayPal (Sandbox)",
    amount_usd: amountUsd,
    student_id: studentId,
    created_at: new Date().toISOString()
  };
}
