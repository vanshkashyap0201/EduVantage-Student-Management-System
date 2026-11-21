import "./Heading.css";

export const Heading = (props) => {
    return (
        <div className="page-header">
            <h4>{props.title}</h4>
            <p>{props.description}</p>
        </div>
    )
}