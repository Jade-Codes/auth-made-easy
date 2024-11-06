import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';
import { loginRequest } from '../../auth/auth-config';
import { Link } from 'react-router-dom';

function Header() {
  const { instance } = useMsal();
  const activeAccount = instance.getActiveAccount();

  const handleLoginRedirect = () => {
    instance
      .loginRedirect({
        ...loginRequest,
        prompt: 'create',
      })
      .catch((error: any) => {
        console.error(error);
        throw error;
      });
  };

  const handleLogoutRedirect = () => {
    instance.logoutRedirect({
      postLogoutRedirectUri: '/',
    });
  };

  return (
    <div className="w-screen max-w-full navbar bg-primary text-primary-content ">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/students">Students</Link></li>
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost normal-case text-xl">Student Management System</Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><Link className="btn btn-primary" to="/">Home</Link></li>
          <li><Link className="btn btn-primary" to="/students">Students</Link></li>
        </ul>
      </div>
      <div className="navbar-end">
        <AuthenticatedTemplate>
          {activeAccount && (
            <>
              <span className="mr-4">Welcome, {activeAccount.name}</span>
              <button className="btn btn-ghost btn-sm" onClick={handleLogoutRedirect}>Logout</button>
            </>
          )}
        </AuthenticatedTemplate>
        <UnauthenticatedTemplate>
          <button className="btn btn-ghost btn-sm" onClick={handleLoginRedirect}>Login</button>
        </UnauthenticatedTemplate>
      </div>
    </div>
  );
}

export default Header;