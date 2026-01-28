import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ExamProvider } from './context/ExamContext';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import { Home } from './pages/Home';
import { Landing } from './pages/Landing';
import { RulesConsent } from './pages/RulesConsent';
import { Practice } from './pages/Practice';
import { Part1 } from './pages/Part1';
import { Part2 } from './pages/Part2';
import { Part3 } from './pages/Part3';
import { Results } from './pages/Results';
import { Admin } from './pages/Admin';
import { Verify } from './pages/Verify';
import { EnvCheck } from './pages/EnvCheck';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Dashboard } from './pages/Dashboard';
import { Schedule } from './pages/Schedule';
import { Payment } from './pages/Payment';
import { IdentityVerify } from './pages/IdentityVerify';
import { AdminDashboard } from './pages/AdminDashboard';
import { AdminStats } from './pages/AdminStats';
import { AdminUsers } from './pages/AdminUsers';
import { ExamIntro } from './pages/ExamIntro';

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <ExamProvider>
            <BrowserRouter basename="/aict-platform">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/exam-intro" element={<ExamIntro />} />
            <Route path="/landing" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/identity-verify" element={<IdentityVerify />} />
            <Route path="/practice" element={<Practice />} />
            <Route path="/env-check" element={<EnvCheck />} />
            <Route path="/rules" element={<RulesConsent />} />
            <Route path="/part1" element={<Part1 />} />
            <Route path="/part2" element={<Part2 />} />
            <Route path="/part3" element={<Part3 />} />
            <Route path="/results" element={<Results />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/stats" element={<AdminStats />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/verify/:certificateId" element={<Verify />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
            </BrowserRouter>
          </ExamProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
