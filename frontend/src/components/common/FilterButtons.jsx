import { Button, Container } from "react-bootstrap"
import { FaFilter } from "react-icons/fa"

export const FilterButtons = () => {
    const initialStates = {
        course: "",
        department: "",
        semester: "",
        section: "",
        status: ""
    }
    return (
        <>
            <Container fluid>
                <h1>Filter</h1>
            </Container>
        </>
    )
}