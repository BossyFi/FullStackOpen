const Course = ({course}) => {
    let totalExercises = course.parts.reduce((accumulator, currentValue) => accumulator + currentValue.exercises, 0)
    return (
        <div>
            <h1>{course.name}</h1>
            {course.parts.map(part =>
                <p key={part.id}>{part.name} {part.exercises}</p>
            )}
            <strong>total of {totalExercises} exercises</strong>
        </div>
    )
}

export default Course