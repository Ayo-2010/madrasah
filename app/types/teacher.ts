export interface Teacher {
  id: string
  /** Only publish a name with the teacher's explicit permission. */
  name: string | null
  role: string
  specialisms: string[]
  focus: string
  bio: string | null
  /** Only publish verified qualifications and ijazah details. */
  qualifications: string[]
  portrait: string | null
  profileStatus: 'published' | 'pending'
}
