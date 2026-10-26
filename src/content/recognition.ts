import type { Award, Education } from './schema';

export const awards: Award[] = [
  { title: 'Runner-up', detail: 'Covasant AI Hackathon · Codescrybe, with Team Repolens', year: '2025', project: 'codescrybe' },
  { title: 'Round 3 shortlist', detail: 'Flipkart Grid', year: '2026' },
  { title: 'Top 72 of 1,000+ teams', detail: 'Odoo Hackathon virtual round · FleetFlow, solo', year: '2026', project: 'fleetflow' },
  { title: 'Winner', detail: 'Campus Utility App Challenge · GPA Genie', year: '2024', project: 'gpa-genie' },
  { title: 'Honourable mention', detail: 'Code Cubicle 2.0 Hackathon · team lead', year: '2024' },
  { title: 'Selected delegate', detail: 'National Wellbeing Conclave, IIT Hyderabad' },
  { title: 'AIR ~43,000', detail: 'JEE Main, among ~11 lakh candidates', year: '2023' },
];

export const education: Education[] = [
  {
    school: 'Indian Institute of Information Technology, Raichur',
    credential: 'B.Tech, Computer Science and Engineering',
    period: { start: '2023-08', end: '2027-05' },
    location: 'Raichur, Karnataka',
    detail: [
      'Final year. My COPIOUS internship counts as the programme’s credit-bearing semester internship.',
      'Coursework: DSA, operating systems, DBMS, networks, compiler design, machine learning, deep learning, generative AI, cybersecurity.',
    ],
  },
];
