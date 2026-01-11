// src/app/page.js

import { redirect } from 'next/navigation';

export default function Page() {
  // Redirect halaman root (/) ke halaman user
  redirect('/user');
}
