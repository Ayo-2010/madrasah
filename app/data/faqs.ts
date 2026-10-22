import type { Faq } from '~/types/faq'

/**
 * Frequently asked questions.
 *
 * Answers reflect the editable configuration in app/config/madrasah.ts. Review
 * every answer against the institution's approved information before launch.
 */
export const faqs: Faq[] = [
  {
    id: 'programmes-offered',
    category: 'Programmes',
    question: 'What programmes does the Madrasah offer?',
    answer:
      'We offer Qur’an memorisation, Tajweed and Qur’an recitation, Arabic language, Islamic studies, and Islamic education for children. Each programme has its own page with learning objectives, topics and entry guidance.',
    featured: true,
  },
  {
    id: 'age-groups',
    category: 'Admissions',
    question: 'Which age groups can enrol?',
    answer:
      'Children, teenagers and adults are welcome. Children’s classes are usually arranged for younger learners, while teenagers and adults are placed according to their level and programme. Please tell us the student’s age group when you enquire so we can advise on suitable classes.',
    featured: true,
  },
  {
    id: 'how-to-register',
    category: 'Admissions',
    question: 'How do I register a student?',
    answer:
      'Begin by contacting the administration on WhatsApp. We will discuss the student’s age, goals and preferred programme, then explain the available arrangements and the next steps for registration. Places are confirmed individually; sending an enquiry does not reserve a place.',
    featured: true,
  },
  {
    id: 'enquiry-information',
    category: 'Admissions',
    question: 'What information do you need for an initial enquiry?',
    answer:
      'A parent or guardian name, the student’s age group, the programme of interest and whether you are considering in-person or online learning is enough to begin. Please do not send sensitive documents or a child’s full personal details until the administration asks for them through an agreed channel.',
    featured: false,
  },
  {
    id: 'fees',
    category: 'Fees',
    question: 'What are the fees?',
    answer:
      'Programme fees depend on the programme, class format and number of sessions. Current fees are provided directly by the administration and are not published on this website. Please contact us on WhatsApp for the approved fee information for your chosen programme.',
    featured: true,
  },
  {
    id: 'payment',
    category: 'Fees',
    question: 'How and when are fees paid?',
    answer:
      'Payment arrangements are confirmed with the administration as part of registration. Please ask for the current written information before making any payment, and use only the payment details provided through the Madrasah’s official channel.',
    featured: false,
  },
  {
    id: 'class-times',
    category: 'Class schedules',
    question: 'What are the class days and times?',
    answer:
      'Lesson times are arranged around the programme, the student’s level and current availability. A timetable is discussed after your enquiry and confirmed before classes begin.',
    featured: true,
  },
  {
    id: 'online-or-in-person',
    category: 'Online learning',
    question: 'Are classes held online or in person?',
    answer:
      'Learning arrangements vary by programme and availability. Some classes may be offered online where the format suits the subject; others are better supported in person. Please tell us your preference when you enquire and we will confirm what is currently possible.',
    featured: true,
  },
  {
    id: 'beginners',
    category: 'Programmes',
    question: 'Can complete beginners join?',
    answer:
      'Yes, beginners are welcome in Arabic, Islamic studies and Tajweed. For Qur’an memorisation, the teacher will first check reading readiness and may recommend building recitation skills before starting a memorisation plan.',
    featured: false,
  },
  {
    id: 'adults',
    category: 'Admissions',
    question: 'Can adults study at the Madrasah?',
    answer:
      'Yes. Adults are welcome in the Qur’an, Tajweed, Arabic and Islamic studies programmes. Adult classes are arranged with the same care for a supportive, respectful learning environment.',
    featured: false,
  },
  {
    id: 'materials',
    category: 'Learning materials',
    question: 'What materials should a student bring?',
    answer:
      'Most lessons require a copy of the Qur’an, a notebook and a pen. Children may also need a pencil case and a named water bottle. The teacher will confirm any programme-specific books or materials before the first lesson.',
    featured: false,
  },
  {
    id: 'progress',
    category: 'Student progress',
    question: 'How is student progress monitored?',
    answer:
      'Teachers review recitation, revision and classwork regularly. Progress conversations are arranged with the student, and with parents or guardians where appropriate. The exact reporting arrangements are confirmed when classes begin.',
    featured: true,
  },
  {
    id: 'parent-updates',
    category: 'Student progress',
    question: 'Will parents receive updates about their child?',
    answer:
      'Yes, communication with parents and guardians is treated as part of the learning partnership. Please ask about the current feedback arrangements for your child’s class during the admissions conversation.',
    featured: false,
  },
  {
    id: 'location',
    category: 'Contact and location',
    question: 'Where is the Madrasah located?',
    answer:
      'Venue details and directions are shared with enquirers once class arrangements are being discussed. Please contact the administration on WhatsApp and we will provide the current location information for your chosen programme.',
    featured: false,
  },
  {
    id: 'response-time',
    category: 'Contact and location',
    question: 'How can I speak to the administration?',
    answer:
      'WhatsApp is the quickest way to reach us. Messages are reviewed during administrative hours, and response times may vary. If your enquiry is urgent, please say so clearly in your first message.',
    featured: false,
  },
]

export const featuredFaqs = faqs.filter(faq => faq.featured)
