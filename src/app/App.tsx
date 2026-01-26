import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ExamProvider } from './context/ExamContext';
import { Landing } from './pages/Landing';
import { Home } from './pages/Home';
import { RulesConsent } from './pages/RulesConsent';
import { Practice } from './pages/Practice';
import { Part1 } from './pages/Part1';
import { Part2 } from './pages/Part2';
import { Part3 } from './pages/Part3';
import { Results } from './pages/Results';
import { Admin } from './pages/Admin';

export default function App() {
  return (
    <ExamProvider>
      <BrowserRouter basename="/aict-platform">
        <Routes>
          <Route path="/" element={<Home />} />
                    <Route path="/landing" element={<Landing />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/rules" element={<RulesConsent />} />
          <Route path="/part1" element={<Part1 />} />
          <Route path="/part2" element={<Part2 />} />
          <Route path="/part3" element={<Part3 />} />
          <Route path="/results" element={<Results />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ExamProvider>
  );
}
