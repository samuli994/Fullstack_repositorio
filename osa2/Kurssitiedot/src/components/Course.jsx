const Course = (props) => {
    return (
      <div>
        <Header name={props.course.name} />
        <Content parts={props.course.parts} />
        <Total parts={props.course.parts} />
    </div>
    )
  }

  const Header = (props) => {
    return (
      <div>
        <h1>Web development curriculum</h1>
        <h2>{props.name}</h2>
      </div>
    )
  }
  
  const Content = (props) => {
    return (
      <div>
      {props.parts.map(part => 
      <Part part={part} key={part.id} />)}
      </div>
    )
  }
  
  const Part = (props) => {
    return (
      <p>{props.part.name} {props.part.exercises}</p>
    )
  }
  
  const Total = (props) => {
  const total = props.parts.reduce((sum, part) => sum + part.exercises, 0)
  
    return (
      <strong>Total of {total} exercises</strong>
    )
  }

export default Course