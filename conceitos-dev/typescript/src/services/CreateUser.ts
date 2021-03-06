interface TechObject {
  title: string
  experience: number
}

interface IUserCreateData {
  name?: string
  email: string
  password: string
  techs: Array<string | TechObject>
}

export default function createUser({ name , email, password }: IUserCreateData) {
  const user = { name, email, password }

  return user;
}