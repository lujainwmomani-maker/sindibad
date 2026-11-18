// Local demo accounts for the frontend prototype.
export const demoAccounts = {
  tourist: {
    id: 1,
    name: 'Demo Traveler',
    email: 'tourist@sindibad.demo',
    password: 'Demo123!',
    role: 'tourist',
  },
  guide: {
    id: 2,
    name: 'Demo Guide',
    email: 'guide@sindibad.demo',
    password: 'Demo123!',
    role: 'guide',
  },
  admin: {
    id: 3,
    name: 'Demo Admin',
    email: 'admin@sindibad.demo',
    password: 'Demo123!',
    role: 'admin',
  },
};

export const redirectByRole = {
  tourist: '/',
  guide: '/guide',
  admin: '/admin',
};

export async function login(email, password) {
  const account = Object.values(demoAccounts).find(
    (item) => item.email.toLowerCase() === email.trim().toLowerCase()
      && item.password === password
  );

  if (!account) throw new Error('Invalid email or password');

  return {
    token: 'mock-token-' + account.id,
    user: {
      id: account.id,
      name: account.name,
      email: account.email,
      role: account.role,
    },
  };
}
