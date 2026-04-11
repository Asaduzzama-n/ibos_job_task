import { redirect } from 'next/navigation';

export default function Home() {
  // Simple redirect to the employer login as default entry for this test project
  redirect('/employer/login');
}
