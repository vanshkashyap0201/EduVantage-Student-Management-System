import { Container } from "react-bootstrap"
import { Heading } from "../../components/common/Heading"
import { BackButton } from "../../components/common/backButton"
import { TeacherForm } from "../../components/forms/Teacher Forms/teacherForm"


export const AddTeacher = () => {
    return (
        <>
            <BackButton />
            <Container style={{ paddingTop: "5px" }}>
                <Heading title="Add Teacher" description="Enter teacher information below" />
                <TeacherForm />
            </Container>
        </>
    )
}
