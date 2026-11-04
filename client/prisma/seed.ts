import {
  Semester,
  YearLevel,
  AdmissionStatus,
  Speciality,
} from "../src/generated/client";
import { prisma } from "../src/lib/prisma";

// --- Helper Functions ---
const randomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const randomFloat = (min: number, max: number) =>
  parseFloat((Math.random() * (max - min) + min).toFixed(2));
const randomElement = <T>(arr: T[]): T =>
  arr[Math.floor(Math.random() * arr.length)];

function getHistoricalAcademicYear(baseYear: string, offset: number): string {
  const [start, end] = baseYear.split("-").map(Number);
  return `${start + offset}-${end + offset}`;
}

const LMD_PROGRESSION = [
  YearLevel.L1,
  YearLevel.L2,
  YearLevel.L3,
  YearLevel.M1,
  YearLevel.M2,
];

async function main() {
  console.log(
    "🌱 Starting complete LMD database seeding with deep academic histories...",
  );

  await prisma.annualAverage.deleteMany();
  await prisma.transcript.deleteMany();
  await prisma.enrollment.deleteMany();
  await prisma.course.deleteMany();
  await prisma.student.deleteMany();

  console.log("🧹 Cleaned up all old data structures.");

  console.log("📚 Populating academic courses...");
  const coursesData = [
    // L1 Courses
    {
      code: "MATH101",
      name: "Analysis 1",
      credits: 9,
      coefficient: 3.0,
      semester: Semester.S1,
      yearLevel: YearLevel.L1,
    },
    {
      code: "CS101",
      name: "Algorithms 1",
      credits: 9,
      coefficient: 3.0,
      semester: Semester.S1,
      yearLevel: YearLevel.L1,
    },
    {
      code: "ST101",
      name: "Probability & Stats",
      credits: 6,
      coefficient: 2.0,
      semester: Semester.S1,
      yearLevel: YearLevel.L1,
    },
    {
      code: "ENG101",
      name: "Technical English 1",
      credits: 6,
      coefficient: 1.0,
      semester: Semester.S1,
      yearLevel: YearLevel.L1,
    },
    {
      code: "MATH102",
      name: "Algebra 1",
      credits: 9,
      coefficient: 3.0,
      semester: Semester.S2,
      yearLevel: YearLevel.L1,
    },
    {
      code: "CS102",
      name: "Algorithms 2",
      credits: 9,
      coefficient: 3.0,
      semester: Semester.S2,
      yearLevel: YearLevel.L1,
    },
    {
      code: "ST102",
      name: "Information Systems",
      credits: 6,
      coefficient: 2.0,
      semester: Semester.S2,
      yearLevel: YearLevel.L1,
    },
    {
      code: "ENG102",
      name: "Technical English 2",
      credits: 6,
      coefficient: 1.0,
      semester: Semester.S2,
      yearLevel: YearLevel.L1,
    },

    // L2 Courses
    {
      code: "CS201",
      name: "Database Systems (BD)",
      credits: 8,
      coefficient: 3.0,
      semester: Semester.S3,
      yearLevel: YearLevel.L2,
    },
    {
      code: "CS202",
      name: "Operating Systems 1",
      credits: 8,
      coefficient: 3.0,
      semester: Semester.S3,
      yearLevel: YearLevel.L2,
    },
    {
      code: "MATH201",
      name: "Numerical Analysis",
      credits: 8,
      coefficient: 2.0,
      semester: Semester.S3,
      yearLevel: YearLevel.L2,
    },
    {
      code: "CS205",
      name: "Graph Theory",
      credits: 6,
      coefficient: 2.0,
      semester: Semester.S3,
      yearLevel: YearLevel.L2,
    },
    {
      code: "CS203",
      name: "Web Development",
      credits: 10,
      coefficient: 3.0,
      semester: Semester.S4,
      yearLevel: YearLevel.L2,
    },
    {
      code: "CS204",
      name: "Object-Oriented Prog (OOP)",
      credits: 10,
      coefficient: 3.0,
      semester: Semester.S4,
      yearLevel: YearLevel.L2,
    },
    {
      code: "CS206",
      name: "Computer Networks",
      credits: 10,
      coefficient: 2.0,
      semester: Semester.S4,
      yearLevel: YearLevel.L2,
    },

    // L3 Courses
    {
      code: "CS301",
      name: "Software Engineering",
      credits: 10,
      coefficient: 3.0,
      semester: Semester.S5,
      yearLevel: YearLevel.L3,
    },
    {
      code: "CS302",
      name: "Information Security",
      credits: 10,
      coefficient: 2.0,
      semester: Semester.S5,
      yearLevel: YearLevel.L3,
    },
    {
      code: "CS305",
      name: "Artificial Intelligence",
      credits: 10,
      coefficient: 3.0,
      semester: Semester.S5,
      yearLevel: YearLevel.L3,
    },
    {
      code: "CS303",
      name: "Distributed Systems & Cloud",
      credits: 10,
      coefficient: 3.0,
      semester: Semester.S6,
      yearLevel: YearLevel.L3,
    },
    {
      code: "PFE300",
      name: "Graduation Project (PFE)",
      credits: 20,
      coefficient: 5.0,
      semester: Semester.S6,
      yearLevel: YearLevel.L3,
    },

    // M1 Courses
    {
      code: "CS401",
      name: "Advanced Database Architectures",
      credits: 10,
      coefficient: 3.0,
      semester: Semester.S1,
      yearLevel: YearLevel.M1,
    },
    {
      code: "CS402",
      name: "Applied Cryptography & Network Security",
      credits: 10,
      coefficient: 3.0,
      semester: Semester.S1,
      yearLevel: YearLevel.M1,
    },
    {
      code: "CS403",
      name: "Operations Research & Optimization",
      credits: 10,
      coefficient: 2.0,
      semester: Semester.S1,
      yearLevel: YearLevel.M1,
    },
    {
      code: "CS404",
      name: "Distributed Algorithms",
      credits: 10,
      coefficient: 3.0,
      semester: Semester.S2,
      yearLevel: YearLevel.M1,
    },
    {
      code: "CS405",
      name: "Machine Learning Foundations",
      credits: 10,
      coefficient: 3.0,
      semester: Semester.S2,
      yearLevel: YearLevel.M1,
    },
    {
      code: "CS406",
      name: "Mobile App Development",
      credits: 10,
      coefficient: 2.0,
      semester: Semester.S2,
      yearLevel: YearLevel.M1,
    },

    // M2 Courses
    {
      code: "CS501",
      name: "Cloud Native Computing & DevOps",
      credits: 10,
      coefficient: 3.0,
      semester: Semester.S3,
      yearLevel: YearLevel.M2,
    },
    {
      code: "CS502",
      name: "Blockchain & Decentralized Systems",
      credits: 10,
      coefficient: 3.0,
      semester: Semester.S3,
      yearLevel: YearLevel.M2,
    },
    {
      code: "CS503",
      name: "Big Data & Analytics",
      credits: 10,
      coefficient: 2.0,
      semester: Semester.S3,
      yearLevel: YearLevel.M2,
    },
    {
      code: "PFE500",
      name: "Master Thesis / Graduation Project",
      credits: 30,
      coefficient: 6.0,
      semester: Semester.S4,
      yearLevel: YearLevel.M2,
    },
  ];

  await prisma.course.createMany({ data: coursesData });
  const dbCourses = await prisma.course.findMany();
  console.log(`✅ Tracked ${dbCourses.length} structured courses in database.`);

  console.log(
    "🧑‍🎓 Provisioning 20 student profiles and computing LMD histories...",
  );

  const firstNames = [
    "Amine",
    "Sarah",
    "Anis",
    "Lina",
    "Mehdi",
    "Fatima",
    "Yassine",
    "Ines",
    "Karim",
    "Meriem",
    "Walid",
    "Rania",
    "Ayoub",
    "Khadija",
    "Tarek",
    "Nour",
    "Sami",
    "Yasmine",
    "Ryad",
    "Aya",
  ];
  const lastNames = [
    "Rahmani",
    "Benali",
    "Mansouri",
    "Saidi",
    "Brahimi",
    "Toumi",
    "Haddad",
    "Khelil",
    "Zerrouki",
    "Bouzid",
    "Cherif",
    "Ziani",
    "Bennacer",
    "Yahiaoui",
    "Djellal",
    "Mahmoudi",
    "Slimani",
    "Hamzaoui",
    "Belkacem",
    "Othmani",
  ];

  const specialities = [
    Speciality.ISIL,
    Speciality.SIQ,
    Speciality.AI,
    Speciality.Reseau,
  ];
  const BASE_ACADEMIC_YEAR = "2025-2026";

  for (let i = 0; i < 20; i++) {
    const fName = firstNames[i];
    const lName = lastNames[i];
    const currentYearLevel = randomElement(LMD_PROGRESSION);
    const spec = randomElement(specialities);

    const student = await prisma.student.create({
      data: {
        matricule: `202531000${(i + 1).toString().padStart(3, "0")}`,
        firstName: fName,
        lastName: lName,
        email: `${fName.toLowerCase()}.${lName.toLowerCase()}${i}@univ.dz`,
        currentYear: currentYearLevel,
        speciality: spec,
      },
    });

    const currentLevelIndex = LMD_PROGRESSION.indexOf(currentYearLevel);

    for (let j = 0; j <= currentLevelIndex; j++) {
      const activeHistoryLevel = LMD_PROGRESSION[j];
      const isPastYear = j < currentLevelIndex;

      const yearOffset = j - currentLevelIndex;
      const loopAcademicYear = getHistoricalAcademicYear(
        BASE_ACADEMIC_YEAR,
        yearOffset,
      );

      const levelCourses = dbCourses.filter(
        (c) => c.yearLevel === activeHistoryLevel,
      );

      let totalYearCoeff = 0;
      let totalYearWeightedScore = 0;
      let totalYearCredits = 0;
      const semesterData: Record<
        string,
        { totalCoeff: number; totalScore: number; earnedCredits: number }
      > = {};

      for (const course of levelCourses) {
        let cc: number | null = null;
        let exam: number | null = null;
        let finalNote: number;

        // NEW LOGIC: PFE Module logic (Single defense grade, no CC/Exam)
        if (course.code.startsWith("PFE")) {
          finalNote = isPastYear ? randomFloat(12, 18) : randomFloat(8, 18);
        } else {
          // Standard Academic Course Logic
          cc = isPastYear ? randomFloat(10, 18) : randomFloat(5, 18);
          exam = isPastYear ? randomFloat(10, 18) : randomFloat(4, 18);
          finalNote = parseFloat((cc * 0.4 + exam * 0.6).toFixed(2));
        }

        const isPassed = finalNote >= 10;

        await prisma.enrollment.create({
          data: {
            studentId: student.id,
            courseId: course.id,
            academicYear: loopAcademicYear,
            ccNote: cc, // Will be null for PFE
            examNote: exam, // Will be null for PFE
            finalNote: finalNote,
            isPassed: isPassed,
          },
        });

        if (!semesterData[course.semester]) {
          semesterData[course.semester] = {
            totalCoeff: 0,
            totalScore: 0,
            earnedCredits: 0,
          };
        }

        semesterData[course.semester].totalCoeff += course.coefficient;
        semesterData[course.semester].totalScore +=
          finalNote * course.coefficient;

        if (isPassed) {
          semesterData[course.semester].earnedCredits += course.credits;
          totalYearCredits += course.credits;
        }

        totalYearCoeff += course.coefficient;
        totalYearWeightedScore += finalNote * course.coefficient;
      }

      for (const [semester, data] of Object.entries(semesterData)) {
        const semAverage = parseFloat(
          (data.totalScore / data.totalCoeff).toFixed(2),
        );

        await prisma.transcript.create({
          data: {
            studentId: student.id,
            semester: semester as Semester,
            yearLevel: activeHistoryLevel,
            academicYear: loopAcademicYear,
            average: semAverage,
            totalCredits: semAverage >= 10 ? 30 : data.earnedCredits,
          },
        });
      }

      const annualAverage = parseFloat(
        (totalYearWeightedScore / totalYearCoeff).toFixed(2),
      );
      let status = AdmissionStatus.AJOURNE;

      if (annualAverage >= 10) {
        status = AdmissionStatus.ADMIS_MOYENNE;
        totalYearCredits = 60;
      } else if (totalYearCredits >= 30) {
        status = AdmissionStatus.ADMIS_CREDITS;
      }

      await prisma.annualAverage.create({
        data: {
          studentId: student.id,
          yearLevel: activeHistoryLevel,
          academicYear: loopAcademicYear,
          average: annualAverage,
          totalCredits: totalYearCredits,
          status: status,
        },
      });
    }
  }

  console.log(
    "🎉 Database seeding completed! 20 students generated with accurate PFE defense grading.",
  );
}

main()
  .catch((e) => {
    console.error("❌ Seeding runtime failure:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
