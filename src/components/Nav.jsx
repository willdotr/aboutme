import { useEffect, useState } from 'react'

const links = [
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'interests', label: 'Interests' },
  { id: 'contact', label: 'Contact' },
]

export default function Nav({ name }) {
  const [active, setActive] = useState('about')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    )
    links.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <header className="nav">
      <a className="nav__brand" href="#about">{name}</a>
      <nav aria-label="Primary">
        {links.map(({ id, label }) => (
          <a key={id} href={`#${id}`} className={active === id ? 'is-active' : ''}>
            {label}
          </a>
        ))}
      </nav>
    </header>
  )
}
