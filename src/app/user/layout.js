// src/app/user/layout.js
import UserHeader from "../components/UserHeader";
import UserFooter from "../components/UserFooter";

export default function UserRootLayout({ children }) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <UserHeader />

      <main className="flex-grow">{children}</main>

      <UserFooter />
    </div>
  );
}
