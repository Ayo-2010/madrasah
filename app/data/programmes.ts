import type { Programme } from '~/types/programme'

/**
 * Programme content.
 *
 * Institution owners should confirm every statement below, especially entry
 * requirements, class arrangements and age guidance, before launch.
 */
export const programmes: Programme[] = [
  {
    slug: 'quran-memorisation',
    title: 'Qur\'an Memorisation',
    shortTitle: 'Memorisation',
    icon: 'i-lucide-book-marked',
    tagline: 'A steady, supported path to carrying the Qur’an in the heart.',
    description:
      'Memorisation is built lesson by lesson, with new portions balanced against consistent revision. Students are guided by a teacher who knows their pace, their strengths and the areas that need attention.',
    learnerGroup: 'Children, teenagers and adults',
    ages: 'Open to all ages, with placement based on reading readiness',
    level: 'Readiness-based placement',
    format: 'One-to-one and small-group arrangements, subject to availability',
    schedule: null,
    objectives: [
      'Build a consistent, realistic memorisation routine.',
      'Memorise with correct recitation and careful revision.',
      'Strengthen retention through structured review.',
      'Develop care and adab when reciting and handling the Qur’an.',
      'Recite memorised portions confidently to a teacher.',
      'Understand the meaning of selected passages as learning progresses.',
    ],
    topics: [
      {
        title: 'New memorisation',
        description:
          'Short, carefully prepared portions are committed to memory with the teacher, one step at a time.',
      },
      {
        title: 'Structured revision',
        description:
          'A rotating review cycle keeps recent and older portions active rather than letting them fade.',
      },
      {
        title: 'Recitation accuracy',
        description:
          'Pronunciation, recall and fluency are corrected gently in every lesson.',
      },
      {
        title: 'Reflection on meaning',
        description:
          'Students are introduced to the meaning of what they memorise, according to their level.',
      },
      {
        title: 'Adab and responsibility',
        description:
          'Lessons encourage consistency, humility and respect for the Book of Allah.',
      },
    ],
    methodology: [
      'An initial conversation and recitation check help the teacher understand the student’s starting point.',
      'A realistic portion is agreed, with daily or weekly practice clearly explained.',
      'Each lesson combines new memorisation, recent revision and older review.',
      'Progress is recorded and discussed with the student, and with parents or guardians where appropriate.',
    ],
    entryRequirements: [
      'Basic ability to read Qur’anic Arabic; complete beginners may begin with Tajweed and recitation first.',
      'A realistic commitment to revision between lessons.',
      'A placement conversation with the teacher before starting.',
    ],
    materials: [
      'A copy of the mus’haf; the Madrasah can advise on a suitable edition.',
      'A notebook or revision record, which the teacher may provide.',
      'A quiet place to practise between lessons.',
    ],
    faqs: [
      {
        question: 'How long does it take to complete memorisation?',
        answer:
          'There is no fixed timeframe. Progress depends on the student’s starting point, the time given to revision and individual circumstances. The teacher will discuss a realistic pace rather than promise a completion date.',
      },
      {
        question: 'Can adults join the memorisation programme?',
        answer:
          'Yes. The programme is open to teenagers and adults as well as children. Placement is based on reading readiness and the time the student can commit to revision.',
      },
      {
        question: 'What happens if a student falls behind?',
        answer:
          'The teacher reviews the revision schedule and adjusts the plan where needed. The aim is consistent, retained memorisation rather than rushing through new portions.',
      },
      {
        question: 'Are memorisation lessons available online?',
        answer:
          'Online arrangements depend on the programme and current availability. Please contact the administration to confirm what is possible for your preferred schedule.',
      },
    ],
    featured: true,
    whatsappMessage:
      'Assalamu Alaikum. I would like to enquire about your Qur\'an memorisation programme.',
  },
  {
    slug: 'tajweed',
    title: 'Tajweed & Qur\'an Recitation',
    shortTitle: 'Tajweed',
    icon: 'i-lucide-audio-lines',
    tagline: 'Give every letter its right and its due, with patient practice.',
    description:
      'Tajweed is the art of reciting the Qur’an correctly. Lessons move from clear pronunciation to confident recitation, with gentle correction and plenty of guided practice.',
    learnerGroup: 'Beginners, returning learners and improvers',
    ages: 'Children, teenagers and adults',
    level: 'From beginner to refinement',
    format: 'Small-group and one-to-one arrangements, subject to availability',
    schedule: null,
    objectives: [
      'Pronounce Arabic letters accurately and distinguish similar sounds.',
      'Apply the principal rules of Tajweed during recitation.',
      'Recognise and correct common recitation mistakes.',
      'Read with greater fluency, rhythm and confidence.',
      'Build a regular practice habit with guided feedback.',
    ],
    topics: [
      {
        title: 'Articulation points',
        description:
          'Where each letter is produced and how to distinguish letters that sound alike.',
      },
      {
        title: 'Characteristics of letters',
        description:
          'The qualities that give letters their correct weight, clarity and softness.',
      },
      {
        title: 'Core Tajweed rules',
        description:
          'Rules of noon and meem, elongation, qalqalah and other applied recitation principles.',
      },
      {
        title: 'Common mistakes',
        description:
          'Identifying recurring errors and replacing them with steady, correct habits.',
      },
      {
        title: 'Guided recitation',
        description:
          'Reading aloud to the teacher and applying new rules in real portions of the Qur’an.',
      },
    ],
    methodology: [
      'A short recitation check identifies strengths and the most useful starting point.',
      'Each lesson introduces one clear rule or correction, followed by guided practice.',
      'Students read aloud and receive individual correction.',
      'Practice between lessons is set and revisited at the start of the next class.',
    ],
    entryRequirements: [
      'No prior Tajweed study is required for the beginner level.',
      'Students should be willing to read aloud and practise between lessons.',
      'A short placement conversation helps the teacher choose the right group.',
    ],
    materials: [
      'A copy of the mus’haf.',
      'A notebook for rules and corrections.',
      'A recording device is optional for personal practice.',
    ],
    faqs: [
      {
        question: 'Do I need to read Arabic before joining?',
        answer:
          'Complete beginners can be supported with letter recognition and reading foundations. Please tell us your current level when you enquire so the teacher can advise on the best starting point.',
      },
      {
        question: 'Is this suitable for children?',
        answer:
          'Yes, Tajweed and recitation classes are offered for children as well as teenagers and adults. Group placement takes age and reading level into account.',
      },
      {
        question: 'Will I be corrected in front of others?',
        answer:
          'Correction is a normal and respectful part of learning. Teachers aim to give feedback kindly and in a way that helps every student improve without embarrassment.',
      },
    ],
    featured: true,
    whatsappMessage:
      'Assalamu Alaikum. Please provide more information about your Tajweed classes.',
  },
  {
    slug: 'arabic',
    title: 'Arabic Language',
    shortTitle: 'Arabic',
    icon: 'i-lucide-languages',
    tagline: 'Understand the language of the Qur’an, step by step.',
    description:
      'A structured introduction to Qur’anic and classical Arabic. Students build reading confidence, vocabulary and grammar so that the language of the Qur’an becomes more familiar and accessible.',
    learnerGroup: 'Children, teenagers and adults',
    ages: 'Age-appropriate groups from older children to adults',
    level: 'Beginner to intermediate',
    format: 'Group and individual arrangements, subject to availability',
    schedule: null,
    objectives: [
      'Read and write Arabic with confidence.',
      'Build a practical Qur’anic vocabulary.',
      'Understand essential grammar and word patterns.',
      'Translate short, straightforward Qur’anic passages with support.',
      'Develop a habit of reading Arabic beyond the classroom.',
    ],
    topics: [
      {
        title: 'Letters and sounds',
        description:
          'Reading, writing and pronunciation for students beginning their Arabic journey.',
      },
      {
        title: 'Vocabulary',
        description:
          'High-frequency Qur’anic words introduced in context and revisited regularly.',
      },
      {
        title: 'Grammar and word patterns',
        description:
          'The building blocks of Arabic, explained clearly and applied to real sentences.',
      },
      {
        title: 'Reading Qur’anic text',
        description:
          'Guided reading of short passages with attention to meaning and structure.',
      },
      {
        title: 'Writing and composition',
        description:
          'Simple written exercises that consolidate new vocabulary and grammar.',
      },
    ],
    methodology: [
      'Placement takes account of prior Arabic study and reading confidence.',
      'New language is introduced in small, connected steps.',
      'Lessons combine explanation, reading aloud, written practice and review.',
      'Progress is checked through short exercises rather than one final test.',
    ],
    entryRequirements: [
      'No prior Arabic study is required for the beginner level.',
      'Students should be able to read the English alphabet confidently.',
      'A placement conversation helps place older students at the right level.',
    ],
    materials: [
      'The programme textbook or workbook advised by the teacher.',
      'A notebook and pen.',
      'A copy of the mus’haf for reading practice where appropriate.',
    ],
    faqs: [
      {
        question: 'Is this Modern Standard Arabic or Qur’anic Arabic?',
        answer:
          'The programme focuses on the classical and Qur’anic Arabic needed to read and understand the Qur’an. Please speak to the administration about the balance of reading, writing and conversation at your level.',
      },
      {
        question: 'Can young children join?',
        answer:
          'Arabic classes are arranged in age-appropriate groups. Younger learners usually begin with reading and letter recognition; the administration will advise what is suitable.',
      },
      {
        question: 'How much study is expected between lessons?',
        answer:
          'Short, consistent practice is more useful than occasional long sessions. The teacher will set manageable review work and explain it clearly.',
      },
    ],
    featured: true,
    whatsappMessage:
      'Assalamu Alaikum. I would like to enquire about your Arabic language classes.',
  },
  {
    slug: 'islamic-studies',
    title: 'Islamic Studies',
    shortTitle: 'Islamic Studies',
    icon: 'i-lucide-book-open-text',
    tagline: 'Sound foundations in belief, worship and good character.',
    description:
      'A clear, structured introduction to the essentials of Islamic belief and practice. Students learn the foundations of their religion with context, care and space to ask questions.',
    learnerGroup: 'Teenagers and adults',
    ages: 'Teenagers and adults; younger learners are served by the children’s programme',
    level: 'Foundational, with room to go deeper',
    format: 'Group study with discussion, subject to availability',
    schedule: null,
    objectives: [
      'Understand the core beliefs of Islam.',
      'Learn the essentials of purification and prayer.',
      'Become familiar with the life and character of the Prophet ﷺ.',
      'Develop sound manners and a thoughtful approach to practice.',
      'Connect knowledge to daily life and community responsibility.',
    ],
    topics: [
      {
        title: 'Belief and creed',
        description:
          'The foundations of Islamic belief, explained with clarity and care.',
      },
      {
        title: 'Worship in practice',
        description:
          'The essentials of purification and prayer, with attention to common questions.',
      },
      {
        title: 'The Prophet’s life',
        description:
          'Key events and lessons from the seerah, and what they teach about character.',
      },
      {
        title: 'Hadith and guidance',
        description:
          'Selected authentic narrations studied with context and practical application.',
      },
      {
        title: 'Character and conduct',
        description:
          'How Islamic knowledge shapes the way we treat family, neighbours and community.',
      },
    ],
    methodology: [
      'Lessons begin with the foundations and build in a logical sequence.',
      'Clear explanations are paired with discussion and space for questions.',
      'Students are encouraged to apply what they learn in daily practice.',
      'The teacher reviews earlier material so understanding is retained.',
    ],
    entryRequirements: [
      'No prior formal Islamic studies are required.',
      'Students should come ready to listen, reflect and ask questions respectfully.',
      'A placement conversation helps the teacher pitch the class at the right level.',
    ],
    materials: [
      'A notebook and pen for notes and questions.',
      'The course text or reading list advised by the teacher.',
      'A copy of the mus’haf for referenced passages.',
    ],
    faqs: [
      {
        question: 'Which curriculum or scholarly framework is followed?',
        answer:
          'The specific curriculum and scholarly references are confirmed directly with the administration. Please ask if you would like details before enrolling.',
      },
      {
        question: 'Can complete beginners join?',
        answer:
          'Yes. The foundational level assumes no prior formal study. Students with more background can be advised on a suitable class.',
      },
      {
        question: 'Are classes suitable for teenagers?',
        answer:
          'Teenagers are welcome, and classes may be grouped by age and level where numbers allow. Please enquire about current groupings.',
      },
    ],
    featured: true,
    whatsappMessage:
      'Assalamu Alaikum. I would like to enquire about your Islamic studies programme.',
  },
  {
    slug: 'children',
    title: 'Children\'s Islamic Education',
    shortTitle: 'Children\'s Classes',
    icon: 'i-lucide-sprout',
    tagline: 'A gentle, joyful foundation for younger learners.',
    description:
      'A well-ordered introduction to Islam for younger children. Lessons combine Qur’an reading, short surahs, daily du’as, prophetic stories and good manners in a calm and encouraging setting.',
    learnerGroup: 'Younger learners',
    ages: 'Approximately ages 5–11, subject to placement',
    level: 'Foundation',
    format: 'Age-grouped classes with teacher guidance, subject to availability',
    schedule: null,
    objectives: [
      'Recognise Arabic letters and begin reading the Qur’an.',
      'Memorise short surahs and everyday du’as with understanding.',
      'Learn the basic steps of prayer and purification.',
      'Enjoy prophetic stories and the lessons they carry.',
      'Practise good manners at home, in class and in the community.',
    ],
    topics: [
      {
        title: 'Qur’an reading',
        description:
          'Letter recognition and early reading, at a pace that suits each child.',
      },
      {
        title: 'Short surahs and du’as',
        description:
          'Memorisation with simple explanations and regular, encouraging review.',
      },
      {
        title: 'Prayer and purity',
        description:
          'Age-appropriate introduction to the practical essentials of worship.',
      },
      {
        title: 'Stories of the prophets',
        description:
          'Timeless lessons about trust, patience, courage and good character.',
      },
      {
        title: 'Manners and community',
        description:
          'Kindness, honesty, respect for parents and care for others, taught through everyday examples.',
      },
    ],
    methodology: [
      'A friendly conversation with the parent or guardian establishes the child’s age, experience and needs.',
      'Children are placed in a group that suits their age and learning level.',
      'Short, engaging activities keep lessons focused and age-appropriate.',
      'Parents and guardians receive clear guidance on practice at home and how to ask about progress.',
    ],
    entryRequirements: [
      'Children are usually between 5 and 11 years old; placement is discussed with the parent or guardian.',
      'No prior Qur’an or Islamic studies is needed.',
      'A parent or guardian should complete the initial enquiry.',
    ],
    materials: [
      'A children’s Qur’an reading book as advised by the teacher.',
      'A notebook, pencil case and colouring pencils.',
      'A named water bottle.',
    ],
    faqs: [
      {
        question: 'How are children grouped?',
        answer:
          'Grouping considers age, reading level and prior experience. The administration will discuss the most suitable class with the parent or guardian.',
      },
      {
        question: 'How do parents hear about progress?',
        answer:
          'Teachers provide feedback through agreed updates and conversations. Please ask about the current arrangements when you enquire.',
      },
      {
        question: 'Do children need to bring anything?',
        answer:
          'A basic reading book, notebook and pencil case are usually enough. The teacher will confirm any programme-specific materials before classes begin.',
      },
    ],
    featured: true,
    whatsappMessage:
      'Assalamu Alaikum. I would like to enquire about Islamic education classes for children.',
  },
]

export function getProgramme(slug: string): Programme | undefined {
  return programmes.find(programme => programme.slug === slug)
}

export function getRelatedProgrammes(slug: string, limit = 3): Programme[] {
  return programmes.filter(programme => programme.slug !== slug).slice(0, limit)
}
