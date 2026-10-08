import Nav from './components/Nav.jsx'
import Ransom from './components/Ransom.jsx'
import Section from './components/Section.jsx'
import { profile, work, skate, anime } from './data.js'

export default function App() {
  return (
    <>
      <div className="glow" aria-hidden="true" />
      <Nav name={profile.name} />
      <main>
        <Section id="about">
          <div className="hero">
            <p className="eyebrow">{profile.role}</p>
            <h1>
              <span className="hero__hi">Hi, I’m</span>
              <Ransom text={profile.name.toUpperCase()} />
            </h1>
            <p className="lead">{profile.tagline}</p>
            <div className="hero__cta">
              <a className="btn btn--primary" href="#work">What I do</a>
              <a className="btn" href="#interests">What I love</a>
            </div>
          </div>
        </Section>

        <Section id="work" title="Work">
          <p className="lead lead--sm">{work.intro}</p>
          <div className="grid grid--3">
            {work.focus.map((f) => (
              <article key={f.title} className="card">
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </article>
            ))}
          </div>
        </Section>

        <Section id="interests" title="Things I love">
          <div className="grid grid--2">
            <article className="card">
              <h3 className="subhead">Skateboarding</h3>
              <p>{skate.text}</p>
              <ul className="tags">
                {skate.tags.map((t) => <li key={t}>{t}</li>)}
              </ul>
            </article>
            <article className="card">
              <h3 className="subhead">Anime</h3>
              <p>{anime.text}</p>
              <ul className="tags">
                <li>
                  <a href={anime.favorite.href} target="_blank" rel="noreferrer">
                    Favorite: {anime.favorite.title} ↗
                  </a>
                </li>
              </ul>
            </article>
          </div>
        </Section>

        <Section id="contact" title="Say hello">
          <p className="lead lead--sm">Interested in AI, health education, or just want to talk games? Reach out.</p>
          <div className="hero__cta">
            <a className="btn btn--primary" href={`mailto:${profile.email}`}>Email me</a>
            {profile.links.map((l) => (
              <a key={l.label} className="btn" href={l.href} target="_blank" rel="noreferrer">{l.label}</a>
            ))}
          </div>
        </Section>
      </main>
      <footer className="footer">© {new Date().getFullYear()} {profile.name}</footer>
    </>
  )
}
