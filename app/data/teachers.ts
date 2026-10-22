import type { Teacher } from '~/types/teacher'

/**
 * Teaching team.
 *
 * No names, qualifications or biographies are published until the individual
 * teacher has approved them. Replace `name`, `bio`, `qualifications` and
 * `portrait` together, then set `profileStatus` to 'published'.
 */
export const teachers: Teacher[] = [
  {
    id: 'quran-hifz',
    name: null,
    role: 'Qur\'an & Hifz Teacher',
    specialisms: ['Qur’an memorisation', 'Recitation', 'Revision planning'],
    focus:
      'Guides students through a steady memorisation routine, balancing new portions with regular revision and individual correction.',
    bio: null,
    qualifications: [],
    portrait: null,
    profileStatus: 'pending',
  },
  {
    id: 'tajweed',
    name: null,
    role: 'Tajweed & Recitation Teacher',
    specialisms: ['Tajweed', 'Articulation points', 'Recitation fluency'],
    focus:
      'Works from clear pronunciation towards confident recitation, correcting common mistakes with patience and plenty of guided practice.',
    bio: null,
    qualifications: [],
    portrait: null,
    profileStatus: 'pending',
  },
  {
    id: 'arabic',
    name: null,
    role: 'Arabic Language Teacher',
    specialisms: ['Qur’anic Arabic', 'Grammar', 'Reading comprehension'],
    focus:
      'Makes the language of the Qur’an approachable through vocabulary, grammar and reading practice taught in manageable steps.',
    bio: null,
    qualifications: [],
    portrait: null,
    profileStatus: 'pending',
  },
  {
    id: 'islamic-studies',
    name: null,
    role: 'Islamic Studies Teacher',
    specialisms: ['Belief and worship', 'Seerah', 'Character development'],
    focus:
      'Teaches the foundations of belief and practice with clarity and context, encouraging students to ask thoughtful questions.',
    bio: null,
    qualifications: [],
    portrait: null,
    profileStatus: 'pending',
  },
  {
    id: 'children',
    name: null,
    role: 'Children\'s Education Teacher',
    specialisms: ['Early Qur’an reading', 'Du’as and short surahs', 'Islamic manners'],
    focus:
      'Creates a calm, encouraging classroom for younger learners, building confidence through short activities and gentle repetition.',
    bio: null,
    qualifications: [],
    portrait: null,
    profileStatus: 'pending',
  },
]

export const publishedTeachers = teachers.filter(
  teacher => teacher.profileStatus === 'published',
)
