import Ransom from './Ransom.jsx'

export default function Section({ id, title, children }) {
  return (
    <section id={id} className="section">
      {title && (
        <h2 className="section__title">
          <Ransom text={title} />
        </h2>
      )}
      {children}
    </section>
  )
}
