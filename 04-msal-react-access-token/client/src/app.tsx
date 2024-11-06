import './app.css'
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/home-page';
import StudentsPage from './pages/students-page';
import Header from './components/layout/header';

function App() {
  return (
    <>
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/students" element={<StudentsPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App
