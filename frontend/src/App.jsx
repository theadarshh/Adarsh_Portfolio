import Navbar          from './components/common/Navbar'
import Hero            from './components/Hero/Hero'
import About           from './components/About/About'
import Skills          from './components/Skills/Skills'
import Projects        from './components/Projects/Projects'
import LeetCode        from './components/LeetCode/LeetCode'
import GitHub          from './components/GitHub/GitHub'
import Education       from './components/Education/Education'
import Certifications  from './components/Certifications/Certifications'
import Resume          from './components/Resume/Resume'
import Contact         from './components/Contact/Contact'
import Footer          from './components/Footer/Footer'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <LeetCode />
        <GitHub />
        <Education />
        <Certifications />
        <Resume />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
