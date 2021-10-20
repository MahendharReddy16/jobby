import './index.css'

const Skills = props => {
  const {skillsDetails} = props
  const {name, skillsImageUrl} = skillsDetails
  return (
    <list className="skills-name-container">
      <img src={skillsImageUrl} alt={name} className="skill-img" />
      <p className="skill-name">{name}</p>
    </list>
  )
}

export default Skills
