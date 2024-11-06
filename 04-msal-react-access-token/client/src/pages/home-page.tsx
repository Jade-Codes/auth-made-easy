import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';

function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8">Student Management System</h1>
      <div className="card">
        <AuthenticatedTemplate>
          <p>You are <b>signed in</b>. You can now access the student management features.</p>
        </AuthenticatedTemplate>
        <UnauthenticatedTemplate>
          <p>Please <b>sign in</b> to access the student management features.</p>
        </UnauthenticatedTemplate>
      </div>
    </div>
  )
}

export default HomePage