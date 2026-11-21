import { Container } from "react-bootstrap"
import { StudentForm } from "../../components/forms/Student Forms/studentForm"
import { Heading } from "../../components/common/Heading"
import { BackButton } from "../../components/common/backButton"

export const AddStudent = () => {
    return (
        <>
            <BackButton />
            <Container style={{ paddingTop: "5px" }}>
                <Heading title="Add Student" description="Enter student information below" />
                <StudentForm />
            </Container>
        </>
    )
}